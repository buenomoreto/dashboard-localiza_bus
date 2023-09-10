<template>
  <LayoutDashboard>
    <template #content>
      <h1>Dashboard</h1>
    </template>
  </LayoutDashboard>
</template>
<script setup lang="ts">
import LayoutDashboard from '@/components/layout/LayoutDashboard.vue'
// import useDriverService from '@/composables/useDriverService';
// import { ref } from 'vue';
// import { io } from 'socket.io-client';
// let datateste: any = ref();
// // Referência para armazenar a localização atual
// const location = ref<null | { latitude: number; longitude: number }>(null);

// // Função para obter a geolocalização atual do usuário
// const getGeolocation = () => {
//   if (!navigator.geolocation) {
//     console.error('Geolocalização não é suportada por este navegador.');
//     return;
//   }

//   navigator.geolocation.watchPosition(
//     ({ coords }) => {
//       const { latitude, longitude } = coords;
//       location.value = { latitude, longitude };
//       console.log('Localização obtida:', location.value);
//       updateLocation();
//     },
//     (error) => {
//       console.error('Erro ao obter a localização', error);
//     }
//   );
// };

// // Função para atualizar a localização no serviço
// const updateLocation = async () => {
//   if (!location.value) {
//     console.error('Localização não disponível.');
//     return;
//   }

//   try {
//     const { updateLocation } = useDriverService();
//     const response = await updateLocation(1, location.value);
//     console.log('Resposta do serviço:', response);
//   } catch ({ response }: any) {
//     console.error('Erro ao atualizar a localização:', response);
//   }
// };

// // Obter a geolocalização ao carregar o script
// getGeolocation();

// const socket = io('http://localhost:3000/', {
//   transports: ['websocket'],
//   reconnectionDelayMax: 10000,
//   timeout: 5000,
// });

// socket.on('locationUpdated', (data: { id: string; latitude: number; longitude: number }) => {
//   datateste.value = data;
// });
</script>
