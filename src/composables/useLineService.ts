import { api } from '@/config/axios'
import { Line } from '@/ts/interfaces/line'
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

export default function useLineService() {
  const createLine = async (
    companyId = user.id,
    busId: number,
    payload: Line
  ) => {
    const response = await api.post(
      `/admin/company/${companyId}/bus/${busId}/line/`,
      payload
    )
    return response
  }

  const getLine = async (companyId = user.id, lineId: number) => {
    const response = await api.get(`/admin/company/${companyId}/line/${lineId}`)
    return response
  }

  const getAllLine = async (companyId = user.id) => {
    const response = await api.get(`/admin/company/${companyId}/line`)
    return response.data
  }

  const updateLine = async (
    companyId = user.id,
    busId: number,
    lineId: number,
    payload: Line
  ) => {
    const response = await api.put(
      `/admin/company/${companyId}/bus/${busId}/line/${lineId}`,
      payload
    )
    return response.data
  }

  const deleteLine = async (companyId = user.id, lineId: number) => {
    const response = await api.delete(
      `/admin/company/${companyId}/line/${lineId}`
    )
    return response
  }

  return {
    createLine,
    getLine,
    getAllLine,
    updateLine,
    deleteLine
  }
}
