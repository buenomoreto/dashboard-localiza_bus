import { UserCredentials, AccessCredentials } from '@/ts/interfaces/user'
import { api } from '@/config/axios'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
export default function useUserService() {

  const signIn = async (user: UserCredentials) => {
    const response = await api.post('/user/signIn', user)
    return response
  }

  const signOut = async (refreshToken: string) => {
    let response: any
    try {
      response = await api.post('/user/signOut', { refreshToken })
      await router.push({
        name: 'Login',
        path: '/signIn'
      })
    } catch (error) {
      console.error('Erro durante o logout:', error)
    } finally {
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_LEFT
      })
    }
  }

  const refreshToken = async (token: string) => {
    const response = await api.post('/refreshToken', { token })
    return response
  }

  const accountRecovery = async (payload: { email: string }) => {
    const response = await api.post('/user/account-recovery', payload)
    return response
  }

  const tokenVerify = async (token: string) => {
    const response = await api.get(`/user/validate-token/${token}`)
    return response
  }

  const updatePassword = async (credentials: AccessCredentials) => {
    const response = await api.post('/user/reset-password', credentials)
    return response
  }

  return {
    signIn,
    signOut,
    accountRecovery,
    tokenVerify,
    refreshToken,
    updatePassword
  }
}
