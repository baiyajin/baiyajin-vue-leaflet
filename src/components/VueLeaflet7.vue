<template>
  <div class="vue-leaflet">
    <l-map id="map" class="l-map" :zoom="map2.zoom" ref="map" :maxZoom="3" :minZoom="0">
      <!--设置地图不平铺:noWrap="true"-->
      <l-tile-layer :noWrap="true" :url="map2.url"></l-tile-layer>
      <l-marker v-for="(item, index) in map2.markers" :key="index" :lat-lng="item.marker">
        <l-popup :content="item.text"></l-popup>
      </l-marker>
    </l-map>
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
      currentMarker: '',
      currentMarkerElement: null,
      currentCenter: '',
      originalMap: {},
      map2: {
        zoomControl: false,
        attributionControl: false,
        zoom: 1,
        url: `http://${window.g.mapUrl}/tiles/ground/{z}/{x}/{y}.png`,
        markers: []
      }
    }
  },
  created () {
    // 初始化地图默认标记
    this.map2.markers.push(this.getJson(L.latLng(25.085540595994082, 102.73151814937593)))
  },
  mounted () {
    let self = this
    // 双击添加标记
    self.$refs.map.mapObject.on('click', function (e) {
      // 单击不添加
    }).on('dblclick', function (e) {
      // 双击才添加
      self.map2.markers.push(self.getJson(L.latLng(e.latlng.lat, e.latlng.lng)))
    })
    // 点击标记
    self.$refs.map.mapObject.on('popupopen', function (e) {
      // 获取当前mark标记元素
      self.currentMarkerElement = e.sourceTarget._panes.markerPane.lastChild
      self.currentCenter = self.currentMarker = L.latLng(e.popup._latlng.lat, e.popup._latlng.lng)
      self.buttons = e.popup._contentNode.getElementsByClassName('my-custom-button')
      for (let i = 0; i < self.buttons.length; i++) {
        self.buttons[i].onclick = function () {
          // 保存原来的地图
          self.originalMap = JSON.parse(JSON.stringify(self.map2))
          self.setMapParams(i)
          self.addReturnButton()
        }
      }
    })
  },
  methods: {
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
      this.map2.zoom = 1
      this.map2.center = this.currentCenter
      this.map2.markers = [{
        marker: this.currentMarker,
        text: `<div class="title">${index + 1} 楼地图</div>`
      }]
      this.map2.text = `<div class="title">我是 ${this.buttons[index].innerHTML}</div>`
      this.map2.title = `${this.buttons[index].innerHTML}`
      this.map2.url = `http://${window.g.mapUrl}/tiles/${index + 1}F/{z}/{x}/{y}.png`
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
          self.map2 = JSON.parse(JSON.stringify(self.originalMap))
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
