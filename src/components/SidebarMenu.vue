<template>
  <transition name="box-expand" mode="out-in">
    <nav class="menu" :class="{ 'sidebar--close': toggle }">
      <button class="sidebar__toggle-button--floating" @click="toggleSideBar">
        <img src="@/assets/images/icons/sidebar-menu/arrow-left.svg" alt="" />
      </button>
      <div class="menu__navigation">
        <div class="user" v-if="user">
          <img class="user__photo" v-if="user.user_photo" :src="user.user_photo" :alt="user.name" />
          <img class="user__photo" v-else src="@/assets/images/default-profile.png" :alt="user.name" />
          <div class="user__info" v-if="!toggle">
            <p class="user__name">{{ user.owner }}</p>
            <p class="user__company">{{ user.name }}</p>
          </div>
        </div>
        <ProfileSkeleton v-else />

        <div class="separator" />

        <ul class="navigation">
          <li
            v-for="(item, index) in menu"
            :key="index"
            :class="[
              'navigation__item',
              { 'has-submenu': item.subItems },
              { active: item.path === route.path || (item.label !== 'Dashboard' && route.path.includes(item.path)) }
            ]"
          >
            <router-link class="navigation__link" :to="item.path">
              <div>
                <img :src="item.icon" alt="" />
                <span>
                  {{ item.label }}
                </span>
              </div>
              <button v-if="item.subItems">
                <img src="@/assets/images/icons/sidebar-menu/arrow.svg" alt="" />
              </button>
            </router-link>
            <ul v-if="item.subItems" class="submenu">
              <li
                v-for="(subItem, subIndex) in item.subItems"
                :key="subIndex"
                :class="{ active: subItem.path === route.path }"
                class="submenu__item"
              >
                <router-link class="submenu__link" :to="subItem.path">
                  <span>
                    {{ subItem.label }}
                  </span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <div class="separator" />
      </div>

      <button type="button" class="logout" @click="handleSignOut">
        <img src="@/assets/images/icons/sidebar-menu/log-out.svg" alt="" />
        <span v-if="!toggle">Logout</span>
      </button>
    </nav>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { menu } from '@/mock/menu'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import ProfileSkeleton from '@/components/skeletons/menu/ProfileSkeleton.vue'
import useUserService from '@/composables/useUserService'

const route = useRoute()
const authStore = useAuthStore()
const userStore = useUserStore()
const { signOut } = useUserService()
const toggle = ref(false)
const user = ref()

function toggleSideBar() {
  toggle.value = !toggle.value
}
async function handleSignOut() {
  await signOut(authStore.refreshToken).then(() => {
    authStore.clearTokens()
  })
}
async function updateValue() {
  user.value = await userStore.fetchUser()
}
updateValue()
</script>

<style scoped>
.menu {
  background-color: var(--bg-color);
  height: 100vh;
  width: 255px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  transition: width 0.5s ease;
}
.sidebar--close {
  width: 92px;
}
.sidebar__toggle-button--floating {
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #023f5c;
  color: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25);
  position: absolute;
  right: -14px;
  top: 34px;
  cursor: pointer;
}
.separator {
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  margin: 24px 0;
}
.user {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user__photo {
  max-width: 55px;
  object-fit: cover;
  width: 100%;
  min-height: 55px;
  max-height: 55px;
  border-radius: 30px;
}
.user__name {
  font-size: 12px;
  color: #fff;
  font-weight: 500;
  opacity: 0.5;
  margin-bottom: 4px;
}
.user__company {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  opacity: 0.8;
  margin-bottom: 4px;
}
.navigation {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.navigation__item .navigation__link,
.submenu__link {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  opacity: 0.5;
  min-height: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition:
    background-color 0.3s ease,
    border-radius 0.3s ease,
    opacity 0.3s ease;
}
.navigation__link div {
  display: flex;
  align-items: center;
  gap: 10px;
}
.navigation__link div img {
  min-width: 20px;
  min-height: 20px;
  max-height: 20px;
  max-width: 20px;
}
.navigation__item ul {
  padding-left: 35px;
  position: relative;
}
.navigation__item {
  position: relative;
}
.navigation__item.has-submenu .submenu {
  display: none;
}
.navigation__item.has-submenu::before {
  display: none;
  content: '';
  height: calc(100px - 40px);
  width: 2px;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  bottom: 30px;
  left: 23px;
}
.submenu__item {
  position: relative;
  margin: 5px 0;
}
.submenu__item::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 8px;
  top: 10px;
  left: -12px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  border-left: 2px solid rgba(255, 255, 255, 0.8);
  border-bottom-left-radius: 8px;
}
.logout span {
  font-size: 14px;
  font-weight: 500;
  color: #cc8889;
}
.logout {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
.sidebar--close .logout {
  justify-content: center;
}
@media (min-width: 1024px) {
  .navigation__item:hover .navigation__link:hover,
  .submenu__link:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    opacity: 1;
  }
  .sidebar--close span,
  .sidebar--close button:not(.sidebar__toggle-button--floating, .logout) {
    display: none;
  }
  .sidebar--close .navigation__item:hover span {
    display: block;
    position: absolute;
    left: 50px;
    padding: 5px;
    background-color: var(--bg-color);
    border-radius: 4px;
    z-index: 20;
    box-shadow: 2px 0px 10px -5px rgba(0, 0, 0, 1);
  }
}
.active .navigation__link {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  opacity: 1;
}
.active.submenu__item .submenu__link {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  opacity: 1;
}
.active.has-submenu .submenu {
  display: block;
  margin-top: 10px;
}
.active.navigation__item.has-submenu::before {
  display: block;
}
.sidebar--close .active.has-submenu .submenu {
  display: none;
}
.sidebar--close .active.navigation__item.has-submenu::before {
  display: none;
}
.sidebar--close .sidebar__toggle-button--floating img {
  transform: rotate(180deg);
}
</style>
