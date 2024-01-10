<template>
  <input
    :type="type"
    :placeholder="placeholder"
    v-money="moneyMask"
    @input="handleInputChange"
    class="common__input"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(['change'])
const { type, placeholder, entryType } = defineProps<{
  type: string
  placeholder: string
  entryType: string
}>()

const moneyMask = {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 0,
  masked: true
}

function handleInputChange(event: Event) {
  const inputElement = event.target as HTMLInputElement
  emit('change', entryType, inputElement.value.replace('R$ ', ''))
}
</script>

<style scoped>
.common__input {
  width: 585px;
  height: 40px;
  border-radius: 10px;
  background: #ffffff;
  color: #222831;
  border: none;
  outline: none;
  transition: border 0.3s;
  border: 1px solid transparent;
  text-indent: 20px;
}
.common__input::placeholder {
  color: #393e46;
  font-size: 14px;
}
.common__input:hover,
.common__input:focus {
  border: 1px solid #2bb673;
}
</style>
