<template>
  <LayoutDashboard>
    <template #content>
      <h1>Dashboard</h1>
      <div class="container-entity-count">
        <EntityCount
          v-if="!loading"
          entityName="Ônibus"
          background="#2BB673"
          :data="busData"
        />
        <SkeletonEntityCount v-if="loading && !busData.length" />
        <EntityCount
          v-if="!loading"
          entityName="Motoristas"
          background="#4D4CAC"
          :data="driverData"
        />
        <SkeletonEntityCount v-if="loading && !driverData.length" />
        <EntityCount
          v-if="!loading"
          entityName="Pontos"
          background="#9698D6"
          :data="pointData"
        />
        <SkeletonEntityCount v-if="loading && !pointData.length" />
      </div>
      <BaseMap :point="pointData" :driver="driverData" />
    </template>
    <template #content-right>
      <VCalendar
        :first-day-of-week="1"
        title-position="left"
        :attributes="attrs"
        @dayclick="handleDate"
        :masks="{ weekdays: 'WWW' }"
      >
        <template #header-prev-button>
          <img
            src="@/assets/images/icons/arrow-prev.svg"
            width="40"
            height="40"
            alt=""
          />
        </template>
        <template #header-next-button>
          <img
            src="@/assets/images/icons/arrow-next.svg"
            width="40"
            height="40"
            alt=""
          />
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
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { Bus } from '@/ts/interfaces/bus'
import moment from 'moment'
import LayoutDashboard from '@/components/layout/LayoutDashboard.vue'
import EntityCount from '@/components/EntityCount.vue'
import SkeletonEntityCount from '@/components/skeletons/SkeletonEntityCount.vue'
import BaseMap from '@/components/base/BaseMap.vue'
import ModificationHistory from '@/components/ModificationHistory.vue'
import useBusService from '@/composables/useBusService'
import useDriverService from '@/composables/useDriverService'
import usePointService from '@/composables/usePointService'
import useHistoryService from '@/composables/useHistoryService'

const { getAllBus } = useBusService()
const { getAllDriver } = useDriverService()
const { getAllPoint } = usePointService()
const { getAllHistory } = useHistoryService()

const currentDate = moment().startOf('day').toDate()

const attrs = ref([{ dates: currentDate }])
const loading = ref(true)
const busData = ref<Bus[]>([])
const driverData = ref([])
const pointData = ref([])
const historyData = ref([])
const selectedDate = ref(formatDate(currentDate))

function formatDate(date: Date) {
  return moment(date).format('D [de] MMMM [de] YYYY')
}

const handleDate = async (date: any) => {
  try {
    selectedDate.value = formatDate(date.id)
    historyData.value = await getAllHistory(undefined, date.id, 8, 0)
  } catch (_) {
  } finally { 
    loading.value = false
  }
}

const fetchData = async () => {
  try {
    const [bus, driver, point, history] = await Promise.all([
      getAllBus(undefined),
      getAllDriver(undefined),
      getAllPoint(undefined),
      getAllHistory(undefined, currentDate.toISOString().split('T')[0], 30, 0)
    ])

    busData.value = bus
    driverData.value = driver
    pointData.value = point
    historyData.value = history
  } catch (error) {
    console.error('Erro ao buscar os dados:', error)
  } finally {
    loading.value = false
  }
}

function alertIncompleteRegisters() {
  let incompleteMessages: any = []

  busData.value.forEach((bus: any) => {
    let message = `Ônibus ${bus.name} possui campos incompleto: `

    let incompleteFields = []
    if (bus.line == null) incompleteFields.push('Linha')
    if (bus.point.length === 0) incompleteFields.push('Ponto')
    if (bus.driver == null) incompleteFields.push('Motorista')

    if (incompleteFields.length) {
      incompleteMessages.push(message + incompleteFields.join(', '))
    }
  })

  incompleteMessages.forEach((msg: string) => {
    toast.warning(msg, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  })
}

fetchData().then(alertIncompleteRegisters)
</script>

<style scoped>
h1 {
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
