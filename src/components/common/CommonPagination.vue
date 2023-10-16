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
import { computed, ref, watchEffect, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 15
  }
})

const route = useRoute()
const router = useRouter()

const currentPage = ref(parseInt(route.query.page as string) || 1)
const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
)

watchEffect(() => {
  const page = parseInt(route.query.page as string)
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
})

const displayedPages = computed(() => {
  const pages: number[] = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

function goToPage(page: number) {
  router.push({
    query: { ...router.currentRoute.value.query, page: page.toString() }
  })
}

function getPageClass(page: number) {
  return {
    pagination__button: true,
    'pagination__button--active': currentPage.value == page
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
