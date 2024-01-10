<template>
  <div class="common__button">
    <button
      type="button"
      class="common__button__inner"
      @click="handleClick"
      :disabled="loading"
    >
      <slot v-if="!loading" name="label"></slot>
      <img v-if="loading" src="@/assets/images/loading.svg" />
    </button>
  </div>
</template>
<script setup lang="ts">
const { loading } = defineProps<{ loading?: boolean }>()
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
  color: #fff;
  background: #2BB673;
  font-size: 14px;
  min-height: 50px;
  border-radius: 25px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
}
.common__button__inner:disabled {
  opacity: 0.5;
  pointer-events: none;
}
@media (min-width: 1023px) {
  .common__button__inner:hover {
    transform: scale(1.05);
    transition:
      transform 0.2s ease-in-out,
      background 0.2s ease-in-out;
  }
}
</style>
