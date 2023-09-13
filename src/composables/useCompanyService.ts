import { Company } from '@/ts/interfaces/company'
import { api } from '@/config/axios'

export default function useCompanyService() {
  const createCompany = async (payload: Company) => {
    const response = await api.post('/company/', payload)
    return response
  }

  const getCompany = async (id: number) => {
    const response = await api.get(`/admin/company/${id}`)
    return response
  }

  const getAllCompany = async () => {
    const response = await api.get('/admin/company')
    return response.data
  }

  const updateCompany = async (id: number, payload: Company) => {
    const response = await api.put(`/admin/company/${id}`, payload)
    return response.data
  }

  const uploadFile = async (id: number, uplaod: FormData) => {
    const response = await api.post(`/admin/company/${id}/upload`, uplaod)
    return response.data
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
