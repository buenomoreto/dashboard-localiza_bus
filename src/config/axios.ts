import  axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { type User } from '@/ts/interfaces/user';

const api: AxiosInstance = axios.create({
  baseURL: 'https://backend-localizabus.vercel.app/api',
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const user: User = JSON.parse(localStorage.getItem('userloggedIn') || 'null');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error('Erro de resposta do servidor:', error.response.status);
    } else if (error.request) {
      console.error('Erro de solicitação:', error.request);
    } else {
      console.error('Erro ao processar solicitação:', error.message);
    }
    return Promise.reject(error);
  }
);

export { api };

