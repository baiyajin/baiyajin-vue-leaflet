<template>
  <div class="vue-leaflet">
    <v-map :zoom=14 :center="center">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-editablecirclemarker :latLng.sync="ll" :rad="rad" :options="{icon:icon}"></v-editablecirclemarker>
    </v-map>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import {LMap, LTileLayer} from 'vue2-leaflet'
import L from 'leaflet'
import Vue2LeafletEditablecirclemarker from 'vue2-leaflet-editablecirclemarker'

const x = -35.15
const y = -58.2
let llvar = L.latLng(x, y)

  @Component({
    components: {
      'v-map': LMap,
      'v-tilelayer': LTileLayer,
      'v-editablecirclemarker': Vue2LeafletEditablecirclemarker
    }
  })
export default class Map extends Vue {
    icon = L.divIcon({
      className: 'markerAB markerA',
      popupAnchor: [0, -40]
    })
    center = L.latLng(x, y)
    rad = 200
    get ll () {
      return llvar
    }
    set ll (val) {
      console.log('setll', val)
      llvar = val
    }
    mounted () {
      let self = this
      setTimeout(function () {
        self.rad = 1000
      }, 3000)
    }
  }
</script>

<style>
</style>
