<template>
  <div class="nav">
    <div class="nav_div menu">
      <div
        class="menu_name"
        v-for="(item, index) in menuList"
        :key="index"
        @click="jupmTo(item.id, item.path)"
      >
        <div
          class="title"
          :class="item.id === clickId ? 'clickColor' : 'noClickColor'"
        >
          {{ item.name }}
        </div>
        <div class="status" v-if="item.id === clickId"></div>
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
        {name: '标记', path: '/VueLeaflet', id: 1}, // 双击添加标记，点击标记显示默认6个地图
        {name: '标记打点', path: '/VueLeaflet2', id: 2}, // 双击添加标记，点击标记没有地图
        {name: '标记菜单', path: '/VueLeaflet3', id: 3}, // 双击添加标记，点击标记显示默认3个地图，地图是从后台接口获取的，再点击地图会遮住原来地图
        {name: '跳转', path: '/VueLeaflet4', id: 4}, // 双击添加标记，点击标记显示默认3个地图，再点击地图会覆盖掉原来的地图
        {name: '图片', path: '/VueLeaflet5', id: 5}, // 不使用经纬度，而是使用图片的坐标系
        {name: '多边形', path: '/VueLeaflet6', id: 6}, // 多边形
        {name: '无平铺', path: '/VueLeaflet7', id: 7}, // 有平铺
        {name: '点/标记/多边形', path: '/VueLeaflet8', id: 8}, //  无平铺
        {name: '绘制', path: '/VueLeaflet9', id: 9}, //  无平铺
        {name: '最终效果', path: '/VueLeaflet10', id: 10} //  无平铺
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
  top: 0;
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
