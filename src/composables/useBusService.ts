import { api } from '@/config/axios'
import { Bus } from '@/ts/interfaces/bus'

export default function useBusService() {

  const createBus = async (payload: Bus) => {
    const response = await api.post('/admin/bus/', payload)
    return response
  }

  const getBus = async (id: number) => {
    const response = await api.get(`/admin/bus/${id}`)
    return response
  }

  const getAllBus = async () => {
    const response = await api.get('/admin/bus')
    return response.data
  }

  const updateBus = async (id: number, payload: Bus) => {
    const response = await api.put(`/admin/bus/${id}`, payload)
    return response.data
  }

  const deleteBus = async (id: number) => {
    const response = await api.delete(`/admin/bus/${id}`)
    return response
  }

  return {
    createBus,
    getBus,
    getAllBus,
    updateBus,
    deleteBus
  }
}
