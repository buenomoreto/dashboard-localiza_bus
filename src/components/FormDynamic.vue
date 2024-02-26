<template>
  <form>
    <div 
      class="content-form" 
      :class="[entity.name]" 
      v-for="(entity, index) in entities" 
      :key="entity.name"
      >
      <template v-if="entity.active">
        <div
          class="content"
          v-for="field in entity.data"
          :key="field.placeholder"
          :class="[field.entryType]"
        >
          <label :for="field.placeholder">
            {{ field.label }}
          </label>
          <template v-if="field.type !== 'checkbox'">
            <CommonInput
              @change="handlePayload"
              v-if="!field.regex && !['ticket_price', 'color', 'hours', 'map'].includes(field.entryType)"
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
import { ref, watch, reactive } from 'vue'
import { Bus } from '@/ts/interfaces/bus'
import { Driver } from '@/ts/interfaces/driver'
import { Line } from '@/ts/interfaces/line'
import { Point } from '@/ts/interfaces/point'
import { Company } from '@/ts/interfaces/company'
import CommonInput from './common/CommonInput.vue'
import CommonInputPrice from './common/CommonInputPrice.vue'
import CommonInputRegex from './common/CommonInputRegex.vue'
import CommonSwitch from './common/CommonSwitch.vue'
import CommonInputColor from './common/CommonInputColor.vue'
import CommonInputHours from './common/CommonInputHours.vue'
import CommonMap from './common/CommonMap.vue'

type AllEntities = Bus & Driver & Line & Point & Company

const props = defineProps<{entities: any[]}>()
const emit  = defineEmits(['data'])
const payload = ref()

const entityPayload: any = reactive({
  bus: {
    name: '',
    model: '',
    license_plate: '',
    ticket_price: 0,
    brand: '',
    operational_status: false
  },
  driver: {
    user_photo: '',
    name: '',
    email: '',
    cpf: '',
    phone_number: '',
    type: 'driver'
  },
  point: {
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
    name: '',
    color: ''
  },
  company: {
    name: '',
    email: '',
    cnpj: '',
    phone_number: '',
    owner: '',
    password: '',
    user_photo: '',
  }
})

function updatePayload() {
  const activeEntity = props.entities.find((entity) => entity.active)
  if (activeEntity && entityPayload[activeEntity.name]) {
    payload.value = entityPayload[activeEntity.name] 
  }
  emit('data', payload.value)
}

updatePayload();

watch(props.entities, updatePayload, { deep: true })

function handlePayload(field: keyof AllEntities, value: string) {
  payload.value[field] = value
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
.point .name, .reference {
  width: 100%;
}
.user_photo {
  align-self: center;
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
