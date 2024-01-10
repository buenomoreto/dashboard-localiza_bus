import { api } from '@/config/axios'
import { Driver } from '@/ts/interfaces/driver'

export default function useDriverService() {
  const createDriver = async (
    companyId: number,
    busId: number,
    payload: Driver
  ) => {
    const response = await api.post(
      `/admin/company/${companyId}/bus/${busId}/driver`,
      payload
    )
    return response
  }

  const getDriver = async (companyId: number, driverId: number) => {
    const response = await api.get(
      `/admin/company/${companyId}/driver/${driverId}`
    )
    return response
  }

  const getAllDriver = async (companyId: number) => {
    const response = await api.get(`/admin/company/${companyId}/driver`)
    return response.data
  }

  const updateDriver = async (
    companyId: number,
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
    companyId: number,
    driverId: number,
    upload: FormData
  ) => {
    const response = await api.post(
      `/admin/company/${companyId}/driver/${driverId}/upload`,
      upload
    )
    return response.data
  }

  const deleteDriver = async (companyId: number, driverId: number) => {
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
