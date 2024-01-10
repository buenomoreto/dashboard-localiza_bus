<template>
  <input
    :type="type"
    :placeholder="placeholder"
    @input="handleInputChange"
    :value="getValue"
    class="common__input"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(['change'])
const { type, placeholder, entryType, value } = defineProps<{
  type: string
  placeholder: string
  entryType: string
  value?: string
}>()
const getValue = value

function handleInputChange(event: Event) {
  const inputElement = event.target as HTMLInputElement
  emit('change', entryType, inputElement.value)
}
</script>

<style scoped>
.common__input {
  max-width: 585px;
  width: 100%;
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
