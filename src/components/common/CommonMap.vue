<template>
  <div class="map">
    <div class="map__container" v-if="center">
      <l-map ref="map" v-model:zoom="zoom" :center="center" @click="onMapClick">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <l-marker
          v-if="markerPosition"
          :lat-lng="markerPosition"
          :icon="pointIcon"
        ></l-marker>
      </l-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import * as L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import markerPoint from '@/assets/images/icons/point-marker.svg'

L.Icon.Default.imagePath = '.'
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const emit = defineEmits(['change'])
const zoom = ref(14)
const center = ref()
const markerPosition = ref(null)
const pointIcon = new L.Icon({
  iconUrl: markerPoint,
  shadowUrl: markerShadow,
  iconSize: [50, 80],
  iconAnchor: [12, 41],
  shadowSize: [0, 0]
})

const onMapClick = (event: any) => {
  markerPosition.value = event.latlng
  emit('change', 'latitude', event.latlng.lat)
  emit('change', 'longitude', event.latlng.lng)
}

onMounted(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        center.value = [position.coords.latitude, position.coords.longitude]
      },
      (error) => {
        console.log('geolocation', error)
        center.value = [-23.55052, -46.633308]
      }
    )
  } else {
    center.value = [-23.55052, -46.633308]
  }
})
</script>

<style scoped>
.map__container {
  width: 100%;
  height: 236px;
}

@media (max-height: 800px) {
  .map__container {
    height: 430px;
  }
}
</style>
