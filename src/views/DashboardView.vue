<template>
  <LayoutDashboard>
    <template #content>
      <h1>Dashboard</h1>
      <div class="container-entity-count">
        <EntityCount 
          v-if="busData.length" 
          entityName="Ônibus" 
          background="#2BB673"
          :data="busData" 
        />
        <SkeletonEntityCount v-else />
        <EntityCount 
          v-if="driverData.length" 
          entityName="Motoristas" 
          background="#4D4CAC" 
          :data="driverData" 
        />
        <SkeletonEntityCount v-else />
        <EntityCount 
          v-if="pointData.length" 
          entityName="Pontos" 
          background="#9698D6" 
          :data="pointData"
         />
        <SkeletonEntityCount v-else />
      </div>
      <BaseMap v-if="pointData.length || driverData.length" :point="pointData" :driver="driverData" />
    </template>
    <template #content-right>
      <VCalendar 
        :first-day-of-week="1"
        title-position="left" 
        :attributes="attrs" 
        @dayclick="handleDate"
        :masks="{weekdays: 'WWW'}"
      >
        <template #header-prev-button>
          <img src="@/assets/images/icons/arrow-prev.svg" width="40" height="40" alt="" />
        </template>
        <template #header-next-button>
          <img src="@/assets/images/icons/arrow-next.svg" width="40" height="40" alt="" />
        </template>
      </VCalendar>
      <ModificationHistory 
        :date="selectedDate" 
        :history="historyData"
        :loading="loading"
       />
    </template>
  </LayoutDashboard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import moment from 'moment';
import LayoutDashboard from '@/components/layout/LayoutDashboard.vue';
import EntityCount from '@/components/EntityCount.vue';
import SkeletonEntityCount from '@/components/skeletons/SkeletonEntityCount.vue';
import BaseMap from '@/components/base/BaseMap.vue';
import ModificationHistory from '@/components/ModificationHistory.vue';
import useBusService from '@/composables/useBusService';
import useDriverService from '@/composables/useDriverService';
import usePointService from '@/composables/usePointService';
import useHistoryService from '@/composables/useHistoryService';

const { getAllBus } = useBusService()
const { getAllDriver }= useDriverService()
const { getAllPoint } = usePointService()
const { getAllHistory } = useHistoryService()

const currentDate = moment().startOf('day').toDate();
const attrs = ref([{ dates: currentDate }]);
const loading = ref(true);

let busData = ref([]);
let driverData = ref([]);
let pointData = ref([]);
let historyData = ref([]);
let selectedDate = ref(moment(currentDate).format('D [de] MMMM [de] YYYY'));

const handleDate = async (date: any) => {
  try {
    selectedDate.value = moment(date.id).format('D [de] MMMM [de] YYYY');
    historyData.value = await getAllHistory(date.id, 8, 0);
  } catch (error) {
    console.error("History error:", error);
  } finally {
    loading.value = false;
  }
};

const fetchData = async () => {
  try {
    const [bus, driver, point, history] = await Promise.all([
      getAllBus(),
      getAllDriver(),
      getAllPoint(),
      getAllHistory(currentDate.toISOString(), 8, 0)
    ]);

    busData.value = bus;
    driverData.value = driver;
    pointData.value = point;
    historyData.value = history;

  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  } finally {
    loading.value = false;
  }
};

fetchData();

</script>

<style scoped>
h1 {
  font-size: 16px;
  font-weight: 700;
  color: #222831;
  margin-bottom: 25px;
}
.container-entity-count {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  gap: 20px;
}
</style>
