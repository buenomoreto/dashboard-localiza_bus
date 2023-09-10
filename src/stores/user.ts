// useUserStore.ts
import { defineStore } from 'pinia'
import { Company } from '@/ts/interfaces/company'
import useCompanyService from '@/composables/useCompanyService'
import { useRouter } from 'vue-router'
export const useUserStore = defineStore('user', () => {
  const { getCompany } = useCompanyService()
  const router = useRouter()

  const fetchUser = async (): Promise<Company | null> => {
    const user = JSON.parse(localStorage.getItem('userLogged') || 'null')
    const redirectToLogin = () => {
      router.push({ name: 'Login', path: '/signIn' })
    }

    if (!user) {
      redirectToLogin()
    }

    return getCompany(user.id)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error)
        redirectToLogin()
      })
  }

  return { fetchUser }
})
