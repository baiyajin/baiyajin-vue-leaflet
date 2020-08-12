<template>
  <div class="vue-leaflet">
    <l-map
      class="l-map"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <v-locatecontrol/>
      <LHotline min=2 max=20 :latLngs="latLngArray"></LHotline>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
import LHotline from './Hotline'
export default {
  name: 'app',
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'v-locatecontrol': Vue2LeafletLocatecontrol,
    LHotline
  },
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: [47.413220, -1.219482],
      bounds: null,
      latLngArray: [[47.413220, -1.219482, 2], [47.413250, -1.119692, 20]]
    }
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    }
  }
}
</script>

<style>
  @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>
