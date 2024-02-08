import { type } from '../enum/type'

interface Company {
  [key: string]: any
  name?: string
  email?: string
  cnpj?: string
  phone_number?: string
  owner?: string
  password?: string
  type?: type.COMPANY | string
  user_photo?: string | { data: [] }
}

export { Company }
