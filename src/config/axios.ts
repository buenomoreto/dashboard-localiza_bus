import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { User } from '@/ts/interfaces/user'
import router from '@/router'
import useUserService from '@/composables/useUserService'
import { toast } from 'vue3-toastify'

const { refreshToken } = useUserService()

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
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

      const user: User = JSON.parse(
        localStorage.getItem('userLogged') || 'null'
      )
      if (user && user.refreshToken) {
        try {
          const response = await refreshToken(user.refreshToken)

          user.accessToken = response.data.accessToken

          localStorage.setItem('userLogged', JSON.stringify(user))

          originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`

          return api(originalRequest)
        } catch (err) {
          localStorage.removeItem('userLogged')
          router.push('/login')
        }
      }
    }
   
    error.response.data.message.forEach(({ msg }: any) => {
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_LEFT
      })
    })
  
    return Promise.reject(error)
  }
)

export { api }
