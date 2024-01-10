<template>
  <div class="color-picker-container">
    <input
      ref="colorInput"
      :type="type"
      :placeholder="placeholder"
      class="common__input"
      :class="{ placeholderHidden: selectedColor != 'FFFFFF' }"
      readonly
    />
    <div
      ref="colorPreview"
      v-if="selectedColor != 'FFFFFF'"
      class="color-preview"
      :style="{
        backgroundColor: `#${selectedColor}`,
        borderColor: `#${selectedColor}`
      }"
    />
    <div class="color-picker-button" @click="openColorPicker" />
    <ColorPicker
      v-if="isColorPickerOpen"
      v-model="selectedColor"
      @change="handleColor(selectedColor)"
      inline
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import ColorPicker from 'primevue/colorpicker'

const emit = defineEmits(['change'])
const { type, placeholder, entryType } = defineProps<{
  type: string
  placeholder: string
  entryType: string
}>()

const isColorPickerOpen = ref(false)
const selectedColor = ref('FFFFFF')

function openColorPicker() {
  isColorPickerOpen.value = !isColorPickerOpen.value
}

function handleColor(color: string) {
  emit('change', entryType, `#${color}`)
}
</script>

<style scoped>
.color-picker-container {
  position: relative;
  width: 585px;
  height: 40px;
}

.common__input {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #ffffff;
  color: #222831;
  border: none;
  outline: none;
  transition: border 0.3s;
  border: 1px solid transparent;
  text-indent: 20px;
}

.color-picker-button {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 1px solid #d0d0d0;
  border-radius: 50%;
  cursor: pointer;
}

.color-preview {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #d0d0d0;
}

.common__input::placeholder {
  color: #393e46;
  font-size: 14px;
  line-height: 40px;
}
.placeholderHidden::placeholder {
  color: transparent;
}
.common__input:hover,
.common__input:focus {
  border: 1px solid #2bb673;
}
</style>
