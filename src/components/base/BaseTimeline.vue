<template>
  <div class="timeline">
    <div
      v-for="entity in entities"
      :key="entity.name"
      class="timeline__element"
    >
      <div
        :class="[
          'timeline__dot',
          entity.active ? 'timeline__dot--active' : 'timeline__dot--inactive'
        ]"
      ></div>
      <div class="timeline__separator"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { entities } = defineProps<{
  entities: {
    name: string
    active: boolean
  }[]
}>()
</script>

<style scoped>
.timeline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 615px;
  width: 100%;
  margin: 20px 0;
}

.timeline__element {
  display: flex;
  align-items: center;
  width: 100%;
}

.timeline__dot {
  width: 10px;
  height: 10px;
  box-shadow: 0px 10px 15px 0px #2bb67333;
  border-radius: 50%;
}

.timeline__dot--active {
  background: #2bb673;
}

.timeline__dot--inactive {
  border: 1px solid #2bb673;
  background: #f9f9f9;
}

.timeline__separator {
  background: #2bb673;
  box-shadow: 0px 10px 15px 0px #2bb67333;
  height: 1px;
  max-width: 205px;
  width: 100%;
  display: inline;
}
.timeline__element:last-child .timeline__separator {
  display: none;
}
</style>
