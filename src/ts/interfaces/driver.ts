import { type } from "../enum/type"

interface Driver {
  name: string
  email: string
  cnpj: string
  phone_number: string
  owner: string
  password: string
  type: type.DRIVER,
  user_photo?: string
}

export { Driver }
