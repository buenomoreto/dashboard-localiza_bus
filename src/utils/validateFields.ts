import { translates } from '@/mock/translates'
import { toast } from 'vue3-toastify'
import { Driver } from '@/ts/interfaces/driver'
import { Company } from '@/ts/interfaces/company'
import { Point } from '@/ts/interfaces/point'
import { Line } from '@/ts/interfaces/line'
import { Bus } from '@/ts/interfaces/bus'
import { Review } from '@/ts/interfaces/review'
import { UserCredentials } from '@/ts/interfaces/user'

export default function useValidateFields(params: UserCredentials | Company | Driver | Point | Line | Bus | Review, screenWidth: number): boolean {
  const missingFields: string[] = []

  for (const field in params) {
    if (!params[field]) {
      missingFields.push(field)
    }
  }

  if (missingFields.length > 0) {
    if (screenWidth > 1024) {
      missingFields.forEach((missingField) => {
        const errorMessage = `Preencha o campo obrigatório: ${translates[missingField]}`
        toast.error(errorMessage, {
          position: toast.POSITION.BOTTOM_LEFT
        })
      })
    } else {
      toast.error('Preencha os campos obrigatórios', {
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    return true
  }

  return false
}
