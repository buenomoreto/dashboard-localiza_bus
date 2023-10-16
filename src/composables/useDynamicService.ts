import { api } from '@/config/axios'

export default function useDynamicService() {
  const getAll = async (
    name: string,
    color?: string,
    recent?: boolean,
    limit?: number,
    offset?: number
  ): Promise<any> => {
    const params = new URLSearchParams()

    const parameters: Record<string, string | boolean | number | undefined> = {
      color,
      recent,
      limit,
      offset
    }

    Object.entries(parameters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString())
      }
    })

    const url = `/admin/${name}?${params.toString()}`

    const { data } = await api.get(url)
    return data
  }

  return {
    getAll
  }
}
