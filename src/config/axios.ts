import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { User } from '@/ts/interfaces/user'
import useUserService from '@/composables/useUserService'
import { useRouter } from 'vue-router'

const router = useRouter()
const { refreshToken } = useUserService()
const api: AxiosInstance = axios.create({
  baseURL: 'https://backend-localiza-bus.vercel.app/api',
  headers: {
    Accept: 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const user: User = JSON.parse(localStorage.getItem('userLogged') || 'null')
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`
    }
    return config
  },
  (error) => {
    router.push('/login')
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const user: User = JSON.parse(localStorage.getItem('userLogged') || 'null')
      if (user && user.refreshToken) {
        try {
          const response = await refreshToken(user.refreshToken)
          user.accessToken = response.data.accessToken
          console.log(response)
          localStorage.setItem('userLogged', JSON.stringify(user))
          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
          return api(originalRequest)
        } catch (err) {
          console.error('Erro ao atualizar o token', err)
          router.push('/login')
        }
      }
    }

    if (error.response) {
      console.error('Erro de resposta do servidor:', error.response.status)
    } else if (error.request) {
      console.error('Erro de solicitação:', error.request)
    } else {
      console.error('Erro ao processar solicitação:', error.message)
    }
    return Promise.reject(error)
  }
)

export { api }
