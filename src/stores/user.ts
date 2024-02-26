import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Company } from '@/ts/interfaces/company'

export const useUserStore = defineStore('user', () => {
  const userData = ref<Company | null>(null)

  const setUser = async (user: Company) => {
    userData.value = user
  }

  return { userData, setUser }
})
