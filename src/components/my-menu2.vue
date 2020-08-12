<template>
  <div class="nav">
    <div class="nav_div menu">
      <div
        class="menu_name"
        v-for="(item, index) in menuList"
        :key="index"
        @click="jupmTo(item.id, item.path)"
      >
        <div class="status" v-if="item.id === clickId"></div>
        <div
          class="title"
          :class="item.id === clickId ? 'clickColor' : 'noClickColor'"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
export default {
  name: 'myMenu',
  data () {
    return {
      menuList: [
        {name: 'choropleth', path: '/choropleth', id: 'choropleth'},
        {name: 'editablecirclemarker', path: '/editablecirclemarker', id: 'editablecirclemarker'},
        {name: 'geosearch', path: '/geosearch', id: 'geosearch'},
        {name: 'markercluster', path: '/markercluster', id: 'markercluster'},
        {name: 'locatecontrol', path: '/locatecontrol', id: 'locatecontrol'},
        {name: 'movingmarker', path: '/movingmarker', id: 'movingmarker'},
        {name: 'pathTransform', path: '/pathTransform', id: 'pathTransform'},
        {name: 'polylineMeasure', path: '/polylineMeasure', id: 'polylineMeasure'},
        {name: 'polylinedecorator', path: '/polylinedecorator', id: 'polylinedecorator'},
        {name: 'rotatedmarker', path: '/rotatedmarker', id: 'rotatedmarker'},
        {name: 'tracksymbol', path: '/tracksymbol', id: 'tracksymbol'},
        {name: 'minimap', path: '/minimap', id: 'minimap'},
        {name: 'hotline', path: '/hotline', id: 'hotline'},
        {name: 'axesgrid', path: '/axesgrid', id: 'axesgrid'}
      ]
    }
  },
  mounted () {
    this.menuList.forEach(item => {
      if (item.id === this.clickId) {
        this.$router.push(item.path)
      }
    })
  },
  computed: {
    ...mapState(['clickId'])
  },
  methods: {
    ...mapMutations(['setClickId']),
    jupmTo (id, path) {
      this.setClickId(id)
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" rel="stylesheet/scss" scoped>
.nav {
  z-index: 999;
  position: absolute;
  background: white;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  .nav_div {
  }
  .logo {
    width: 15%;
    .el-image,
    svg {
      height: 35px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      path {
        fill: var(--navbar-font-hover-color);
      }
    }
  }
  .menu {
    cursor: pointer;
    width: 70%;
    display: flex;
    .menu_name {
      width: 100%;
      line-height: 50px;
      text-align: center;
      .title {
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        &:hover {
          color: black !important;
        }
      }
      .status {
        width: 30%;
        margin: auto;
        border-bottom: 2px solid black;
      }
      .clickColor {
        color: black !important;
      }
      .noClickColor {
        color: gray !important;
      }
    }
  }
}
</style>
