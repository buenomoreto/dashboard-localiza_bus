import { defineStore } from 'pinia'
import { Company } from '@/ts/interfaces/company'
import { Driver } from '@/ts/interfaces/driver'
import useCompanyService from '@/composables/useCompanyService'
import useDriverService from '@/composables/useDriverService'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const { getCompany } = useCompanyService()
  const { getDriver } = useDriverService()
  const router = useRouter()

  let userData: Company | Driver

  const redirectToLogin = () => {
    router.push({ name: 'Login', path: '/signIn' })
  }

  const processResponse = (response: any) => {
    if (response.data.user_photo && response.data.user_photo.data) {
      const data = response.data.user_photo.data
      const base64 = btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      response.data.user_photo = 'data:image/jpeg;base64,' + base64
    }
    return response.data
  }

  const fetchUser = async (): Promise<Company | Driver | null> => {
    if (userData) return userData

    const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

    if (!user) {
      redirectToLogin()
      return null
    }

    try {
      const response = user.type === 'company' ? await getCompany(user.id) : await getDriver(user.id)
      userData = processResponse(response)
      return userData
    } catch (error) {
      console.error(error)
      redirectToLogin()
      return null
    }
  }

  return { fetchUser }
})
