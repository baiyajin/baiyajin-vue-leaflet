<template>
  <div class="vue-leaflet">
    <el-button @click="drawPolygon" type="primary" circle class="el_button el-icon-edit" ></el-button>
    <l-map class="l-map" :crs="crs" :options="{zoomControl: true}" ref="map">
      <l-polygon :lat-lngs="polygon.latlngs" :color="polygon.color"></l-polygon>
      <l-image-overlay :url="url" :bounds="bounds"></l-image-overlay>
    </l-map>

    <!--全局覆盖-->
    <l-map class="l-map child_map_div" v-if="dialogVisible" :zoom="map2.zoom" :crs="map2.crs" :options="{zoomControl: true}" ref="map2">
      <l-image-overlay :url="map2.url" :bounds="map2.bounds"></l-image-overlay>
    </l-map>
  </div>
</template>

<script>
import {LMap, LImageOverlay, LMarker, LPopup, LPolygon, LTileLayer} from 'vue2-leaflet'
import L from 'leaflet'

export default {
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPolygon,
    LTileLayer,
    LPopup
  },
  methods: {
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
        }
        allElements[allElements.length - 1].appendChild(a)
      }
    },
    setMapParams (index) {
      this.map2.url = 'http://192.168.1.115/tiles/' + index + 'F/0/0/0.png'
      console.log(this.map2.url)
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
      let map = this.$refs.map.mapObject
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
    }
  },
  mounted () {
  },
  data () {
    return {
      map2: {
        zoom: 0,
        url: '',
        bounds: [[-400, -400], [400, 400]],
        crs: L.CRS.Simple
      },
      dialogVisible: false,
      url: 'http://192.168.1.115/tiles/ground/0/0/0.png',
      // [-400, -400] 位置
      // [400, 400] 大小
      bounds: [[-400, -400], [400, 400]],
      crs: L.CRS.Simple,
      stars: [
        { name: 'Sol', lng: 0, lat: 0 }
      ],
      polygon: {
        latlngs: [],
        color: 'green'
      }
    }
  }
}
</script>
