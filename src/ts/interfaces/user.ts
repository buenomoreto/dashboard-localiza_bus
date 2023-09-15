import { type } from "../enum/type"

interface User {
  id: number
  accessToken: string 
  refreshToken: string
  type: type
}

interface UserCredentials {
  email: string
  password: string
}

interface AccessCredentials {
  password: string
  token: string
}

export { User, UserCredentials, AccessCredentials }
