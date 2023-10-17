<template>
  <div class="content" :style="{ background: background }">
    <div class="icon">
      <img :src="iconPath" alt="" />
    </div>
    <div class="text">
      <span class="text__entity-name" v-if="data.length">
        {{ data.length }} {{ entityName }}
      </span>
      <span class="text__entity-name" v-else>
        Nenhum {{ entityName }} cadastrados.
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Bus from '@/assets/images/icons/bus-white.svg'
import Driver from '@/assets/images/icons/bus-white.svg'
import Points from '@/assets/images/icons/point-white.svg'

const { entityName, background, data } = defineProps<{
  entityName: string
  background: string
  data: any[]
}>()

type IconMap = {
  Ônibus: string
  Motoristas: string
  Pontos: string
}

const iconMap = ref({
  Ônibus: Bus,
  Motoristas: Driver,
  Pontos: Points
})

const iconPath = computed(() => {
  return iconMap.value[entityName as keyof IconMap] || ''
})
</script>

<style scoped>
.content {
  width: 100%;
  height: 80px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.3);
}
.text__entity-name {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
</style>
