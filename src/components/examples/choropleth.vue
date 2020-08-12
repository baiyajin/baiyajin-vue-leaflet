<template>
  <div class="vue-leaflet">
    <l-map
      :center="[-23.752961, -57.854357]"
      :zoom="6"
      class="l-map"
      style="height: 50%;top:50%;left:50%;transform: translate(-50%, -50%);"
      :options="mapOptions">
      <l-choropleth-layer
        :data="pyDepartmentsData"
        titleKey="department_name"
        idKey="department_id"
        :value="value"
        :extraValues="extraValues"
        geojsonIdKey="dpto"
        :geojson="paraguayGeojson"
        :colorScale="colorScale">
        <template slot-scope="props">
          <l-info-control
            :item="props.currentItem"
            :unit="props.unit"
            title="Department"
            placeholder="Hover over a department"/>
          <l-reference-chart
            title="Girls school enrolment"
            :colorScale="colorScale"
            :min="props.min"
            :max="props.max"
            position="topright"/>
        </template>
      </l-choropleth-layer>
    </l-map>
  </div>
</template>

<script>
import {LMap} from 'vue2-leaflet'
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'
import { geojson } from './py-departments-geojson'
import pyDepartmentsData from './py-departments-data'
import paraguayGeojson from './paraguay.json'
export default {
  components: {
    LMap,
    'l-info-control': InfoControl,
    'l-reference-chart': ReferenceChart,
    'l-choropleth-layer': ChoroplethLayer
  },
  data () {
    return {
      geojson,
      pyDepartmentsData,
      paraguayGeojson,
      colorScale: ['e7d090', 'e9ae7b', 'de7062'],
      value: {
        key: 'amount_w',
        metric: '% girls'
      },
      extraValues: [{
        key: 'amount_m',
        metric: '% boys'
      }],
      center: [-23.752961, -57.854357],
      mapOptions: {
        attributionControl: false
      }
    }
  }
}
</script>

<style>
</style>
