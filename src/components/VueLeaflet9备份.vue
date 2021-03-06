<template>
  <div class="vue-leaflet">
    <div v-show="isShowing" id="map2" ref="map2"></div>
    <div v-show="!isShowing" id="map" ref="map"></div>
  </div>
</template>
<script>
// import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
import L from 'leaflet'
export default {
  // components: {
  //   LMap,
  //   LTileLayer,
  //   LMarker,
  //   LPopup
  // },
  data () {
    return {
      isShowing: false,
      map: null,
      buttons: [],
      currentUrl: `http://${window.g.mapUrl}/tiles/ground/{z}/{x}/{y}.png`,
      originalUrl: '',
      minZoom: 0,
      maxZoom: 5,
      currentZoom: 2,
      img: [3831, 3101], // 图片显示时的宽高
      currentF: 1,
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
  },
  mounted () {
    this.init('map')
  },
  methods: {
    init (mapid) {
      // create the map
      this.map = L.map(mapid, {minZoom: this.minZoom, maxZoom: this.maxZoom})

      // assign map and image dimensions
      var rc = new L.RasterCoords(this.map, this.img)

      // set the view on a marker ...  [3831 / 2, 3101 / 2] 定位一加载就显示的位置
      this.map.setView(rc.unproject([3831 / 2, 3101 / 2]), this.currentZoom)

      // add layer control object
      L.control.layers({}, {
        'Polygon': this.layerPolygon(this.map, rc).bindPopup(`<br><button class="my-custom-button">1楼</button>`) // 添加多边形
        // 'Countries': this.layerCountries(map, rc), // 添加国家的点
        // 'Bounds': this.layerBounds(map, rc, this.img), // 添加标记，边界标记
        // 'Info': this.layerGeo(map, rc),
        // 'Circles': this.layerCircles(map, rc) // 添加圆圈
      }).addTo(this.map)

      let self = this
      this.map.on('popupopen', function (e) {
        self.buttons = e.popup._contentNode.getElementsByClassName('my-custom-button')
        for (let i = 0; i < self.buttons.length; i++) {
          self.buttons[i].onclick = function () {
            self.setMapParams()
            self.addReturnButton()
          }
        }
      })

      L.tileLayer(this.currentUrl, {
        noWrap: true // 设置地图不平铺
      }).addTo(this.map)
    },
    init2 (mapid) {
      // create the map
      var map = L.map(mapid, {minZoom: this.minZoom, maxZoom: this.maxZoom})

      // assign map and image dimensions
      var rc = new L.RasterCoords(map, this.img)

      // set the view on a marker ...  [3831 / 2, 3101 / 2] 定位一加载就显示的位置
      map.setView(rc.unproject([3831 / 2, 3101 / 2]), this.currentZoom)

      L.tileLayer(this.currentUrl, {
        noWrap: true // 设置地图不平铺
      }).addTo(map)
    },
    // 添加标记，边界标记
    layerBounds (map, rc, img) {
      // set marker at the image bound edges
      var layerBounds = L.layerGroup([
        L.marker(rc.unproject([0, 0])).bindPopup('[0,0]'),
        L.marker(rc.unproject(img)).bindPopup(JSON.stringify(img))
      ])
      map.addLayer(layerBounds)

      // set markers on click events in the map
      map.on('click', function (event) {
        // to obtain raster coordinates from the map use `project`
        var coord = rc.project(event.latlng)
        // to set a marker, ... in raster coordinates in the map use `unproject`
        var marker = L.marker(rc.unproject(coord))
          .addTo(layerBounds)
        marker.bindPopup('[' + Math.floor(coord.x) + ',' + Math.floor(coord.y) + ']')
          .openPopup()
      })

      return layerBounds
    },
    // 添加国家的点
    layerCountries (map, rc) {
      var layerCountries = L.geoJson(window.countries, {
        // correctly map the geojson coordinates on the image
        coordsToLatLng: function (coords) {
          return rc.unproject(coords)
        },
        // add a popup content to the marker
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name)
          }
        },
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 8,
            fillColor: '#800080',
            color: '#D107D1',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          })
        }
      })
      map.addLayer(layerCountries)
      return layerCountries
    },
    layerGeo (map, rc) {
      var imgDir = 'images/'
      var redMarker = L.icon({
        iconUrl: imgDir + 'marker-icon-red.png',
        iconRetinaUrl: imgDir + 'marker-icon-red-2x.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [-0, -31],
        shadowUrl: imgDir + 'marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [14, 41]
      })
      var layerGeo = L.geoJson(window.geoInfo, {
        // correctly map the geojson coordinates on the image
        coordsToLatLng: function (coords) {
          return rc.unproject(coords)
        },
        // add a popup content to the marker
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name)
          }
        },
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {
            icon: redMarker
          })
        }
      })
      map.addLayer(layerGeo)
      return layerGeo
    },
    // 添加多边形
    layerPolygon (map, rc) {
      var points = window.polygon.map(function (point) {
        return rc.unproject([point.x, point.y])
      })
      var layerPolygon = L.polygon([points])
      map.addLayer(layerPolygon)
      return layerPolygon
    },
    // 添加圆圈
    layerCircles (map, rc) {
      /*
        // using circle may cause displaying a ellipse at the edges of the image
        // radius is painful to adjust - simply don't use
        const circle = L.circle(rc.unproject([200, 1000]), { radius: 1e6 })
        */

      /*
        // drawing a circle with a polyline
        // Not so nice because of the visible steps
        function circlePoints ([x, y], r, steps = 360) {
          var p = []
          for (var i = 0; i < steps; i++) {
            p.push(rc.unproject([
              (x + r * Math.cos(2 * Math.PI * i / steps)),
              (y + r * Math.sin(2 * Math.PI * i / steps))
            ]))
          }
          return p
        }
        const polyline = L.polygon([circlePoints([200, 200], 200)], {
          fillColor: '#3388ff',
          color: '#fb0000'
        })
        */

      // Custom marker prototype - credits to Arkensor
      L.CircleMarkerScaling = L.CircleMarker.extend({
        _project: function () {
          this._point = this._map.latLngToLayerPoint(this._latlng)
          this._radius = 2 * this.options.radius * this._map.getZoomScale(this._map.getZoom(), this._map.getMaxZoom())
          this._updateBounds()
        }
      })
      L.circleMarkerScaling = function (latlng, options) {
        return new L.CircleMarkerScaling(latlng, options)
      }

      const custom = L.circleMarkerScaling(rc.unproject([200, 200]), {
        radius: 200,
        fillColor: '#3388ff',
        color: '#fbff2c'
      })

      const layer = L.featureGroup([custom])
      map.addLayer(layer)
      return layer
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
    setMapParams () {
      this.isShowing = true
      this.originalUrl = this.currentUrl + ''
      this.currentUrl = `http://${window.g.mapUrl}/tiles/${this.currentF}F/{z}/{x}/{y}.png`
      this.init2('map2')
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
          this.isShowing = false
          self.currentUrl = self.originalUrl + ''
          document.getElementById('myCustomButton').remove()
        }
        allElements[allElements.length - 1].appendChild(a)
      }
    }
  }
}
</script>
<style lang="less" rel="stylesheet/scss" scoped>
  html, body, #map {
    width:100%;
    height:100%;
    margin:0;
    padding:0;
    background-color: #B0B0B0
  }
</style>
