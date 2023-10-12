<template>
  <main>
    <BaseHeader />
    <div class="dashboard">
      <SidebarMenu />
      <section class="content">
        <slot name="content" />
      </section>
      <section class="content-right">
        <slot name="content-right" />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu.vue'
import BaseHeader from '../base/BaseHeader.vue'
</script>
<style scoped>
.dashboard {
  background-color: #f9fafb;
  display: flex;
  gap: 20px;
  box-shadow: 0px 4px 20px 0px rgba(238, 238, 238, 0.2);
  height: calc(100vh - 80px);
}
.content {
  width: 58%;
  padding: 30px 0;
}
.content-right {
  width: 25%;
  padding: 15px 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
