import { api } from '@/config/axios'
import { Bus } from '@/ts/interfaces/bus'
import { Driver } from '@/ts/interfaces/driver'
import { Line } from '@/ts/interfaces/line'
import { Point } from '@/ts/interfaces/point'

export default function useDynamicService() {
  const getAll = async (
    companyId: number,
    name: string,
    recent?: boolean,
    limit?: number,
    offset?: number
  ): Promise<any> => {
    const params = new URLSearchParams()

    const parameters: Record<string, string | boolean | number | undefined> = {
      recent,
      limit,
      offset
    }

    Object.entries(parameters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString())
      }
    })

    const url = `/admin/company/${companyId}/${name}?${params.toString()}`

    const response = await api.get(url)
    return response
  }

  const create = async (
    companyId: number,
    name: string,
    payload: Bus | Driver | Line | Point
  ): Promise<any> => {
    const url = `/admin/company/${companyId}/${name}`

    const response = await api.post(url, payload)
    return response
  }

  const destroy = async (
    companyId: number,
    id: number,
    name: string
  ): Promise<any> => {
    const url = `/admin/company/${companyId}/${name}/${id}`

    const response = await api.delete(url)
    return response
  }
  return {
    getAll,
    create,
    destroy
  }
}
