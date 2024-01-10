import { type } from '../enum/type'

interface Driver {
  [key: string]: any
  id_company: number
  name: string
  email: string
  cpf: string
  phone_number: string
  password: string
  type: type.DRIVER
  user_photo?: string
  latitude: number
  longitude: number
}

export { Driver }
