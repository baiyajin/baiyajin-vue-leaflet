<template>
  <div class="vue-leaflet">
    <my-custom-popup @executeFun="executeFun" ref="myCustomPopup" :buttons="myPopup.buttons" :title="myPopup.title" :transformX="myPopup.x" :transformY="myPopup.y"></my-custom-popup>
    <l-map
      @update:center="updateCenter"
      @update:zoom="updateZoom"
      @ready="doSomethingOnReady"
      id="map2"
      class="l-map"
      :zoom="map2.zoom"
      ref="map2"
      :maxZoom="map2.maxZoom"
      :minZoom="map2.minZoom"
      :center="map2.center">
      <!--多边形-->
      <l-polygon v-for="(item2, index2) in map2.polygons" :key="'polygon' + index2" @update="polygonUpdate" @ready="polygonReady($event, index2)" :lat-lngs="item2.polygon.latlngs" :color="item2.polygon.color"></l-polygon>
      <!--地图-->
      <l-tile-layer :noWrap="true" :url="map2.url"></l-tile-layer>
      <!--控制层，点线面绘制-->
      <l-control position="topleft">
        <control-marker :map="map" @perspective="perspective"></control-marker>
      </l-control>
      <!--标记分组-->
      <v-marker-cluster ref="clusterRef">
        <!--标记-->
        <l-marker v-for="(item, index) in map2.markers" :key="'marker' + index" :lat-lng="item.marker" :icon="item.icon">
          <l-popup :content="item.text"></l-popup>
        </l-marker>
      </v-marker-cluster>
    </l-map>

    <!--点击跳转到的地图-->
    <l-map v-if="showMap3" @update:center="updateCenter" @update:zoom="updateZoom" id="map3" class="l-map child_map_div" :zoom="map3.zoom" ref="map3" :maxZoom="map3.maxZoom" :minZoom="map3.minZoom" :center="map3.center">
      <!--返回-->
      <a v-if="isSHowButton" @click="clickReturn" class="leaflet-control-zoom-out" id="myCustomButton" title="返回" role="button" aria-label="返回">«</a>
      <!--多边形-->
      <l-polygon v-for="(item2, index2) in map3.polygons" :key="'map3polygon' + index2" @update="polygonUpdate" @ready="polygonReady($event, index2)" :lat-lngs="map3.polygon.latlngs" :color="map3.polygon.color"></l-polygon>
      <!--地图-->
      <l-tile-layer :noWrap="true" :url="map3.url"></l-tile-layer>
      <!--标记分组-->
      <v-marker-cluster ref="clusterRef3">
        <!--标记-->
        <l-marker v-for="(item, index) in map3.markers" :key="'map3marker' + index" :lat-lng="item.marker" :icon="item.icon">
          <l-popup :content="item.text"></l-popup>
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import ControlMarker from '@/components/ControlMarker'
// 刷新集群 this.$refs.clusterRef.mapObject.refreshClusters()
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import { LMap, LTileLayer, LMarker, LPopup, LPolygon, LControl } from 'vue2-leaflet'
import myCustomPopup from '@/components/my-custom-popup'
import L from 'leaflet'
export default {
  name: 'VueLeaflet',
  components: {
    'v-marker-cluster': Vue2LeafletMarkerCluster,
    'control-marker': ControlMarker,
    myCustomPopup,
    LMap,
    LControl,
    LPolygon,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      isSHowButton: false,
      currentPolygonIndex: 0,
      myPopup: {
        title: '1栋楼层',
        buttons: ['1F', '2F', '3F'],
        x: 0,
        y: 0
      },
      img: [3831, 3101], // 图片显示时的宽高
      originalMap: null,
      showMap3: false,
      map: null,
      map3: {
        zoom: 1
      },
      map2: {
        center: [0, 0],
        zoom: 1,
        maxZoom: 6,
        minZoom: 0,
        url: 'http://192.168.1.115/tiles/ground/{z}/{x}/{y}.png',
        markers: [],
        // 多边形
        polygons: [
          {
            polygon: {
              latlngs: [
                [84.08887757413991, -116.71875000000001],
                [84.12497319391095, -60.11718750000001],
                [80.11856387883782, -58.35937500000001],
                [80.297927149974, -117.07031250000001]
              ],
              color: '#FFC107'
            }
          },
          {
            polygon: {
              latlngs: [
                [70.37785394109227, -149.76562500000003],
                [69.53451763078358, -129.02343750000003],
                [49.83798245308484, -129.37500000000003],
                [50.958426723359935, -149.41406250000003]
              ],
              color: 'blue'
            }
          },
          {
            polygon: {
              latlngs: [
                [50.51342652633956, -105.82031250000001],
                [50.736455137010665, -71.01562500000001],
                [36.31512514748051, -70.66406250000001],
                [36.59788913307022, -105.82031250000001]
              ],
              color: 'red'
            }
          },
          {
            polygon: {
              latlngs: [
                [69.41124235697256, -47.81250000000001],
                [69.03714171275197, -27.070312500000004],
                [48.69096039092552, -26.718750000000004],
                [50.51342652633956, -48.16406250000001]
              ],
              color: '#00BCD4'
            }
          }
        ]
      },
      // 主图的摄像头
      markers: [
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.2502085616531686, -3.5156250000000004),
          text: `<div class="title">3</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(2.986927393334876, -5.888671875),
          text: `<div class="title">4</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.0746950723696944, -8.173828125000002),
          text: `<div class="title">5</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.2502085616531686, -10.634765625),
          text: `<div class="title">6</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.0746950723696944, -13.359375000000002),
          text: `<div class="title">7</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.162455530237848, -16.347656250000004),
          text: `<div class="title">8</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.162455530237848, -19.248046875000004),
          text: `<div class="title">9</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(2.986927393334876, -21.972656250000004),
          text: `<div class="title">10</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.2502085616531686, -24.9609375),
          text: `<div class="title">11</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.2502085616531686, -27.773437500000004),
          text: `<div class="title">12</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.2502085616531686, -30.498046875000004),
          text: `<div class="title">13</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(2.986927393334876, -32.34375000000001),
          text: `<div class="title">14</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(2.986927393334876, -35.15625000000001),
          text: `<div class="title">15</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(2.986927393334876, -37.79296875000001),
          text: `<div class="title">16</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(2.986927393334876, -41.48437500000001),
          text: `<div class="title">17</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.162455530237848, -46.58203125000001),
          text: `<div class="title">18</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(2.8991526985043135, -50.36132812500001),
          text: `<div class="title">19</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(3.425691524418062, -57.91992187500001),
          text: `<div class="title">20</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.54060382149495, -152.92968750000003),
          text: `<div class="title">21</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.58610635020881, -147.30468750000003),
          text: `<div class="title">22</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.58610635020881, -140.97656250000003),
          text: `<div class="title">23</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.58610635020881, -133.59375000000003),
          text: `<div class="title">24</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.44876405595812, -128.32031250000003),
          text: `<div class="title">25</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.44876405595812, -123.04687500000001),
          text: `<div class="title">26</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.49482361179574, -119.53125000000001),
          text: `<div class="title">27</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.54060382149495, -55.54687500000001),
          text: `<div class="title">28</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.26169873683153, -46.75781250000001),
          text: `<div class="title">29</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.26169873683153, -35.15625000000001),
          text: `<div class="title">30</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.40242347938855, -23.906250000000004),
          text: `<div class="title">31</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.21421714106776, -20.742187500000004),
          text: `<div class="title">32</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(80.64703474739618, -21.093750000000004),
          text: `<div class="title">33</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(78.06198918665976, -18.984375000000004),
          text: `<div class="title">34</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(75.23066741281573, -21.4453125),
          text: `<div class="title">35</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(71.41317683396566, -21.4453125),
          text: `<div class="title">36</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(67.7427590666639, -21.4453125),
          text: `<div class="title">37</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(63.54855223203644, -20.742187500000004),
          text: `<div class="title">38</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(51.6180165487737, -22.5),
          text: `<div class="title">39</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(45.82879925192134, -22.148437500000004),
          text: `<div class="title">40</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(43.068887774169625, -23.906250000000004),
          text: `<div class="title">41</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(42.8115217450979, -38.3203125),
          text: `<div class="title">42</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(42.8115217450979, -53.08593750000001),
          text: `<div class="title">43</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(42.8115217450979, -60.46875000000001),
          text: `<div class="title">44</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(43.068887774169625, -64.68750000000001),
          text: `<div class="title">45</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(44.84029065139799, -110.39062500000001),
          text: `<div class="title">46</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(44.59046718130883, -120.58593750000001),
          text: `<div class="title">47</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(44.08758502824518, -132.89062500000003),
          text: `<div class="title">48</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(44.84029065139799, -143.08593750000003),
          text: `<div class="title">49</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(44.84029065139799, -150.11718750000003),
          text: `<div class="title">50</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(45.583289756006316, -155.7421875),
          text: `<div class="title">51</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(54.16243396806781, -155.39062500000003),
          text: `<div class="title">52</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(61.77312286453146, -154.68750000000003),
          text: `<div class="title">53</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(67.06743335108298, -153.98437500000003),
          text: `<div class="title">54</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(71.63599288330609, -154.68750000000003),
          text: `<div class="title">55</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(75.14077784070429, -153.63281250000003),
          text: `<div class="title">56</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(78.1344931829381, -152.57812500000003),
          text: `<div class="title">57</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(79.68718415450823, -152.92968750000003),
          text: `<div class="title">58</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(81.4139332828511, -154.33593750000003),
          text: `<div class="title">59</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(82.30889251821554, -153.63281250000003),
          text: `<div class="title">60</div>`
        }
      ],
      // 楼层1的摄像头标记
      markers1: [
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(25.799891182088334, -66.44531250000001),
          text: `<div class="title">万里马</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(25.16517336866393, -55.19531250000001),
          text: `<div class="title">富贵鸟</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(25.720735134412106, -41.83593750000001),
          text: `<div class="title">奥康</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(25.3241665257384, -31.113281250000004),
          text: `<div class="title">达芙妮</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(24.5271348225978, -16.875000000000004),
          text: `<div class="title">接吻猫</div>`
        }
      ],
      // 楼层2的摄像头标记
      markers2: [
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(72.81607371878991, -132.27539062500003),
          text: `<div class="title">girlogle</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(72.3424643905499, -120.23437500000001),
          text: `<div class="title">E.XUX</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(72.3424643905499, -109.51171875000001),
          text: `<div class="title">雪儿</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(72.44879155730672, -100.01953125000001),
          text: `<div class="title">巴洛克</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(78.06198918665976, -131.83593750000003),
          text: `<div class="title">普普风</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(78.24243607612068, -116.01562500000001),
          text: `<div class="title">圣迪奥</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(78.20656311074711, -100.89843750000001),
          text: `<div class="title">达衣岩</div>`
        }
      ],
      // 楼层3的摄像头标记
      markers3: [
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(72.28906720017675, -143.96484375000003),
          text: `<div class="title">艾可儿</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(64.77412531292873, -143.43750000000003),
          text: `<div class="title">菲妮迪</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(55.7765730186677, -143.08593750000003),
          text: `<div class="title">卡汶</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(46.31658418182218, -142.91015625000003),
          text: `<div class="title">经典故事</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(35.02999636902566, -143.08593750000003),
          text: `<div class="title">贝特如</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(71.9653876991313, -121.46484375000001),
          text: `<div class="title">奔霓诗</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(62.51231793838694, -120.93750000000001),
          text: `<div class="title">露滴</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(51.6180165487737, -121.11328125000001),
          text: `<div class="title">川代</div>`
        },
        {
          icon: L.icon({
            iconUrl: require('./../assets/img/camera.png'),
            iconSize: [38, 95]
          }),
          marker: L.latLng(35.31736632923788, -120.05859375000001),
          text: `<div class="title">享奴</div>`
        }
      ]
    }
  },
  created () {
    this.map2.markers = this.markers
  },
  mounted () {
    this.map = this.$refs.map2.mapObject
    // 设置位置
    var rc2 = new L.RasterCoords(this.map, this.img)
    this.map.setView(rc2.unproject([this.img[0] / 2, this.img[1] / 2]), 1)
    // 双击添加标记
    // let a = ''
    this.map.on('click', function (e) {
      // 单击不添加
      // a += e.latlng.lat + ', ' + e.latlng.lng + '\n'
      // console.log(a)
    }).on('dblclick', function (e) {
    })
  },
  methods: {
    perspective (center) {
      this.map2.center = center
    },
    doSomethingOnReady () {
      this.map = this.$refs.map2.mapObject
    },
    updateCenter (center) {
      this.$refs.myCustomPopup.closePopup()
      this.map2.center = center
    },
    updateZoom (zoom) {
      // console.log(b)
      this.map2.zoom = zoom
    },
    updateBounds (b) {
      console.log(b)
    },
    polygonUpdate (b) {
      console.log(b)
    },
    polygonReady (e, index) {
      let self = this
      e._path.onclick = function (e) {
        self.currentPolygonIndex = index
        self.myPopup.title = `${index + 1} 栋楼层`
        self.myPopup.x = e.x
        self.myPopup.y = e.y
        self.$refs.myCustomPopup.openPopup()
      }
    },
    executeFun (index) {
      if (!this.originalMap) {
        this.originalMap = JSON.parse(JSON.stringify(this.map2))
      }
      this.$refs.myCustomPopup.closePopup()
      this.map3 = JSON.parse(JSON.stringify(this.map2))
      this.map3.center = [0, 0]
      this.map3.zoom = 1
      this.map3.markers = this[`markers${index + 1}`]
      this.map3.polygons = []
      this.map3.maxZoom = 4
      this.map3.url = `http://192.168.1.115/tiles/${index + 1}F/{z}/{x}/{y}.png`
      this.showMap3 = true
      this.isSHowButton = true
      // this.addReturnButton()
    },
    addReturnButton () {
      let self = this
      let myCustomButton = document.getElementById('myCustomButton')
      if (!myCustomButton) {
        let allElements = document.getElementsByClassName('leaflet-control-zoom leaflet-bar leaflet-control')
        console.log(allElements[0])
        console.log(allElements[2])
        let a = document.createElement('a')
        a.setAttribute('class', 'leaflet-control-zoom-out')
        a.setAttribute('id', 'myCustomButton')
        a.setAttribute('title', '返回')
        a.setAttribute('role', 'button')
        a.setAttribute('aria-label', '返回')
        a.innerHTML = '«'
        a.onclick = function () {
          self.map2 = JSON.parse(JSON.stringify(self.originalMap))
          self.map2.markers = self.markers
          self.map3 = []
          self.showMap3 = false
          document.getElementById('myCustomButton').remove()
          // 模拟点击当前当前多边形元素,一定要延时一会
          setTimeout(() => {
            // self.clickElement(self.currentPolygonIndex)
          }, 100)
        }
        allElements[allElements.length - 1].appendChild(a)
      }
    },
    clickReturn () {
      this.map2 = JSON.parse(JSON.stringify(this.originalMap))
      this.map2.markers = this.markers
      this.map3 = []
      this.showMap3 = false
      this.isSHowButton = false
    },
    // 模拟点击元素
    clickElement (index) {
      let paths = document.getElementsByClassName('leaflet-interactive')
      paths[index].click()
    }
  }
}
</script>

<style lang="less" rel="stylesheet/scss" scoped>
  /*返回按钮*/
  #myCustomButton{
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: none;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    display: block;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    text-decoration: none;
    color: black;
    font: bold 18px 'Lucida Console', Monaco, monospace;
    text-indent: 1px;
    position: absolute;
    top: 62px;
    left: 10px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    z-index: 99999999;
    line-height: 26px;
  }
  .vue-leaflet{
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    .l-map{
      width: 100%;
      height: 100%;
      position:absolute;
    }
    .child_map_div{
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
