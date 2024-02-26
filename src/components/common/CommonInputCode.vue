<template>
  <div class="common__input__code">
    <div
      v-for="(digit, index) in pincode"
      :key="index"
      class="common__input__code__box"
    >
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="pincode[index]"
        @input="handleInput(index)"
        @keydown.delete="handleDelete(index)"
        ref="pincodeInputRefs"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const { type, placeholder } = defineProps<{
  type: string
  placeholder: string
}>()

const pincode = reactive(['', '', '', '', '', ''])
const pincodeInputRefs = ref<HTMLInputElement[]>([])
const emit = defineEmits(['change-code'])

const handleDelete = (index: number) => {
  if (index > 0) {
    pincode[index] = ''
    const prevInput = pincodeInputRefs.value[index - 1]
    if (prevInput) {
      prevInput.focus()
    }
  }
}

const handleInput = (index: number) => {
  let input = pincode[index]
  const inputLength = input.length

  input = input.replace(/\D/g, '')

  if (input.length === 1) {
    pincode[index] = input
    if (index < pincode.length - 1) {
      pincodeInputRefs.value[index + 1].focus()
    }
  } else if (input.length > 1 || inputLength > 1) {
    pincode[index] = ''
  } else {
    pincode[index] = ''
  }

  const isFilled = pincode.every((digit) => digit.length === 1)
  if (isFilled) {
    emit('change-code', pincode.join(''))
  }
}
</script>
<style scoped>
.common__input__code {
  display: flex;
  gap: 10px;
  max-width: 220px;
  margin-bottom: 20px;
}

.common__input__code__box {
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 5px;
  min-width: 40px;
  min-height: 40px;
  color: #2bb673;
  text-indent: 10px;
  background: #fff;
}
.common__input__code__box:hover {
  border: 1px solid #2bb673;
}
.common__input__code input::placeholder {
  color: var(--font-color);
  font-size: 14px;
  width: 100%;
  opacity: 1;
}
</style>
