<template>
  <nav class="menu">
    <router-link class="user" v-if="user" to="/dashboard/profile">
      <div class="user-photo">
        <img
          v-if="user.user_photo"
          :src="user.user_photo"
          :alt="user.owner"
          width="82"
          height="82"
        />
        <img
          v-else
          src="@/assets/images/default-profile.png"
          :alt="user.owner"
          width="82"
          height="82"
        />
      </div>
      <div class="user-name">
        {{ user.name }}
        <div class="user-verified">
          <img
            src="@/assets/images/icons/menu/verified.svg"
            alt="Usuário verificado"
          />
          Perfil verificado
        </div>
      </div>
    </router-link>
    <SkeletonProfile v-else />
    <ul class="navigation">
      <div>
        <li v-for="(item, index) in menu" :key="index" class="navigation__item">
          <router-link class="navigation__link" :to="item.path">
            <img
              v-if="item.icon"
              :src="item.icon"
              :alt="item.label"
              width="20"
              height="20"
            />
            <span>
              {{ item.label }}
            </span>
          </router-link>
        </li>
      </div>
      <div>
        <li @click="handleSignOut" class="navigation__item navigation__link">
          <img
            src="@/assets/images/icons/menu/logout.svg"
            alt="Sair"
            width="20"
            height="20"
          />
          Sair
        </li>
      </div>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { menu } from '@/mock/menu'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import useUserService from '@/composables/useUserService'
import SkeletonProfile from './skeletons/SkeletonProfile.vue'

const user = ref()
const useStore = useUserStore()
const authStore = useAuthStore()
const { signOut } = useUserService()

watch(useStore, (newValue) => {
  user.value = newValue.userData
})

async function handleSignOut() {
  await signOut(authStore.refreshToken).then(() => {
    authStore.clearTokens()
  })
}
</script>

<style scoped>
.menu {
  width: 17%;
  background-color: #ffffff;
  padding: 25px 0 20px 0;
  box-shadow: 0px 4px 20px 0px #eeeeee33;
}
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}
.user-photo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border: 3px solid #2bb673;
  border-radius: 100%;
  box-shadow: 0px 10px 15px 0px rgba(43, 182, 115, 0.1);
}
.user-photo img {
  border-radius: 100%;
}
.user-name {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  color: #222831;
  font-size: 16px;
  font-weight: 700;
}
.navigation {
  border-radius: 30px;
  width: 80%;
  margin: 0 auto;
  max-height: 65%;
  background-color: #f9fafb;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-height: 460px;
}
.navigation__item,
.navigation__link {
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 30px;
  cursor: pointer;
  color: #393e46;
}
.navigation__link::before {
  content: '';
  width: 3px;
  height: 20px;
  border-radius: 100px;
  background: #2bb673;
  opacity: 0;
}
.user-verified {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  text-align: center;
  font-size: 14px;
  color: #393e46;
  font-weight: 600;
}
@media (min-width: 1023px) {
  .router-link-active,
  .navigation__link:hover {
    font-weight: 700;
    color: #2bb673;
  }
  .router-link-active::before,
  .navigation__link:hover::before {
    opacity: 1;
  }
}
</style>
