<template>
  <div class="control-marker">
    <a-button @click="pointMarker" :disabled="tipPanel">
      绘制点
    </a-button>
    <a-button @click="lineMarker" :disabled="tipPanel">
      绘制线
    </a-button>
    <a-button @click="polygonMarker" :disabled="tipPanel">
      绘制面
    </a-button>
    <a-button @click="toggleControlPanel">
      标会管理
    </a-button>
    <div class="control-panel" v-show="controlPanel">
      <div class="panel-top">
        <span>标绘管理</span>
        <a href="javascript:void(0);"><a-icon type="swap" /></a>
        <a href="javascript:void(0);" @click="showResultLayer"><a-icon :type="markerShow ? 'eye-invisible' : 'eye'" /></a>
      </div>
      <div class="select">
        类型：
        <a-select defaultValue="allTypes" style="width: 150px" @change="handleChange">
          <a-select-option value="allTypes">全部</a-select-option>
          <a-select-option value="Point">点</a-select-option>
          <a-select-option value="LineString">线</a-select-option>
          <a-select-option value="Polygon">面</a-select-option>
        </a-select>
      </div>
      <div class="search">
        <a-input-search placeholder="" @search="onSearch" enterButton />
      </div>
      <div class="marker-table">
        <a-table
          rowKey="projectNo"
          :columns="columns"
          :dataSource="showMarkerData"
          :pagination="ipagination"
          @change="handleTableChange"
        >
          <span slot="operation" slot-scope="text, record" class="operation">
            <a title="编辑" href="javascript:;" @click="handleEdit(record)"><a-icon type="form" /></a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="handleDelete(record)">
              <a title="删除"><a-icon type="close-circle" /></a>
            </a-popconfirm>
            <a-divider type="vertical" />
            <a title="定位" href="javascript:;" @click="handleLocation(record)"><a-icon type="environment" /></a>
          </span>
        </a-table>
      </div>
    </div>
    <div class="add-tip" ref="tipModal" v-show="tipPanel">
      <div class="title">备注</div>
      <a-input placeholder="请输入备注" allowClear v-model="tip" />
      <a-button class="ok" @click="tipOk">确定</a-button>
      <a-button @click="tipCancel">取消</a-button>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'

export default {
  components: {
    L
  },
  props: {
    map: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tip: '暂无备注',
      controlPanel: true,
      tipPanel: false,
      markerShow: true,
      record: null,
      selectChange: 'allTypes',
      searchContent: null,
      markerAdd: null,
      tipLocation: null,
      allMarkerData: [],
      showMarkerData: [],
      columns: [{
        title: '备注',
        dataIndex: 'remark',
        width: 160
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center',
        width: 120,
        scopedSlots: { customRender: 'operation' }
      }],
      ipagination: {
        current: 1,
        pageSize: 5,
        size: 'small'
      }
    }
  },
  created () {
    // 初始化一些符号属性
    this.markersLayer = L.geoJSON([], {
      style: function (feature) {
        return {
          color: '#237CC9',
          weight: 2,
          fillColor: '#237CC9',
          fillOpacity: 0.2
        }
      }
    }).addTo(this.map)
    this.currentMarkerGroup = L.layerGroup([]).addTo(this.map)
    this.marker_zindex = 2000
    this.moveMarker = L.marker([0, 0], {
      zIndexOffset: this.marker_zindex
    })
    this.moveIcon = L.marker([0, 0], {
      zIndexOffset: this.marker_zindex
    })
  },
  methods: {
    // 绘制点
    pointMarker (e) {
      this.cancleMarkerListener()

      this.clickFunction = this.addClickMarker
      this.map.on('click', this.clickFunction, this)

      this.moveFunction = this.addMoveMarker
      this.map.on('mousemove', this.moveFunction, this)

      this.rightClickFunction = this.cancleMarkerListener
      this.map.on('contextmenu', this.rightClickFunction, this)

      e.stopPropagation()
    },
    // 绘制点符号添加到图层中
    addClickMarker: function (e) {
      const clickLocation = [e.latlng.lat, e.latlng.lng]
      this.cancleMarkerListener()
      const pointMarker = L.marker(clickLocation).addTo(this.markersLayer)
      this.addTip(pointMarker)
    },
    // 添加移动符号事件
    addMoveMarker: function (e) {
      this.map.getContainer().style.cursor = 'pointer'
      this.moveMarker.addTo(this.currentMarkerGroup)
      this.moveMarker.setLatLng(e.latlng)
      this.moveMarker.setZIndexOffset(this.marker_zindex)
    },
    // 添加线符号
    lineMarker (e) {
      this.cancleMarkerListener()

      this.poly_points = []
      this.poly_line = new L.Polyline([], {
        color: '#237CC9',
        // opacity:0.6,
        weight: 2
      })// 折线
      this.dashLine = new L.Polyline([], {
        color: '#237CC9',
        // opacity:0.6,
        dashArray: [10, 10],
        weight: 2
      })

      this.clickFunction = this.addLineLatlng
      this.map.on('click', this.clickFunction, this)

      this.dblclickFunction = this.addLineMarker
      this.map.on('dblclick', this.dblclickFunction, this)

      this.moveFunction = this.addDashLine
      this.map.on('mousemove', this.moveFunction, this)

      this.rightClickFunction = this.cancleMarkerListener
      this.map.on('contextmenu', this.rightClickFunction, this)

      e.stopPropagation()
    },
    // 添加线绘制点
    addLineLatlng (e) {
      this.poly_points.push([e.latlng.lat, e.latlng.lng])
    },
    // 添加线绘制结束点
    addLineMarker (e) {
      this.cancleMarkerListener()
      this.map.removeLayer(this.dashLine)
      if (this.poly_points.length > 2) {
        this.poly_line.setLatLngs(this.poly_points).addTo(this.markersLayer)
        return this.addTip(this.poly_line, this.poly_points[this.poly_points.length - 1])
      }
    },
    // 在绘制线鼠标移动时显示虚线效果
    addDashLine (e) {
      this.map.getContainer().style.cursor = 'pointer'
      this.moveIcon.addTo(this.currentMarkerGroup)
      if (this.poly_points.length > 0) {
        this.dashLine.setLatLngs(this.poly_points)
        this.dashLine.addLatLng([e.latlng.lat, e.latlng.lng]).addTo(this.currentMarkerGroup)
        this.moveIcon.setIcon(L.divIcon({ html: "<div class='leaflet-marker-markerTooltip'>双击添加备注</div>", className: 'leaflet-marker-noDefaultDivIcon' }))
      } else {
        this.moveIcon.setIcon(L.divIcon({ html: "<div class='leaflet-marker-markerTooltip'>点击开始绘制，双击结束</div>", className: 'leaflet-marker-noDefaultDivIcon' }))
      }
      this.moveIcon.setLatLng(e.latlng)
      this.moveIcon.setZIndexOffset(this.marker_zindex + 20)
    },
    // 为绘制区域添加绘制事件
    polygonMarker (e) {
      this.cancleMarkerListener()

      this.poly_points = []// 区域点
      this.poly_area = new L.Polygon([], {
        color: '#237CC9',
        // opacity:0.6,
        weight: 2,
        fillColor: '#237CC9',
        fillOpacity: 0.2
      })

      this.poly_now = new L.Polygon([], {
        color: '#237CC9',
        // opacity:0.6,
        weight: 2,
        dashArray: [10, 10],
        fillColor: '#237CC9',
        fillOpacity: 0.3
      })

      this.clickFunction = this.addPolyLatlng
      this.map.on('click', this.clickFunction, this)

      this.dblclickFunction = this.addPloygonMarker
      this.map.on('dblclick', this.dblclickFunction, this)

      this.moveFunction = this.addPolyNow
      this.map.on('mousemove', this.moveFunction, this)

      this.rightClickFunction = this.cancleMarkerListener
      this.map.on('contextmenu', this.rightClickFunction, this)

      e.stopPropagation()
    },
    // 添加区域绘制点
    addPolyLatlng (e) {
      this.poly_points.push([e.latlng.lat, e.latlng.lng])
    },
    // 添加区域绘制结束点
    addPloygonMarker (e) {
      this.cancleMarkerListener()
      this.map.removeLayer(this.poly_now)

      if (this.poly_points.length > 2) {
        this.poly_area.setLatLngs(this.poly_points).addTo(this.markersLayer)
        var tipLocation = this.poly_points[this.poly_points.length - 1]
        return this.addTip(this.poly_area, tipLocation)
      }
    },
    // 在绘制区域鼠标移动时显示虚线效果
    addPolyNow (e) {
      this.map.getContainer().style.cursor = 'pointer'
      this.moveIcon.addTo(this.currentMarkerGroup)
      if (this.poly_points.length > 0) {
        this.poly_now.setLatLngs(this.poly_points)
        this.poly_now.addLatLng([e.latlng.lat, e.latlng.lng]).addTo(this.currentMarkerGroup)
        this.moveIcon.setIcon(L.divIcon({ html: "<div class='leaflet-marker-markerTooltip'>双击添加备注</div>", className: 'leaflet-marker-noDefaultDivIcon' }))
      } else {
        this.moveIcon.setIcon(L.divIcon({ html: "<div class='leaflet-marker-markerTooltip'>点击开始绘制，双击结束</div>", className: 'leaflet-marker-noDefaultDivIcon' }))
      }
      this.moveIcon.setLatLng(e.latlng)
      this.moveIcon.setZIndexOffset(this.marker_zindex + 20)
    },

    // 添加绘制符号的备注信息
    addTip (markerAdd, tipLocation) {
      this.tipPanel = true
      this.markerAdd = markerAdd
      this.tipLocation = tipLocation
      return this.$refs.tipModal
    },
    // 添加备注信息时备注框确定按钮
    tipOk () {
      this.tipPanel = false
      // 判读是新建符号，还是修改符号
      if (this.markerAdd._popup) {
        this.bindPopupToMarker(this.markerAdd, this.tip, this.tipLocation)
        this.record.remark = this.tip
        this.record.marker.openPopup()
      } else {
        this.bindPopupToMarker(this.markerAdd, this.tip, this.tipLocation)

        var newMarkerData = {}
        newMarkerData.geometry = JSON.stringify(this.markerAdd.toGeoJSON().geometry)
        newMarkerData.geometryObject = this.markerAdd.toGeoJSON().geometry
        newMarkerData.marker = this.markerAdd
        newMarkerData.projectNo = this.uuid()
        newMarkerData.remark = this.tip
        if (this.tipLocation) {
          // 把点对象转化为字符串---存数据库
          // newMarkerData.tipLocation = this.tipLocation.toString()
          newMarkerData.tipLocation = this.tipLocation
        }
        this.allMarkerData.push(newMarkerData)
        this.showMarkerData.push(newMarkerData)
      }
    },
    // 备注框取消按钮
    tipCancel () {
      // 判断是新增取消还是新增取消
      if (!this.markerAdd._popup) {
        this.markerAdd.removeFrom(this.markersLayer)
      }
      this.tipPanel = false
    },
    // 绑定弹出标记---弹出框
    bindPopupToMarker (theMarker, theTip, tipLocation) {
      if (tipLocation != null) {
        theMarker.bindPopup(theTip, {
          autoPan: false,
          autoClose: false,
          className: 'leaflet-marker-markerTip',
          keepInView: false
        }).openPopup(L.latLng(tipLocation[0], tipLocation[1]))
        // 使备注显示在线或面的结束点位置
        // theMarker.off('click')
        // theMarker.on('click', function () {
        //   theMarker.openPopup(L.latLng(tipLocation[0], tipLocation[1]))
        // })
      } else {
        theMarker.bindPopup(theTip, {
          autoClose: false,
          className: 'leaflet-marker-markerTip'
        }).openPopup()
      }
    },
    // 取消标记侦听器
    cancleMarkerListener () {
      if (this.clickFunction) {
        this.map.off('click', this.clickFunction, this)
      }
      if (this.dblclickFunction) {
        this.map.off('dblclick', this.dblclickFunction, this)
      }
      if (this.moveFunction) {
        this.map.off('mousemove', this.moveFunction, this)
      }
      if (this.rightClickFunction) {
        this.map.off('contextmenu', this.rightClickFunction, this)
      }
      if (this.map.hasLayer(this.currentMarkerGroup)) {
        this.currentMarkerGroup.clearLayers()
      }
    },
    // 隐藏所有标绘符号按钮
    showResultLayer () {
      this.markerShow = !this.markerShow
      this.allMarkerData.forEach((markerData) => {
        if (this.markerShow) {
          // 显示
          markerData.marker.addTo(this.markersLayer)
          this.bindPopupToMarker(markerData.marker, markerData.remark, markerData.tipLocation)
        } else {
          // 隐藏
          markerData.marker.removeFrom(this.markersLayer)
        }
      })
    },
    // 页码设置
    handleTableChange (pagination) {
      this.queryParam.pageNo = this.ipagination.current = pagination.current
    },
    // 产生16位随机ID
    uuid () {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
      s[8] = s[13] = s[18] = s[23] = '-'
      var uuid = s.join('')
      return uuid
    },
    // 下拉选择框方法
    handleChange (value) {
      this.selectChange = value
      this.onQuery()
    },
    // 符号面板搜索框搜索事件
    onSearch (value) {
      // eslint-disable-next-line no-useless-escape
      this.searchContent = value.replace(/\ +/g, '')
      this.onQuery()
    },
    // 条件查询绘制符号列表
    onQuery () {
      this.showMarkerData = []
      this.allMarkerData.forEach((markerData) => {
        if (this.searchContent) {
          if (markerData.geometryObject.type === this.selectChange && markerData.remark.indexOf(this.searchContent) !== -1) {
            this.showMarkerData.push(markerData)
          } else if (this.selectChange === 'allTypes' && markerData.remark.indexOf(this.searchContent) !== -1) {
            this.showMarkerData.push(markerData)
          }
        } else {
          if (markerData.geometryObject.type === this.selectChange) {
            this.showMarkerData.push(markerData)
          } else if (this.selectChange === 'allTypes') {
            this.showMarkerData.push(markerData)
          }
        }
      })
    },
    // 切换符号控制面板的显示隐藏
    toggleControlPanel () {
      this.controlPanel = !this.controlPanel
    },
    // 表格中删除按钮
    handleDelete (record) {
      const index = this.allMarkerData.indexOf(record)
      this.allMarkerData.splice(index, 1)
      this.showMarkerData.splice(this.showMarkerData.indexOf(record), 1)
      record.marker.removeFrom(this.markersLayer)
    },
    // 表格中定位按钮
    handleLocation (record) {
      this.perspective(record)
      record.marker.openPopup()
    },
    // 表格中编辑按钮
    handleEdit (record) {
      this.perspective(record)
      this.tipPanel = true
      this.tip = record.remark
      this.record = record
      this.markerAdd = record.marker
      record.marker.openPopup()
    },
    // 在地图中定位符号视角方法
    perspective (record) {
      if (record.tipLocation) {
        this.$emit('perspective', record.tipLocation)
      } else {
        this.$emit('perspective', record.marker._latlng)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .add-tip{
    width: 160px;
    height: 108px;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    top: 0px;
    right: 320px;
    & .title{
      width: 100%;
      color: #000;
      font-size: 18px;
      text-align: center;
    }
    & .ok{
      margin: 5px 12px 0 0;
    }
  }
  .control-panel{
    width: 312px;
    height: 460px;
    background-color: #fff;
    border-radius: 4px;
    overflow: auto;
    position: absolute;
    top: 84px;
    left: 0px;
    & .panel-top{
      margin: 10px;
      color: rgb(47,192,226);
      font-size: 16px;
    }
    & .panel-top a{
      float: right;
      color: #000;
      margin-right: 20px;
    }
    & .select{
      margin: 10px 0 0 30px;
      font-size: 16px;
    }
    & .search{
      margin: 10px;
    }
    & .search .ant-input-search-enter-button .ant-input-group-addon .ant-input-search-button{
      font-size: 16px;
      color: #d9d9d9;
      background-color: #fff;
      border-color: #d9d9d9;
    }
    & .search .ant-btn-primary{
      background-color: #fff;
      border-color: #d9d9d9;
    }
  }
</style>
