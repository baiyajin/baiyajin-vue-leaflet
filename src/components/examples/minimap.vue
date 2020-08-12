<script>
import L from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'
import VueLeafletMinimap from 'vue-leaflet-minimap'
const mapAttribution = 'Map data &copy; OpenStreetMap contributors'
export default {
  name: 'Example',
  components: { LMap, LTileLayer, VueLeafletMinimap },
  data () {
    return {
      zoom: 13,
      center: L.latLng(25.085540595994082, 102.73151814937593),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: mapAttribution
    }
  },
  created () {
    this.layer = new L.TileLayer(this.url)
  }
}
</script>

<template>
  <div class="vue-leaflet">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <vue-leaflet-minimap :layer="layer" :options="{}"></vue-leaflet-minimap>
    </l-map>
  </div>
</template>

<style>
  .leaflet-control-minimap{
    position:relative;
    bottom: 50px;
    box-shadow: 0 0 28px 7px rgba(0, 0, 0, 0.55);
  }
</style>
