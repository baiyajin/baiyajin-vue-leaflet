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
import VueLeaflet9 from '@/components/VueLeaflet9'
import VueLeaflet10 from '@/components/VueLeaflet10'
import VueLeaflet11 from '@/components/VueLeaflet11'
// 例子
import choropleth from '@/components/examples/choropleth'
import axesgrid from '@/components/examples/axesgrid'
import editablecirclemarker from '@/components/examples/editablecirclemarker'
import geosearch from '@/components/examples/geosearch'
import googlemutant from '@/components/examples/googlemutant'
import markercluster from '@/components/examples/markercluster'
import locatecontrol from '@/components/examples/locatecontrol'
import movingmarker from '@/components/examples/movingmarker'
import pathTransform from '@/components/examples/pathTransform'
import polylineMeasure from '@/components/examples/polylineMeasure'
import polylinedecorator from '@/components/examples/polylinedecorator'
import rotatedmarker from '@/components/examples/rotatedmarker'
import tracksymbol from '@/components/examples/tracksymbol'
import minimap from '@/components/examples/minimap'
import hotline from '@/components/examples/hotline2'

/* 处理Avoided redundant navigation to current location */
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
    },
    {
      path: '/VueLeaflet9',
      name: 'VueLeaflet9',
      component: VueLeaflet9
    },
    {
      path: '/VueLeaflet10',
      name: 'VueLeaflet10',
      component: VueLeaflet10
    },
    {
      path: '/VueLeaflet11',
      name: 'VueLeaflet11',
      component: VueLeaflet11
    },
    {
      path: '/choropleth',
      name: 'choropleth',
      component: choropleth
    },
    {
      path: '/editablecirclemarker',
      name: 'editablecirclemarker',
      component: editablecirclemarker
    },
    {
      path: '/geosearch',
      name: 'geosearch',
      component: geosearch
    },
    {
      path: '/googlemutant',
      name: 'googlemutant',
      component: googlemutant
    },
    {
      path: '/markercluster',
      name: 'markercluster',
      component: markercluster
    },
    {
      path: '/pathTransform',
      name: 'pathTransform',
      component: pathTransform
    },
    {
      path: '/locatecontrol',
      name: 'locatecontrol',
      component: locatecontrol
    },
    {
      path: '/movingmarker',
      name: 'movingmarker',
      component: movingmarker
    },
    {
      path: '/polylineMeasure',
      name: 'polylineMeasure',
      component: polylineMeasure
    },
    {
      path: '/polylinedecorator',
      name: 'polylinedecorator',
      component: polylinedecorator
    },
    {
      path: '/rotatedmarker',
      name: 'rotatedmarker',
      component: rotatedmarker
    },
    {
      path: '/hotline',
      name: 'hotline',
      component: hotline
    },
    {
      path: '/tracksymbol',
      name: 'tracksymbol',
      component: tracksymbol
    },
    {
      path: '/minimap',
      name: 'minimap',
      component: minimap
    },
    {
      path: '/axesgrid',
      name: 'axesgrid',
      component: axesgrid
    }
  ]
})
