import { translates } from '@/mock/translates'
import { toast } from 'vue3-toastify'
import { ToastPosition } from 'vue3-toastify';
import { Driver } from '@/ts/interfaces/driver'
import { Company } from '@/ts/interfaces/company'
import { Point } from '@/ts/interfaces/point'
import { Line } from '@/ts/interfaces/line'
import { Bus } from '@/ts/interfaces/bus'
import { Review } from '@/ts/interfaces/review'
import { UserCredentials } from '@/ts/interfaces/user'
import { AccessCredentials } from '@/ts/interfaces/user'

interface Email {
  [key: string]: any
  email: string
}
type paramsTypes =
  | AccessCredentials
  | Email
  | UserCredentials
  | Company
  | Driver
  | Point
  | Line
  | Bus
  | Review

const positionMapping: { [key: string]: ToastPosition } = {
  bottom_left: toast.POSITION.BOTTOM_LEFT,
  bottom_right: toast.POSITION.BOTTOM_RIGHT,
  top_left: toast.POSITION.TOP_LEFT,
  top_right: toast.POSITION.TOP_RIGHT,
};
  
export default function useValidateFields(params: paramsTypes, position = 'bottom_left' as ToastPosition): boolean {
  const missingFields: string[] = []
  
  for (const field in params) {
    if (!params[field]) {
      missingFields.push(field)
    }
  }

  if (missingFields.length > 0) {
    missingFields.forEach((missingField) => {
      const errorMessage = `Preencha o campo obrigatório: ${translates[missingField]}`
      const toastPosition = positionMapping[position];
      toast.error(errorMessage, {position:toastPosition})
    })
    return true
  }

  return false
}
