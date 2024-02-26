<template>
  <div
    v-for="(inputValue, index) in inputValues"
    :key="index"
    class="input-container"
  >
    <input
      :type="type"
      :placeholder="placeholder"
      @input="handleInputChange($event, index)"
      v-mask="regexHours.hours"
      :value="inputValue"
      class="common__input"
    />
    <button
      v-if="index !== 0"
      type="button"
      @click="removeInput(index)"
      class="remove-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 3.75V5H5.5V6.25H15.5V5H13V3.75H8ZM6.125 6.875H7.375V14.7411L7.63388 15H13.3661L13.625 14.7411V6.875H14.875V15.2589L13.8839 16.25H7.11612L6.125 15.2589V6.875Z"
          fill="white"
        />
      </svg>
    </button>
    <button
      v-if="index == 0"
      type="button"
      @click="addInput"
      class="add-button"
    >
      <img src="@/assets/images/icons/add.svg" alt="" />
    </button>
  </div>
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

const inputValues = ref<string[]>([value])

const regexHours: Record<string, string> = {
  hours: '##:##'
}

function handleInputChange(event: Event, index: number) {
  const inputElement = event.target as HTMLInputElement
  inputValues.value[index] = inputElement.value
  emit('change', entryType, JSON.stringify(inputValues.value))
}

function addInput() {
  inputValues.value.push('')
}

function removeInput(index: number) {
  inputValues.value.splice(index, 1)
  emit('change', entryType, JSON.stringify(inputValues.value))
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
.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.add-button {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #2bb673;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
}
.remove-button {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #ea5455;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
