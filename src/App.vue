<template>
  <div id="app">
    <my-menu></my-menu>
    <my-menu2></my-menu2>
    <router-view/>
  </div>
</template>

<script>
import MyMenu from './components/my-menu'
import MyMenu2 from './components/my-menu2'
export default {
  components: {
    MyMenu,
    MyMenu2
  },
  name: 'App'
}
</script>

<style lang="less" rel="stylesheet/scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.vue-leaflet{
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  /deep/.el_button{
    position: absolute;
    top: 70px;
    right: 20px;
    z-index: 999;
  }
.l-map{
  width: 100%;
  height: 100%;
  position:absolute;
}
/deep/.child_map_div{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 999999;
  background: white;
}
/deep/.leaflet-popup-content{
  width: 100% !important;
.title{
  position: relative;
  left: -19px;
  top: 10px;
  text-align: center;
  padding: 10px 20px;
}
button{
  margin: 10px auto;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
&:hover {
   color: #409eff;
   border-color: #c6e2ff;
   background-color: #ecf5ff;
 }
}
}
.switch_div{
.switch{
  position: absolute;
  top: 50%;
  color: white;
  font-size: 50px;
&:hover {
   color: #5cb6ff;
   transform: scale(1.2);
 }
}
.previous{
  left: -9%;
}
.next{
  right: -9%;
}
}
}
</style>
<style lang="less" rel="stylesheet/scss">
  /*修改标记弹出的内容层级*/
  .leaflet-fade-anim .leaflet-map-pane .leaflet-popup{
    z-index: 99999999;
  }
  /*放大缩小按钮*/
  .leaflet-top.leaflet-left{
    top: 50px;
  }
  body {
    height: auto !important;
  }
  /*控制层样式*/
  /deep/.control-panel .search .ant-input-search-enter-button .ant-input-group-addon .ant-input-search-button{
    font-size: 18px;
    color: #5e5656;
    background-color: #fff;
    border-color: #d9d9d9;
  }
  /deep/.control-panel .ant-table-thead > tr > th, .ant-table-tbody > tr > td{
    padding: 12px 14px;
    word-break: break-all;
  }
  /deep/.leaflet-container .leaflet-control-attribution, .leaflet-container .leaflet-control-scale{
    display: none;
  }
  /deep/.leaflet-marker-markerTooltip{
    white-space: nowrap;
    float: left;
    margin-left: 15px;
    margin-top: -5px;
    background-color: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 3px;
    box-shadow: 2px 2px 5px #888888;
    color: #000000;
    padding: 2px 5px;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    cursor: default;
  }
</style>
