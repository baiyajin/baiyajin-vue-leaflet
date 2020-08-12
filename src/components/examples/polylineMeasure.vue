<template>
  <div class="vue-leaflet">
    <l-map
      class="l-map"
      :center="mapCentre"
      :zoom="mapZoom"
      @polylinemeasure:toggle="handleToggle"
      @polylinemeasure:start="handleStart"
      @polylinemeasure:resume="handleResume"
      @polylinemeasure:finish="handleFinish"
      @polylinemeasure:clear="handleClear"
      @polylinemeasure:add="handleAdd"
      @polylinemeasure:insert="handleInsert"
      @polylinemeasure:move="handleMove"
      @polylinemeasure:remove="handleRemove"
    >
      <l-tile-layer
        :url="tileUrl"
        :attribution="tileAttribution"
      />
      <l-control-polyline-measure />
    </l-map>
    <p
      v-for="event in events"
      :key="event.order"
    >
      {{ event.order }}. {{ event.desc }}
    </p>
  </div>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'
import LControlPolylineMeasure from 'vue2-leaflet-polyline-measure'
import L from 'leaflet'
export default {
  components: {
    LMap,
    LTileLayer,
    LControlPolylineMeasure
  },
  data () {
    return {
      mapCentre: L.latLng(25.085540595994082, 102.73151814937593),
      mapZoom: 13,
      tileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      tileAttribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors',
      eventDescriptions: []
    }
  },
  computed: {
    events () {
      return this.eventDescriptions.map((desc, idx) => ({ order: idx + 1, desc })).reverse()
    }
  },
  methods: {
    addEvent (desc) {
      this.eventDescriptions.push(desc)
    },
    handleToggle (e) {
      this.addEvent(`Toggled: ${e.sttus}`)
    },
    handleStart (currentLine) {
      this.addEvent(`Started: Initial distance ${currentLine.distance}`)
    },
    handleResume (currentLine) {
      this.addEvent(`Resumed: Current distance ${currentLine.distance}`)
    },
    handleFinish (currentLine) {
      this.addEvent(`Finished: Total distance ${currentLine.distance}`)
    },
    handleClear () {
      this.addEvent('Cleared')
    },
    handleAdd (e) {
      this.addEvent(`Added point: ${e.latlng}`)
    },
    handleInsert (e) {
      this.addEvent(`Inserted point: ${e.latlng}`)
    },
    handleMove (e) {
      this.addEvent(`Moved point: ${e.latlng} to ${e.sourceTarget._latlng}`)
    },
    handleRemove (e) {
      this.addEvent(`Removed point: ${e.latlng}`)
    }
  }
}
</script>

<style>
  .leaflet-bar #polyline-measure-control{
    position: fixed;
    left: 10px;
    top: 112px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
  }
</style>
