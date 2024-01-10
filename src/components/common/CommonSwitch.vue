<template>
  <div class="common-switch__container">
    <span class="common-switch__label" v-if="isChecked">Ativo</span>
    <span class="common-switch__label" v-else>Inativo</span>
    <label class="common-switch">
      <input
        :type="type"
        v-model="isChecked"
        @change="handleChange"
        class="common-switch__input"
      />
      <span class="common-switch__slider"></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['change'])
const { type, entryType } = defineProps<{
  type: string
  placeholder: string
  entryType: string
}>()
const isChecked = ref(false)

function handleChange() {
  emit('change', entryType, isChecked.value.toString())
}
handleChange()
</script>

<style scoped>
.common-switch__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 10px;
  border-radius: 10px;
  max-width: 180px;
}

.common-switch__label {
  color: #393e46;
  font-weight: 14px;
  font-weight: 400;
}

.common-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.common-switch__input {
  opacity: 0;
  width: 0;
  height: 0;
}

.common-switch__slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  transition: 0.4s;
  border-radius: 100px;
  border: 1px solid #2bb673;
}

.common-switch__slider:before {
  position: absolute;
  content: '';
  height: 19px;
  width: 19px;
  left: 4px;
  bottom: 3px;
  background-color: #2bb673;
  transition: 0.4s;
  box-shadow: 0px 10px 15px 0px #2bb67333;
  border-radius: 100px;
}

.common-switch__input:checked + .common-switch__slider {
  background-color: #2bb673;
  box-shadow: none;
}

.common-switch__input:checked + .common-switch__slider:before {
  transform: translateX(22px);
  background-color: #fff;
}
</style>
