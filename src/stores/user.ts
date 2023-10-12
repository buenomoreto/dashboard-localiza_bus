import { defineStore } from 'pinia'
import { Company } from '@/ts/interfaces/company'
import { convertImageToBase64 } from '@/utils/imageConverter'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import useCompanyService from '@/composables/useCompanyService'

export const useUserStore = defineStore('user', () => {
  const { getCompany } = useCompanyService()
  const router = useRouter()
  const userData = ref<Company | null>(null)

  const redirectToLogin = () => {
    router.push({ name: 'Login' })
  }

  const processResponse = (response: any): Company => {
    if (response.data.user_photo && response.data.user_photo.data) {
      const base64 = convertImageToBase64(new Uint8Array(response.data.user_photo.data))
      response.data.user_photo = 'data:image/jpeg;base64,' + base64
    }
    return response.data
  }

  const getUser = async (): Promise<Company | null> => {
    const user = JSON.parse(localStorage.getItem('userLogged') || 'null')
    if (userData.value !== null) return userData.value

    try {
      const response = await getCompany(user.id)
      userData.value = processResponse(response)
      return userData.value
    } catch (error) {
      redirectToLogin()
      return null
    }
  }

  return { getUser  }
})
