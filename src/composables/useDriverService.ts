import { api } from '@/config/axios'
import { Driver } from '@/ts/interfaces/driver'

export default function useDriverService() {
  const createDriver = async (payload: Driver) => {
    const response = await api.post('/admin/driver/', payload)
    return response
  }

  const getDriver = async (id: number) => {
    const response = await api.get(`/admin/driver/${id}`)
    return response
  }

  const getAllDriver = async () => {
    const response = await api.get('/admin/driver')
    return response.data
  }

  const updateDriver = async (id: number, payload: Driver) => {
    const response = await api.put(`/admin/driver/${id}`, payload)
    return response.data
  }

  const uploadFile = async (id: number, uplaod: FormData) => {
    const response = await api.post(`/admin/driver/${id}/upload`, uplaod)
    return response.data
  }

  const deleteDriver = async (id: number) => {
    const response = await api.delete(`/admin/driver/${id}`)
    return response
  }

  const updateLocation = async (
    id: number,
    payload: { latitude: number; longitude: number }
  ) => {
    const response = await api.put(`/admin/driver/location/${id}`, payload)
    return response
  }

  return {
    createDriver,
    getDriver,
    getAllDriver,
    updateDriver,
    uploadFile,
    deleteDriver,
    updateLocation
  }
}
