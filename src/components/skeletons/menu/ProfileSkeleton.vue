<template>
  <div class="user">
    <img class="user__photo" src="@/assets/images/default-profile.png" alt="User Photo" />
    <div class="user__info">
      <p class="user__name loading" />
      <p class="user__company loading" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.user {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user__photo {
  max-width: 44px;
  min-height: 44px;
}
.user__name {
  width: 100px;
  height: 12px;
  margin-bottom: 4px;
}
.user__company {
  width: 120px;
  height: 14px;
}
</style>
