import { type } from "../enum/type"

interface Driver {
  [key: string]: any;
  name: string
  email: string
  cpf: string
  phone_number: string
  owner: string
  password: string
  type: type.DRIVER,
  user_photo?: string
  latitude: number
  longitude: number
}

export { Driver }
