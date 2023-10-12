<template>
  <div class="map">
    <div class="map__container">
      <l-map ref="map" v-model:zoom="zoom" :center="center">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker v-for="p in point" :key="p.id" :lat-lng="[p.latitude, p.longitude]" :icon="pointIcon"></l-marker>
        <l-marker v-for="d in driver" :key="d.id" :lat-lng="[d.latitude, d.longitude]" :icon="driverIcon"></l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import * as L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import markerPoint from '@/assets/images/icons/point-marker.svg'
import markerBus from '@/assets/images/icons/bus-marker.svg'

L.Icon.Default.imagePath = '.'
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const { point, driver } = defineProps<{
  point: any[]
  driver: any[]
}>()

const zoom = ref(14)
const center = ref([-21.28198664189604, -50.332422881087474])

const pointIcon = new L.Icon({
  iconUrl: markerPoint,
  shadowUrl: markerShadow,
  iconSize: [50, 80],
  iconAnchor: [12, 41],
  shadowSize: [0, 0]
})

const driverIcon = new L.Icon({
  iconUrl: markerBus,
  shadowUrl: markerShadow,
  iconSize: [70, 100],
  iconAnchor: [12, 41],
  shadowSize: [0, 0]
})
</script>

<style scoped>
.map__container {
  width: 100%;
  height: 650px;
}

@media (max-height: 800px) {
  .map__container {
    height: 430px;
  }
}
</style>
