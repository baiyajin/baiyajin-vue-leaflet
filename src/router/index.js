import Vue from 'vue'
import Router from 'vue-router'
import VueLeaflet from '@/components/VueLeaflet'
import VueLeaflet2 from '@/components/VueLeaflet2'
import VueLeaflet3 from '@/components/VueLeaflet3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/VueLeaflet',
      name: 'VueLeaflet',
      component: VueLeaflet
    },
    {
      path: '/VueLeaflet2',
      name: 'VueLeaflet2',
      component: VueLeaflet2
    },
    {
      path: '/VueLeaflet3',
      name: 'VueLeaflet3',
      component: VueLeaflet3
    }
  ]
})
