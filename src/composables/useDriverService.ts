import { api } from '@/config/axios'
import { Driver } from '@/ts/interfaces/driver'
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

export default function useDriverService() {
  const createDriver = async (
    companyId = user.id,
    busId: number,
    payload: Driver
  ) => {
    const response = await api.post(
      `/admin/company/${companyId}/bus/${busId}/driver`,
      payload
    )
    return response
  }

  const getDriver = async (companyId = user.id, driverId: number) => {
    const response = await api.get(
      `/admin/company/${companyId}/driver/${driverId}`
    )
    return response
  }

  const getAllDriver = async (companyId = user.id) => {
    const response = await api.get(`/admin/company/${companyId}/driver`)
    return response.data
  }

  const updateDriver = async (
    companyId = user.id,
    busId: number,
    driverId: number,
    payload: Driver
  ) => {
    const response = await api.put(
      `/admin/company/${companyId}/bus/${busId}/driver/${driverId}`,
      payload
    )
    return response.data
  }

  const uploadFile = async (
    companyId = user.id,
    driverId: number,
    upload: FormData
  ) => {
    const response = await api.post(
      `/admin/company/${companyId}/driver/${driverId}/upload`,
      upload
    )
    return response.data
  }

  const deleteDriver = async (companyId = user.id, driverId: number) => {
    const response = await api.delete(
      `/admin/company/${companyId}/driver/${driverId}`
    )
    return response
  }

  return {
    createDriver,
    getDriver,
    getAllDriver,
    updateDriver,
    uploadFile,
    deleteDriver
  }
}
