<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <img
          src="@/assets/images/new-logo.svg"
          width="200"
          height="30"
          alt=""
        />
      </router-link>
    </div>
    <div class="search">
      <CommonSearch />
      <CommonLinkDash class="button">
        <template #label> Cadastrar novo ônibus </template>
      </CommonLinkDash>
    </div>
    <div class="user"></div>
  </header>
</template>

<script setup lang="ts">
import CommonLinkDash from '../common/CommonLinkDash.vue'
import CommonSearch from '../common/CommonSearch.vue'
CommonSearch
</script>

<style scoped>
header {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}
.search {
  display: flex;
  gap: 20px;
  align-items: center;
}
.button {
  width: 200px;
}
</style>
