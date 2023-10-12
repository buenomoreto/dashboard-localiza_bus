<template>
  <div class="skeleton-item">
    <div class="skeleton-photo loading" />
    <div class="skeleton-item__message loading" />
</div>
</template>
<style scoped>
.skeleton-item {
  height: 42px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.skeleton-item:not(:last-child) {
  margin-bottom: 20px;
}
.skeleton-photo {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.skeleton-item__message {
  width: 260px;
  height: 16px;
}
</style>
