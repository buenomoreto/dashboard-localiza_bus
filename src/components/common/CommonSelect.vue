<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const options = [
  { text: 'Ordenar por:', value: 'default' },
  { text: 'Recentes', value: 'recent' }
]

const selectedText = ref(options[0].text)
const isDropdownVisible = ref(false)
const dropdownElement = ref<HTMLElement | null>(null)

function handleDocumentClick(event: Event) {
  if (
    dropdownElement.value &&
    !dropdownElement.value.contains(event.target as Node)
  ) {
    isDropdownVisible.value = false
    document.removeEventListener('click', handleDocumentClick)
  }
}

function toggleDropdown() {
  isDropdownVisible.value = !isDropdownVisible.value

  if (isDropdownVisible.value) {
    document.addEventListener('click', handleDocumentClick)
  } else {
    document.removeEventListener('click', handleDocumentClick)
  }
}

function selectOption(option: { text: string; value: string }) {
  selectedText.value = option.text
  isDropdownVisible.value = false
  document.removeEventListener('click', handleDocumentClick)

  if (option.value === 'recent') {
    router.push({
      query: { ...router.currentRoute.value.query, recent: 'true' }
    })
  } else {
    router.push({ query: router.currentRoute.value.query })
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div class="custom-dropdown" @click="toggleDropdown" ref="dropdownElement">
    <div class="selected-option">
      {{ selectedText }}
      <div>
        <img src="@/assets/images/icons/arrow-select.svg" alt="" />
      </div>
    </div>
    <ul v-if="isDropdownVisible">
      <li
        v-for="option in options"
        :key="option.value"
        @click.stop="selectOption(option)"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>
<style scoped>
.custom-dropdown {
  width: 200px;
  position: relative;
  cursor: pointer;
}

.selected-option {
  height: 40px;
  border-radius: 100px;
  background: #ffffff;
  font-size: 14px;
  font-weight: 400;
  color: #393e46;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  margin-top: 5px;
}

li {
  background-color: #ffffff;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 400;
  color: #393e46;
  cursor: pointer;
  transition: background-color 0.2s;
}

li:hover {
  background-color: #f7f7f7;
}
</style>
