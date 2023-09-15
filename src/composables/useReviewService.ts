import { api } from '@/config/axios'
import { Review } from '@/ts/interfaces/review'

export default function useReviewService() {

  const createReview = async (payload: Review) => {
    const response = await api.post('/admin/driver/review', payload)
    return response
  }

  const getReviews = async (id: number) => {
    const response = await api.get(`/driver/review/${id}`)
    return response
  }

  return {
    createReview,
    getReviews
  }
}
