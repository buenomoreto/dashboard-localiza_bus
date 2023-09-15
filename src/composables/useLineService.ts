import { api } from '@/config/axios'
import { Line } from '@/ts/interfaces/line'

export default function useLineService() {

  const createLine = async (payload: Line) => {
    const response = await api.post('/admin/line/', payload)
    return response
  }

  const getLine = async (id: number) => {
    const response = await api.get(`/admin/line/${id}`)
    return response
  }

  const getAllLine = async () => {
    const response = await api.get('/admin/line')
    return response.data
  }

  const updateLine = async (id: number, payload: Line) => {
    const response = await api.put(`/admin/line/${id}`, payload)
    return response.data
  }

  const deleteLine = async (id: number) => {
    const response = await api.delete(`/admin/line/${id}`)
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
