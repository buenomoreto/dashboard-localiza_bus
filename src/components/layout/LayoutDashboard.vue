<template>
  <main class="dashboard">
    <SidebarMenu />
    <section>
      <slot name="content" />
    </section>
  </main>
</template>

<script setup lang="ts">
import SidebarMenu from '@/components/SidebarMenu.vue'
</script>
<style scoped>
.dashboard {
  background-color: #fafbff;
  display: flex;
  gap: 20px;
}
</style>
