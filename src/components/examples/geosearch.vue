<template>
  <div class="vue-leaflet">
    <v-map :zoom=3 :center="location">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <!-- IMPORTANT PART HERE -->
      <v-geosearch :options="geosearchOptions" ></v-geosearch>
      <!-- /IMPORTANT PART HERE -->
    </v-map>
  </div>
</template>
<script>
import Vue from 'vue'
import {LMap, LTileLayer} from 'vue2-leaflet'
import {OpenStreetMapProvider} from 'leaflet-geosearch'
import VGeosearch from 'vue2-leaflet-geosearch'

Vue.component('v-map', LMap)
Vue.component('v-tilelayer', LTileLayer)

export default {
  components: { VGeosearch },
  data () {
    return {
      location: [0, 0],
      geosearchOptions: { // Important part Here
        provider: new OpenStreetMapProvider()
      }
    }
  }
}
</script>
