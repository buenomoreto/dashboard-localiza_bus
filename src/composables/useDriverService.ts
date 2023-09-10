import { api } from '@/config/axios'

export default function useDriverService() {
  const updateLocation = async (id: number, payload: { latitude: number; longitude: number }) => {
    const response = await api.put(`/admin/driver/location/${id}`, payload)
    return response
  }

  return {
    updateLocation
  }
}
