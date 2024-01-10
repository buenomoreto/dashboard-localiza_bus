<template>
  <input
    :type="type"
    :placeholder="placeholder"
    v-mask="regexPattern"
    :value="getValue"
    @input="handleInputChange"
    class="common__input"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['change'])
const { type, placeholder, entryType, value } = defineProps<{
  type: string
  placeholder: string
  entryType: string
  value: string
}>()
const getValue = value
const regexPatterns: Record<string, string> = {
  cpf: '###.###.###-##',
  cnpj: '##.###.###/####-##',
  phone_number: '(##) #####-####',
  license_plate: 'AAA-####',
  color: '######'
}

const regexPattern = ref(regexPatterns[entryType])

function handleInputChange(event: Event) {
  const inputElement = event.target as HTMLInputElement
  emit('change', entryType, inputElement.value)
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
