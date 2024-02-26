import { Company } from '@/ts/interfaces/company'
import { api } from '@/config/axios'
import router from '@/router'

export default function useCompanyService() {
  
  const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

  const createCompany = async (payload: Company) => {
    const response = await api.post('/company/', payload)
    return response
  }

  const getCompany = async (id: number) => {
    let response;
    if (!user) {
      localStorage.removeItem('userLogged');
      router.push({ name: 'Login' });
    } else {
      response = await api.get(`/admin/company/${id}`);
    }
    return response;
  }
  

  const getAllCompany = async () => {
    const response = await api.get('/admin/company')
    return response.data
  }

  const updateCompany = async (id: number, payload: Company) => {
    const response = await api.put(`/admin/company/${id}`, payload)
    return response
  }

  const uploadFile = async (id: number, upload: FormData) => {
    const response = await api.post(`/admin/company/${id}/upload`, upload)
    return response
  }

  const deleteCompany = async (id: number) => {
    const response = await api.delete(`/admin/company/${id}`)
    return response
  }

  return {
    createCompany,
    getCompany,
    getAllCompany,
    updateCompany,
    deleteCompany,
    uploadFile
  }
}
