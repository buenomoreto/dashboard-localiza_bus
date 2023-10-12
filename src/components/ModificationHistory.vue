<template>
  <div class="content">
    <div class="activities">Atividades do dia {{ date }}</div>
      <div class="history-items" :class="{expand: !!history.length}">
        <template v-if="loading && !history.length">
          <SkeletonModificationHistory 
            v-for="i in 8" 
            :key="i"
          />
        </template>
        <template v-else>
          <div class="history-item" v-for="h in history" :key="h.key" >
            <div class="user-photo">
              <img v-if="user.user_photo" :src="user.user_photo" :alt="user.owner" width="40" height="40" />
              <img v-else src="@/assets/images/default-profile.png" :alt="user.owner" width="40" height="40" />
            </div>
            <div class="history-item__message" v-html="h.message"></div>
          </div>
        </template>
      <template v-if="!history.length">
        Nenhuma atividade registrada para hoje
      </template> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import SkeletonModificationHistory from './skeletons/SkeletonModificationHistory.vue';

const { date, history, loading } = defineProps<{ 
  date: string;
  history: any[], 
  loading: boolean
}>()

const { getUser } = useUserStore()
const user = ref()

async function initUser() {
  user.value = await getUser()
}

initUser()
</script>
<style scoped>
.content {
  width: 100%;
  margin-top: 30px;
}
.activities {
  font-size: 16px;
  font-weight: 700;
  color: #222831;
  margin-bottom: 30px;
}
.history-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.history-item:not(:last-child) {
  margin-bottom: 20px;
}
@media (min-width: 1366px) {
  .history-items.expand {
    height: 415px;
    overflow: auto;
  }
}
</style>
