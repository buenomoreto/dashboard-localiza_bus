interface Point {
  name: string
  latitude: number
  longitude: number
  reference: string
  neighborhood: string
  postal_code: string
  city: string
  state: string
  [hours: number]: string
}

export { Point }
