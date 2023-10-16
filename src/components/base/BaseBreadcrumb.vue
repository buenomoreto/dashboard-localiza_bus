<template>
  <div class="breadcrumb">
    <router-link to="/" class="breadcrumb__link">Dashboard</router-link>
    <span class="breadcrumb__separator"></span>
    <span class="breadcrumb__item">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const { name } = defineProps({ name: { type: String } })
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.breadcrumb__link {
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  color: #393e46;
}

.breadcrumb__separator {
  width: 10px;
  height: 10px;
  background-color: #2bb673;
  box-shadow: 0px 10px 15px 0px #2bb67333;
  border-radius: 50%;
  margin: 0 10px;
}

.breadcrumb__item {
  font-size: 16px;
  font-weight: 700;
  color: #222831;
  text-transform: capitalize;
}
</style>
