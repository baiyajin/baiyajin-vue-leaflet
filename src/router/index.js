import Vue from 'vue'
import Router from 'vue-router'
import VueLeaflet from '@/components/VueLeaflet'
import VueLeaflet2 from '@/components/VueLeaflet2'
import VueLeaflet3 from '@/components/VueLeaflet3'
import VueLeaflet4 from '@/components/VueLeaflet4'
import VueLeaflet5 from '@/components/VueLeaflet5'
import VueLeaflet6 from '@/components/VueLeaflet6'
import VueLeaflet7 from '@/components/VueLeaflet7'
import VueLeaflet8 from '@/components/VueLeaflet8'

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
    },
    {
      path: '/VueLeaflet4',
      name: 'VueLeaflet4',
      component: VueLeaflet4
    },
    {
      path: '/VueLeaflet5',
      name: 'VueLeaflet5',
      component: VueLeaflet5
    },
    {
      path: '/VueLeaflet6',
      name: 'VueLeaflet6',
      component: VueLeaflet6
    },
    {
      path: '/VueLeaflet7',
      name: 'VueLeaflet7',
      component: VueLeaflet7
    },
    {
      path: '/VueLeaflet8',
      name: 'VueLeaflet8',
      component: VueLeaflet8
    }
  ]
})
