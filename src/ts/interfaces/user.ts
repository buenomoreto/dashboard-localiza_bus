interface User {
  id: number
  token: string
  type: string
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
