<template>
  <LayoutDashboard>
    <template #content>
      <h1>Listing</h1>
      <ListingTable />
    </template>
  </LayoutDashboard>
</template>
<script setup lang="ts">
import LayoutDashboard from '@/components/layout/LayoutDashboard.vue'
import ListingTable from '@/components/ListingTable.vue'
</script>
