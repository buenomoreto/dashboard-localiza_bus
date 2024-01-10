<template>
  <div class="common__button">
    <button @click="handleClick" type="button" class="common__button__inner">
      <slot name="label"></slot>
    </button>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['click-event'])
function handleClick(event: Event) {
  emit('click-event', event)
}
</script>

<style scoped>
.common__button {
  display: grid;
  place-items: center;
}
.common__button__inner {
  display: grid;
  place-items: center;
  background-color: #ffffff;
  color: #393e46;
  font-size: 14px;
  min-height: 40px;
  border-radius: 25px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  text-align: center;
}
.common__button__inner:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.active .common__button__inner {
  color: #ffffff;
  background: #2bb673;
  box-shadow: 0px 10px 15px 0px #2bb67333;
  font-weight: bold;
}
</style>
