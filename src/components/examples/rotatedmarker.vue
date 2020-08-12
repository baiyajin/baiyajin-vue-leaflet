<template>
  <div class="vue-leaflet">
    <v-map :zoom=10 :center="initialLocation">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-rotated-marker v-for="l in locations" :key="l.id"
                        :lat-lng="l.latlng"
                        :icon="icon"
                        @click="handleMarkerClick(l)"
                        :rotationOrigin="l.origin"
                        :rotationAngle="l.yaw">
      </v-rotated-marker>
    </v-map>
  </div>
</template>

<script>
import { Icon, LatLng } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import Vue2LeafletRotatedMarker from 'vue2-leaflet-rotatedmarker'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
function rand (n) {
  let max = n + 0.1
  let min = n - 0.1
  return Math.random() * (max - min) + min
}
export default {
  components: {
    'v-map': LMap,
    'v-tilelayer': LTileLayer,
    'v-marker': LMarker,
    'v-rotated-marker': Vue2LeafletRotatedMarker
  },
  methods: {
    handleMarkerClick (l) {
      l.yaw += 20
      this.$set(l, 'yaw', l.yaw)
    },
    frame () {
      this.locations[0].yaw += 2
      this.locations[1].yaw += 2
      this.locations[2].yaw += 2
    }
  },
  data () {
    this.locations = []
    for (let i = 0; i < 10; i++) {
      this.locations.push({
        id: i,
        yaw: Math.random() * 360 - 180,
        origin: 'bottom center',
        latlng: new LatLng(rand(-34.9205), rand(-57.953646)),
        text: 'Hola ' + i
      })
    }
    let icon = new Icon({iconUrl})
    return {
      locations: this.locations,
      icon,
      initialLocation: new LatLng(-34.9205, -57.953646)
    }
  },
  mounted () {
    setTimeout(() => {
      this.clusterOptions = { disableClusteringAtZoom: 11 }
    }, 1000)
    this.intervalId = setInterval(this.frame, 100)
  }
}
</script>

<style>
</style>
