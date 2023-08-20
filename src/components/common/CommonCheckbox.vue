<template>
  <label for="checkbox" class="common__checkbox">
    <input
      id="checkbox"
      class="common__checkbox-input"
      type="checkbox"
      :checked="checked"
      @change="handleCheckbox($event)"
    />
    <span class="common__checkbox--checkmark"></span>
    <span class="common__checkbox-label">
      <slot name="label"></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
const { checked } = defineProps<{ checked: boolean }>();
const emit = defineEmits(['handle']);

function handleCheckbox(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('handle', target.checked);
}
</script>


<style scoped>
.common__checkbox {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  gap: 15px;
  color: var(--font-color);
}

.common__checkbox-input {
  opacity: 0;
  position: relative;
  top: 0;
  left: 0;
  display: none;
}

.common__checkbox--checkmark {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border: 2px solid var(--border-color);
  background-color: transparent;
  border-radius: 3px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
}

.common__checkbox-input:checked + .common__checkbox--checkmark {
  background-color: var(--border-color);
}

.common__checkbox--checkmark:after {
  content: '';
  display: block;
  width: 3px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.common__checkbox-input:checked + .common__checkbox--checkmark:after {
  opacity: 1;
}

@media (min-width: 1023px) {
  .common__checkbox-input + .common__checkbox--checkmark:hover:after {
    opacity: 1;
  }
  .common__checkbox-input + .common__checkbox--checkmark:hover {
    background-color: var(--border-color);
  }
}
</style>