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

  const getAllBus = async (
    color?: string,
    recent?: boolean,
    limit: number = 10,
    offset: number = 0
  ): Promise<any> => {
    const params = new URLSearchParams()

    if (color) {
      params.append('color', color)
    }

    if (typeof recent === 'boolean') {
      params.append('recent', recent.toString())
    }

    params.append('limit', limit.toString())
    params.append('offset', offset.toString())

    const url = `/admin/bus?${params.toString()}`

    const { data } = await api.get(url)
    return data
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
