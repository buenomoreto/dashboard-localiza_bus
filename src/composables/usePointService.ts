import { api } from '@/config/axios'
import { Point } from '@/ts/interfaces/point'

export default function usePointService() {

  const createPoint = async (payload: Point) => {
    const response = await api.post('/admin/point/', payload)
    return response
  }

  const getPoint = async (id: number) => {
    const response = await api.get(`/admin/point/${id}`)
    return response
  }

  const getAllPoint = async () => {
    const response = await api.get('/admin/point')
    return response.data
  }

  const updatePoint = async (id: number, payload: Point) => {
    const response = await api.put(`/admin/point/${id}`, payload)
    return response.data
  }

  const deletePoint = async (id: number) => {
    const response = await api.delete(`/admin/point/${id}`)
    return response
  }

  return {
    createPoint,
    getPoint,
    getAllPoint,
    updatePoint,
    deletePoint
  }
}
