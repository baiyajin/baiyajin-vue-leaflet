<template>
  <div class="vue-leaflet">
    <el-button @click="drawPolygon" type="primary" circle class="el_button el-icon-edit" ></el-button>
    <l-map id="map" @update:zoom="updateZoom" class="l-map" :zoom="map2.zoom" ref="map2" :maxZoom="3" :minZoom="0">
      <l-polygon :lat-lngs="polygon.latlngs" :color="polygon.color"></l-polygon>
      <!--设置地图不平铺:noWrap="true"-->
      <l-tile-layer :noWrap="true" :url="map2.url"></l-tile-layer>
      <l-marker v-for="(item, index) in map2.markers" :key="index" :lat-lng="item.marker">
        <l-popup :content="item.text"></l-popup>
      </l-marker>
    </l-map>
    <!--全局覆盖-->
    <l-map class="l-map child_map_div" v-if="dialogVisible" :zoom="map3.zoom" ref="map3" :maxZoom="4" :minZoom="1">
      <l-tile-layer :noWrap="true" :url="map3.url"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LPolygon } from 'vue2-leaflet'
import L from 'leaflet'
export default {
  name: 'VueLeaflet',
  components: {
    LMap,
    LPolygon,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      dialogVisible: false,
      map3: {
        title: '',
        zoom: 1,
        url: '',
        marker: '',
        markers: [],
        text: ''
      },
      currentZoom: 2,
      img: [3831, 3101], // 图片显示时的宽高
      polygon: {
        latlngs: [],
        color: 'green'
      },
      buttons: [],
      currentIndex: 0,
      currentMarker: '',
      currentMarkerElement: null,
      map2: {
        zoomControl: false,
        attributionControl: false,
        zoom: 1,
        url: 'http://192.168.1.115/tiles/ground/{z}/{x}/{y}.png',
        markers: []
      }
    }
  },
  mounted () {
    this.setPosition('map2')
    this.setPosition('map3')
  },
  methods: {
    updateZoom (n, s) {
      console.log(n, s)
    },
    setPosition (ref) {
      // 设置位置
      var rc = new L.RasterCoords(this.$refs[ref].mapObject, this.img)
      this.$refs[ref].mapObject.setView(rc.unproject([this.img[0] / 2, this.img[1] / 2]), this.currentZoom)
    },
    getJson (marker) {
      return {
        marker: marker,
        text: `<div class="title">子地图列表</div>` +
            `<br><button class="my-custom-button">地图一</button>` +
            `<br><button class="my-custom-button">地图二</button>` +
            `<br><button class="my-custom-button">地图三</button>`
      }
    },
    setMapParams (index) {
      this.currentIndex = index
      this.map3.zoom = 1
      this.map3.markers = [{
        marker: this.currentMarker,
        text: `<div class="title">${index + 1} 楼地图</div>`
      }]
      this.map3.url = `http://192.168.1.115/tiles/${index + 1}F/{z}/{x}/{y}.png`
    },
    drawPolygon () {
      this.$notify.success({
        message: '开始绘制多边形',
        position: 'bottom-right'
      })
      // 设置鼠标样式
      document.body.style.cursor = 'crosshair'
      let points = []
      const polygon = new L.Polygon(points)
      let map = this.$refs.map2.mapObject
      map.addLayer(polygon)
      // 按下
      map.on('mousedown', e => {
        points.push([e.latlng.lat, e.latlng.lng])
        // 移动
        map.on('mousemove', event => {
          polygon.setLatLngs([...points, [event.latlng.lat, event.latlng.lng]])
        })
      })
      let self = this
      map.on('dblclick', e => {
        if (points.length) {
          this.$notify.success({
            message: '退出绘制',
            position: 'bottom-right'
          })
          document.body.style.cursor = 'grab'
          map.off('mousemove')
          map.off('mousedown')
          points = []
          // 获取刚刚绘制的多边形
          let paths = document.getElementsByClassName('leaflet-interactive')
          // 设置点击事件
          for (let i = 0; i < paths.length; i++) {
            paths[i].onclick = function () {
              self.setMapParams(i)
              self.dialogVisible = true
              self.addReturnButton()
            }
          }
        }
      })
    },
    addReturnButton () {
      let self = this
      let myCustomButton = document.getElementById('myCustomButton')
      if (!myCustomButton) {
        let allElements = document.getElementsByClassName('leaflet-control-zoom leaflet-bar leaflet-control')
        let a = document.createElement('a')
        a.setAttribute('class', 'leaflet-control-zoom-out')
        a.setAttribute('id', 'myCustomButton')
        a.setAttribute('title', '返回')
        a.setAttribute('role', 'button')
        a.setAttribute('aria-label', '返回')
        a.innerHTML = '«'
        a.onclick = function () {
          self.dialogVisible = false
          document.getElementById('myCustomButton').remove()
          // 模拟点击当前mark元素,一定要延时一会
          setTimeout(() => {
            self.currentMarkerElement.click()
          }, 100)
        }
        allElements[allElements.length - 1].appendChild(a)
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/scss" scoped>
  .vue-leaflet{
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    .l-map{
      width: 100%;
      height: 100%;
      position:absolute;
    }
    .child_map_div{
      z-index: 999;
      background: white;
    }
    /deep/.leaflet-popup-content{
      width: 100% !important;
      .title{
        position: relative;
        left: -19px;
        top: 10px;
        text-align: center;
        padding: 10px 20px;
      }
      button{
        margin: 10px auto;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        &:hover {
          color: #409eff;
          border-color: #c6e2ff;
          background-color: #ecf5ff;
        }
      }
    }
    .switch_div{
      .switch{
        position: absolute;
        top: 50%;
        color: white;
        font-size: 50px;
        &:hover {
          color: #5cb6ff;
          transform: scale(1.2);
        }
      }
      .previous{
        left: -9%;
      }
      .next{
        right: -9%;
      }
    }
  }
</style>
