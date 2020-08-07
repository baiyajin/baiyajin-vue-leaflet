<template>
  <div id="app">
    <my-menu></my-menu>
    <router-view/>
  </div>
</template>

<script>
import MyMenu from './components/my-menu'
export default {
  components: {
    MyMenu
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
  z-index: 999;
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
