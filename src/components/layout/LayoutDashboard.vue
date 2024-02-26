<template>
  <main>
    <BaseHeader />
    <div class="dashboard">
      <SidebarMenu />
      <section class="content" :class="{ expand: route.path !== '/' }">
        <slot name="content" />
      </section>
      <section v-if="route.path == '/'" class="content-right">
        <slot name="content-right" />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import useCompanyService from '@/composables/useCompanyService'
import SidebarMenu from '@/components/SidebarMenu.vue'
import BaseHeader from '../base/BaseHeader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const useStore = useUserStore()
const { getCompany } = useCompanyService()
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

const fetchUser = async () => {
  if (!user) {
    localStorage.removeItem('userLogged');
    router.push({ name: 'Login' });
  } else {
    await getCompany(user.id)
      .then(({ data }: any) => {
        useStore.setUser(data)
      }).catch((_) => {
        router.push({ name: 'Login' })
      })
  }
}
fetchUser()
</script>

<style scoped>
.dashboard {
  background-color: #f9fafb;
  display: flex;
  gap: 20px;
  box-shadow: 0px 4px 20px 0px rgba(238, 238, 238, 0.2);
  min-height: calc(100vh - 80px);
}

.content {
  width: 58%;
  padding: 30px 0;
}

.content.expand {
  width: calc(100% - 15%);
}

.content-right {
  width: 25%;
  padding: 15px 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}</style>
