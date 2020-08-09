<template>
  <div class="vue-leaflet">
    <div id="map"></div>
  </div>
</template>
<script>
  import('@/assets/js/rastercoords')
  import('@/assets/js/geojson')
  import('@/assets/js/index')
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
