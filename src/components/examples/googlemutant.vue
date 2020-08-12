<template>
  <div class="vue-leaflet">
    <v-map :zoom=10 :center="initialLocation">
      <v-tilelayer-googlemutant :apikey="apikey" :options="options"></v-tilelayer-googlemutant>
    </v-map>
  </div>
</template>

<script>
import { latLng } from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet'
import Vue2LeafletGoogleMutant from 'vue2-leaflet-googlemutant'

export default {
  components: {
    'v-map': LMap,
    'v-tilelayer': LTileLayer,
    'v-tilelayer-googlemutant': Vue2LeafletGoogleMutant
  },
  methods: {
  },
  data () {
    let options = {
      type: 'roadmap'
    }
    let apikey = 'AIzaSyAWhMKmV9lrFIqNCUrIb25tyDsDeNvM4jk'
    return {
      apikey,
      options,
      initialLocation: latLng(-34.9205, -57.953646)
    }
  }
}
</script>

<style>
</style>
