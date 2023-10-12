<template>
  <header class="header">
    <div class="logo">logo</div>
    <div class="search">
      <CommonSearch /> 
      <CommonButtonDash class="button">
        <template #label>
          Cadastrar novo ônibus
        </template>
      </CommonButtonDash>
    </div>
    <div class="user"></div>
  </header>
</template>

<script setup lang="ts">
import CommonButtonDash from '../common/CommonButtonDash.vue';
import CommonSearch from '../common/CommonSearch.vue';
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
