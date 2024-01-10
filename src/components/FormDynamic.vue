<template>
  <form>
    <div 
      class="content-form" 
      :class="[entity.name]" 
      v-for="(entity, index) in entities" 
      :key="index"
      >
      <template v-if="entity.active">
        <div
          class="content"
          v-for="field in entity.data"
          :key="field.placeholder"
          :class="[field.entryType]"
        >
          <label 
            :for="field.placeholder"
          >
          {{ field.label }}
          </label>
          <template v-if="field.type !== 'checkbox'">
            <CommonInput
              @change="handlePayload"
              v-if="!field.regex && 
                field.entryType !== 'ticket_price' &&
                field.entryType !== 'color' &&
                field.entryType !== 'hours' &&
                field.entryType !== 'map'
              "
              :type="field.type"
              :placeholder="field.placeholder"
              :entryType="field.entryType"
              :value="field.value"
            />
            <CommonInputColor
              @change="handlePayload"
              v-if="field.entryType == 'color'"
              :type="field.type"
              :placeholder="field.placeholder"
              :entryType="field.entryType"
              :value="field.value"
            />
            <CommonInputRegex
              @change="handlePayload"
              v-if="field.regex"
              :type="field.type"
              :placeholder="field.placeholder"
              :entryType="field.entryType"
              :value="field.value"
            />
            <CommonInputPrice
              @change="handlePayload"
              v-if="field.entryType == 'ticket_price'"
              :type="field.type"
              :placeholder="field.placeholder"
              :entryType="field.entryType"
              :value="field.value"
            />
            <CommonInputHours
              @change="handlePayload"
              v-if="field.entryType == 'hours'"
              :type="field.type"
              :placeholder="field.placeholder"
              :entryType="field.entryType"
              :value="field.value"
            />
            <CommonMap 
              @change="handlePayload"
              v-if="field.entryType == 'map'"
            />
          </template>
          <template v-else>
            <CommonSwitch
              @change="handlePayload"
              :type="field.type"
              :placeholder="field.placeholder"
              :entryType="field.entryType"
              :value="field.value"
            />
          </template>
        </div>
      </template>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Bus } from '@/ts/interfaces/bus'
import { Driver } from '@/ts/interfaces/driver'
import { Line } from '@/ts/interfaces/line'
import { Point } from '@/ts/interfaces/point'
import { Company } from '@/ts/interfaces/company'
import CommonInput from './common/CommonInput.vue'
import CommonInputPrice from './common/CommonInputPrice.vue'
import CommonInputRegex from './common/CommonInputRegex.vue'
import CommonSwitch from './common/CommonSwitch.vue'
import useBusService from '@/composables/useBusService'
import CommonInputColor from './common/CommonInputColor.vue'
import CommonInputHours from './common/CommonInputHours.vue'
import CommonMap from './common/CommonMap.vue'

type AllEntities = Bus & Driver & Line & Point & Company

const { entities } = defineProps<{
  entities: any[]
}>()

const emit = defineEmits(['data'])
const route = useRoute()
const { getAllBus } = useBusService()
const id_bus = ref()
const payload = ref<AllEntities>({} as AllEntities)

if (route.params.id && route.params.id.length) {
  id_bus.value = route.params.id
}

const entityPayload: any = {
  bus: {
    name: '',
    model: '',
    license_plate: '',
    ticket_price: 0,
    brand: '',
    operational_status: false
  },
  driver: {
    id_bus,
    name: '',
    email: '',
    cpf: '',
    phone_number: '',
    password: '',
    type: 'driver',
    user_photo: '',
    latitude: 0,
    longitude: 0
  },
  point: {
    id_bus,
    name: '',
    latitude: 0,
    longitude: 0,
    reference: '',
    neighborhood: '',
    postal_code: '',
    city: '',
    state: '',
    hours: 0
  },
  line: {
    id_bus,
    name: '',
    color: ''
  }
}

function updatePayload() {
  const activeEntity = entities.find((entity) => entity.active)
  if (activeEntity && entityPayload[activeEntity.name]) {
    payload.value = entityPayload[activeEntity.name] as AllEntities
  }
}

updatePayload()

watch(entities, updatePayload)

function handlePayload(field: keyof AllEntities, value: string) {
  payload.value[field] = value
  emit('data', payload.value)
}
</script>

<style scoped>
.content-form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  max-width: 585px;
}
.bus, 
.driver {
  flex-direction: column;
  flex-wrap: wrap;
}
.line {
  flex-wrap: nowrap;
}
.map {
  width: 100%;
}
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.content:last-child {
  margin-bottom: 0;
}

label {
  color: #000;
}
.postal_code .common__input, 
.neighborhood .common__input, 
.city .common__input { 
  width: 285px;
}
.state .common__input {
  width: 140px;
}
.postal_code, 
.neighborhood, 
.city { 
  width: 285px;
}
.state {
  width: 140px;
}

</style>
<style>
.line .common__input, .line .color-picker-container{
  width: 285px;
}
.hours .common__input {
  width: 150px;
}
</style>
