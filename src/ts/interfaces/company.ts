import { type } from "../enum/type"

interface Company {
  name: string
  email: string
  cpf: string
  phone_number: string
  owner: string
  password: string
  type: type.COMPANY,
  user_photo?: string,
  latitude: number,
  longitude: number
}

export { Company }
