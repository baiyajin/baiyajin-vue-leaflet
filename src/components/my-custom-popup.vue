<template>
  <div v-if="isShowPopup" class="leaflet-popup  leaflet-zoom-animated" :style="{transform: 'translate3d(' + transformX + 'px,' + transformY + 'px, 0px)',}">
    <div class="leaflet-popup-content-wrapper">
      <div class="leaflet-popup-content">
        <div class="title">{{title}}</div>
        <button @click="executeFun(index)" class="my-custom-button" v-for="(item, index) in buttons" :key="'button' + index">{{item}}</button>
      </div>
    </div>
    <div class="leaflet-popup-tip-container">
      <div class="leaflet-popup-tip"></div>
    </div>
    <a class="leaflet-popup-close-button" @click="isShowPopup = !isShowPopup">×</a>
  </div>
</template>
<script>
export default {
  props: {
    transformX: {
      type: Number,
      default: 0
    },
    transformY: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    buttons: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      isShowPopup: false
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    openPopup () {
      this.isShowPopup = true
    },
    closePopup () {
      this.isShowPopup = false
    },
    executeFun (index) {
      this.$emit('executeFun', index)
    }
  }
}
</script>

<style lang="less" rel="stylesheet/scss" scoped>
  .leaflet-popup.leaflet-zoom-animated{
    opacity: 1;
    bottom: 100%;
    z-index: 999;
    .leaflet-popup-close-button{
      position: absolute;
      top: 10px;
      right: 10px;
      text-decoration: none;
      padding: 4px 4px 0 0;
      border: none;
      text-align: center;
      width: 18px;
      height: 14px;
      font: 16px/14px Tahoma, Verdana, sans-serif;
      color: #c3c3c3;
      font-weight: bold;
      background: transparent;
      &:hover {
        color: red;
      }
    }
    .leaflet-popup-content{
      text-align: center;
      margin: auto;
      .title{
        margin: 10px 0;
        left: 0 !important;
      }
      .my-custom-button{
        display: block;
        margin: 20px;
      }
    }
  }
</style>
