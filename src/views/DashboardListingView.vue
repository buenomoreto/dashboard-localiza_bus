<template>
  <LayoutDashboard>
    <template #content>
      <div class="content-top">
        <div>
          <h1>{{ translates[name] }}</h1>
          <BaseBreadcrumb :name="translates[name]" />
        </div>
        <div class="content-action">
          <CommonSelect v-if="hasListings" />
          <router-link :to="`${name}/creation`" class="btn-create">
            <img
              src="@/assets/images/icons/create.svg"
              width="35"
              height="35"
              alt=""
            />
          </router-link>
        </div>
      </div>
      <div class="content-listing">
        <template v-if="hasListings">
          <ListingBus
            :buses="listing"
            v-if="name == 'bus'"
          />
        </template>
        <template v-else>
          <span class="not-found"
            >Você ainda não cadastrou nenhum {{ translates[name] }}, clique no
            “+” para começar.</span
          >
        </template>
        <div class="content-pagination" v-if="hasListings">
          <CommonPagination :totalItems="100" />
        </div>
      </div>
    </template>
  </LayoutDashboard>
</template>
<script setup lang="ts">
import ListingBus from '@/components/ListingBus.vue'
import BaseBreadcrumb from '@/components/base/BaseBreadcrumb.vue'
import CommonPagination from '@/components/common/CommonPagination.vue'
import CommonSelect from '@/components/common/CommonSelect.vue'
import LayoutDashboard from '@/components/layout/LayoutDashboard.vue'
import useDynamicService from '@/composables/useDynamicService'
import { translates } from '@/mock/translates'
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const listing = ref()
const route = useRoute()
const { getAll } = useDynamicService()
const name = ref(route.path.replace('/', ''))

async function fetchData() {
  listing.value = await getAll(name.value)
}

fetchData()
const hasListings = computed(() => {
  return listing.value && listing.value.length > 0;
});
watch(
  () => route.path,
  (newPath) => {
    name.value = newPath.replace('/', '')
    fetchData()
  }
)
</script>
<style scoped>
h1 {
  font-size: 22px;
  font-weight: 700;
  color: #222831;
  text-transform: capitalize;
  margin-bottom: 10px;
}
.content-top {
  display: flex;
  justify-content: space-between;
  padding-right: 75px;
}
.btn-create {
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: #2bb673;
  box-shadow: 0px 10px 15px 0px #2bb67333;
}
.content-listing {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  width: 100%;
  padding-right: 75px;
}
.not-found {
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #a1aeb7;
  margin: auto;
}
.content-action {
  display: flex;
  align-items: center;
  gap: 15px;
}
.content-pagination {
  margin-left: auto;
}
</style>
