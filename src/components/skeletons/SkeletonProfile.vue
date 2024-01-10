<template>
  <div class="user">
    <div class="user__photo loading" />
    <div class="user__info loading">
      <p class="user__name loading" />
      <p class="user__verified loading" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.user {
  display: flex;
  align-items: center;
  gap: 15px;
}
.user__photo {
  height: 100px;
  width: 100px;
  border-radius: 100%;
}
.user__name {
  text-align: center;
  width: 100px;
  height: 16px;
  margin-bottom: 5px;
}
.user__verified {
  text-align: center;
  width: 130px;
  height: 16px;
}
</style>
