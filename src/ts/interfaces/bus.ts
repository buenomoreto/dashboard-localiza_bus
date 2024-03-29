import { Driver } from './driver'
import { Point } from './point'
import { Line } from './line'

interface Bus {
  [key: string]: any
  name: string
  id_company: number
  model: string
  license_plate: string
  ticket_price: number
  brand: string
  operational_status: boolean
  driver?: Driver
  point?: Point
  line?: Line
}

export { Bus }
