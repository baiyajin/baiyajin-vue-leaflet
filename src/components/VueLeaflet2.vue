<template>
  <div class="vue-leaflet">
    <l-map class="l-map" :zoom="map2.zoom" :center="map2.center" ref="map">
      <l-tile-layer :url="map2.url" :attribution="map2.attribution"></l-tile-layer>
      <l-marker v-for="(item, index) in map2.markers" :key="index" :lat-lng="item.marker">
        <l-popup :content="item.text"></l-popup>
      </l-marker>
    </l-map>

    <el-dialog
      :title="map.title"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="80%"
      >
      <div class="switch_div">
        <div class="previous switch" @click="switchMap(0)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <l-map style="width: 100%; height: 600px;" :zoom="map.zoom" :center="map.center" ref="child_map">
          <l-tile-layer :url="map.url" :attribution="map.attribution"></l-tile-layer>
          <l-marker :lat-lng="map.marker">
            <l-popup :content="map.text"></l-popup>
          </l-marker>
        </l-map>
        <div class="next switch" @click="switchMap(1)">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import L from 'leaflet'
export default {
  name: 'VueLeaflet',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      buttons: [],
      currentIndex: 0,
      dialogVisible: false,
      map: {
        title: '',
        zoom: 13,
        center: L.latLng(25.085540595994082, 102.73151814937593),
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(25.085540595994082, 102.73151814937593),
        text: ''
      },
      map2: {
        zoom: 13,
        center: L.latLng(25.085540595994082, 102.73151814937593),
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        markers: []
      }
    }
  },
  created () {
    // 初始化地图默认标记
    this.map2.markers.push(
      {
        marker: L.latLng(25.085540595994082, 102.73151814937593),
        text: '<div class="title">子地图列表</div>' +
    '<br><button class="my-custom-button">地图一</button>' +
    '<br><button class="my-custom-button">地图二</button>' +
    '<br><button class="my-custom-button">地图三</button>' +
    '<br><button class="my-custom-button">地图四</button>' +
    '<br><button class="my-custom-button">地图五</button>' +
    '<br><button class="my-custom-button">地图六</button>'
      }
    )
  },
  mounted () {
    let self = this
    // 点击添加标记
    self.$refs.map.mapObject.on('click', function (e) {
      self.map2.markers.push(
        {marker: L.latLng(e.latlng.lat, e.latlng.lng), text: `<div class="title">我是你刚刚点击增加的标记</div>`}
      )
    })
    self.$refs.map.mapObject.on('popupopen', function (e) {
      self.buttons = document.getElementsByClassName('my-custom-button')
      for (let i = 0; i < self.buttons.length; i++) {
        self.buttons[i].onclick = function () {
          self.setMapParams(i)
          self.dialogVisible = true
        }
      }
    })
  },
  methods: {
    setMapParams (index) {
      this.currentIndex = index
      this.map.zoom = index + 13
      this.map.text = `<div class="title">我是 ${this.buttons[index].innerHTML}</div>`
      this.map.title = this.buttons[index].innerHTML
    },
    switchMap (flag) {
      // 计算当前index
      if (flag === 0) {
        if (this.currentIndex === 0) {
          this.currentIndex = this.buttons.length - 1
        } else {
          this.currentIndex--
        }
      } else {
        if (this.currentIndex === this.buttons.length - 1) {
          this.currentIndex = 0
        } else {
          this.currentIndex++
        }
      }
      this.setMapParams(this.currentIndex)
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
