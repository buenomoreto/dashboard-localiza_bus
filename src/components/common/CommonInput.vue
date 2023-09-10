<template>
  <div class="common__input">
    <div class="common__input-icon">
      <slot name="icon" />
    </div>
    <input
      v-if="maskEntryTypes.includes(entryType)"
      class="common__input-field"
      @input="handleInputChange"
      :type="type"
      :placeholder="placeholder"
      v-model.lazy="value"
      v-mask="regexPattern"
      v-money="entryType === 'ticket_price' ? mask : false"
    />
    <input
      v-if="!maskEntryTypes.includes(entryType)"
      class="common__input-field"
      @input="handleInputChange"
      :type="type"
      :placeholder="placeholder"
      v-model.lazy="value"
    />
    <slot name="iconCustom" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { type, placeholder, entryType } = defineProps<{
  type: string
  placeholder: string
  entryType: string
}>()

const emit = defineEmits(['change'])
const value = ref('')

const mask = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
}
const regexPatterns: Record<string, string> = {
  cnpj: '##.###.###/####-##',
  ticket_price: 'XXX-XXXX/XX',
  phone_number: '(##) #####-####'
}
const regexPattern = ref(regexPatterns[entryType])
const maskEntryTypes = ['cnpj', 'ticket_price', 'phone_number']

function handleInputChange(event: Event) {
  const inputElement = event.target as HTMLInputElement
  emit('change', entryType, inputElement.value)
}
</script>

<style scoped>
.common__input {
  border: 2px solid;
  border-color: var(--border-color);
  padding: 0 20px;
  max-width: 500px;
  min-height: 50px;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.common__input-field {
  background: transparent;
  color: var(--font-color);
  font-size: 14px;
  width: 100%;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.common__input-field::placeholder {
  color: var(--font-color);
  font-size: 14px;
  width: 100%;
  opacity: 0.5;
}

.common__input-field:focus::placeholder {
  opacity: 1;
}

@media (min-width: 1024px) {
  .common__input-field:hover::placeholder {
    opacity: 1;
  }
}
</style>
<style>
.common__input-icon img {
  max-width: 20px;
  max-height: 35px;
}
</style>
