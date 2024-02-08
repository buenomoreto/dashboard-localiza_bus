import { api } from '@/config/axios'
import { Point } from '@/ts/interfaces/point'
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

export default function usePointService() {
  const createPoint = async (
    companyId = user.id,
    busId: number,
    payload: Point
  ) => {
    const response = await api.post(
      `/admin/company/${companyId}/bus/${busId}/point`,
      payload
    )
    return response
  }

  const getPoint = async (companyId = user.id, pointId: number) => {
    const response = await api.get(
      `/admin/company/${companyId}/point/${pointId}`
    )
    return response
  }

  const getAllPoint = async (companyId = user.id) => {
    const response = await api.get(`/admin/company/${companyId}/point`)
    return response.data
  }

  const updatePoint = async (
    companyId = user.id,
    busId: number,
    pointId: number,
    payload: Point
  ) => {
    const response = await api.put(
      `/admin/company/${companyId}/bus/${busId}/${pointId}`,
      payload
    )
    return response.data
  }

  const deletePoint = async (companyId = user.id, pointId: number) => {
    const response = await api.delete(
      `/admin/company/${companyId}/point/${pointId}`
    )
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
