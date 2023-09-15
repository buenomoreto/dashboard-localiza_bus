import { type } from '../enum/type'

interface User {
  id: number
  accessToken: string
  refreshToken: string
  type: type
}

interface UserCredentials {
  [key: string]: any
  email: string
  password: string
}

interface AccessCredentials {
  [key: string]: any
  password?: string
  token?: string
  confirmPassword?: string
}

export { User, UserCredentials, AccessCredentials }
