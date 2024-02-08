import { api } from '@/config/axios'
import { History } from '@/ts/interfaces/history'
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

export default function useHistoryService() {
  const getAllHistory = async (
    companyId = user.id,
    startDate: string,
    limit: number,
    offset: number
  ) => {
    const response = await api.get(
      `/admin/company/${companyId}/history?startDate=${startDate}&limit=${limit}&offset=${offset}`
    )

    return response.data.map((item: History) => ({
      ...item,
      message: item.message.replace('Você', '<strong>Você</strong>')
    }))
  }

  return {
    getAllHistory
  }
}
