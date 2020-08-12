<template>
  <div class="vue-leaflet">
    <v-map :zoom="10" :center="initialLocation">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-locatecontrol/>
    </v-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'
import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'
export default {
  components: {
    'v-map': LMap,
    'v-tilelayer': LTileLayer,
    'v-locatecontrol': Vue2LeafletLocatecontrol
  },
  data () {
    return {
      initialLocation: [59.93428, 30.335098]
    }
  }
}
</script>

<style>
  @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>
