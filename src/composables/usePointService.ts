import { api } from '@/config/axios'
import { Point } from '@/ts/interfaces/point'

export default function usePointService() {
  const createPoint = async (
    companyId: number,
    busId: number,
    payload: Point
  ) => {
    const response = await api.post(
      `/admin/company/${companyId}/bus/${busId}/point`,
      payload
    )
    return response
  }

  const getPoint = async (companyId: number, pointId: number) => {
    const response = await api.get(
      `/admin/company/${companyId}/point/${pointId}`
    )
    return response
  }

  const getAllPoint = async (companyId: number) => {
    const response = await api.get(`/admin/company/${companyId}/point`)
    return response.data
  }

  const updatePoint = async (
    companyId: number,
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

  const deletePoint = async (companyId: number, pointId: number) => {
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
