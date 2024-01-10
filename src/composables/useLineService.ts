import { api } from '@/config/axios'
import { Line } from '@/ts/interfaces/line'

export default function useLineService() {
  const createLine = async (
    companyId: number,
    busId: number,
    payload: Line
  ) => {
    const response = await api.post(
      `/admin/company/${companyId}/bus/${busId}/line/`,
      payload
    )
    return response
  }

  const getLine = async (companyId: number, lineId: number) => {
    const response = await api.get(`/admin/company/${companyId}/line/${lineId}`)
    return response
  }

  const getAllLine = async (companyId: number) => {
    const response = await api.get(`/admin/company/${companyId}/line`)
    return response.data
  }

  const updateLine = async (
    companyId: number,
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

  const deleteLine = async (companyId: number, lineId: number) => {
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
