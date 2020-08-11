<template>
  <l-map style="height: 350px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-polygon @update="updateVisible" @ready="ready" :lat-lngs="polygon.latlngs" :color="polygon.color"></l-polygon>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LPolygon} from 'vue2-leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LPolygon
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [47.313220, -1.319482],
      polygon: {
        latlngs: [
          [47.2263299, -1.6222], [47.26828069, -1.5621185], [47.2657179, -1.589241], [47.2589612, -1.6204834], [47.237287, -1.6266632], [47.2263299, -1.6222]
        ],
        color: 'green'
      }
    }
  },
  methods: {
    updateVisible (b) {
      console.log(b)
    },
    ready (b) {
      console.log(b)
    }
  }
}
</script>
