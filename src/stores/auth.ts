import { defineStore } from 'pinia'

type AuthState = {
  accessToken: string;
  refreshToken: string;
  id: number;
  type: string;
};

export const useAuthStore = defineStore('auth',  {
  state: (): AuthState => ({
    accessToken: '',
    refreshToken: '',
    id: 0,
    type: ''
  }),
  actions: {
    setTokens(user: AuthState) {
      Object.assign(this, user);
      localStorage.setItem('userLogged', JSON.stringify(user));
    },
    loadTokens() {
      const user = JSON.parse(localStorage.getItem('userLogged') as string);
      if (user) {
        Object.assign(this, user);
      }
    },
    clearTokens() {
      this.accessToken = '';
      this.refreshToken = '';
      this.id = 0;
      this.type = '';
      localStorage.removeItem('userLogged');
    },
  },
});
