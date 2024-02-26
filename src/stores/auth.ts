import { defineStore } from 'pinia'
import { User } from '../ts/interfaces/user'
import { type } from '@/ts/enum/type'

export const useAuthStore = defineStore('auth', {
  state: (): User => ({
    accessToken: '',
    refreshToken: '',
    id: 0,
    type: type.USER
  }),
  actions: {
    setTokens(user: User) {
      Object.assign(this, user)
      localStorage.setItem('userLogged', JSON.stringify(user))
    },
    clearTokens() {
      this.accessToken = ''
      this.refreshToken = ''
      this.id = 0
      this.type = type.USER
      localStorage.removeItem('userLogged')
    }
  }
})
