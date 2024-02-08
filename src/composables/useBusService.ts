import { api } from '@/config/axios'
import { Bus } from '@/ts/interfaces/bus'
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

export default function useBusService() {
  const createBus = async (companyId = user.id, payload: Bus) => {
    const response = await api.post(`/admin/company/${companyId}/bus`, payload)
    return response
  }

  const getBus = async (companyId = user.id, busId: number) => {
    const response = await api.get(`/admin/company/${companyId}/bus/${busId}`)
    return response
  }

  const getAllBus = async (
    companyId = user.id,
    color?: string,
    recent?: boolean,
    limit: number = 10,
    offset: number = 0
  ): Promise<Bus[]> => {
    const params = new URLSearchParams()

    if (color) {
      params.append('color', color)
    }

    if (typeof recent === 'boolean') {
      params.append('recent', recent.toString())
    }

    params.append('limit', limit.toString())
    params.append('offset', offset.toString())

    const url = `/admin/company/${companyId}/bus?${params.toString()}`

    const { data } = await api.get(url)
    return data
  }

  const updateBus = async (companyId = user.id, busId: number, payload: Bus) => {
    const response = await api.put(
      `/admin/company/${companyId}/bus/${busId}`,
      payload
    )
    return response.data
  }

  const deleteBus = async (companyId = user.id, busId: number) => {
    const response = await api.delete(
      `/admin/company/${companyId}/bus/${busId}`
    )
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
