<template>
  <div class="pagination">
    <button
      class="first pagination__button"
      @click="goToPage(1)"
      :disabled="currentPage === 1"
    >
      Primeira
    </button>

    <button
      v-for="page in displayedPages"
      :key="page.toString()"
      :class="getPageClass(page)"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <button
      class="last pagination__button"
      @click="goToPage(totalPages)"
      :disabled="currentPage === totalPages"
    >
      Última
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['pageChange']);
const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 15
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
)

const displayedPages = computed(() => {
  const pages: number[] = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

function goToPage(page: number) {
  emit('pageChange', page)
}

function getPageClass(page: number) {
  return {
    pagination__button: true,
    'pagination__button--active': props.currentPage === page
  }
}
</script>
<style scoped>
.pagination {
  display: flex;
  gap: 8px;
}
.first,
.last {
  padding: 0 19px;
}
.pagination__button {
  border-radius: 10px;
  min-width: 40px;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: #393e46;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s;
  background: #fff;
  text-align: center;
}
.pagination__button--active {
  background-color: #2bb673;
  box-shadow: 0px 10px 15px 0px #2bb67333;
  color: #ffffff;
}
.pagination__button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
