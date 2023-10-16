import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Company } from '@/ts/interfaces/company'
import { convertImageToBase64 } from '@/utils/imageConverter'

export const useUserStore = defineStore('user', () => {
  const userData = ref<Company | null>(null)

  const setUser = async (user: Company) => {
    const { user_photo } = user

    if (typeof user_photo !== 'string' && user_photo?.data) {
      const base64 = convertImageToBase64(new Uint8Array(user_photo.data))
      user.user_photo = `data:image/jpeg;base64,${base64}`
    }

    userData.value = user
  }

  return { userData, setUser }
})
