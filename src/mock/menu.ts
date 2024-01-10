import Dashboard from '@/assets/images/icons/menu/dashboard.svg'
import Bus from '@/assets/images/icons/menu/bus.svg'
import Driver from '@/assets/images/icons/menu/driver.svg'
import Config from '@/assets/images/icons/menu/config.svg'

export const menu = [
  {
    label: 'Dashboard',
    icon: Dashboard,
    path: '/'
  },
  {
    label: 'Ônibus',
    icon: Bus,
    path: '/bus'
  },
  {
    label: 'Motorista',
    icon: Driver,
    path: '/driver'
  },
  {
    label: 'Configurações',
    icon: Config,
    path: '/dashboard/config'
  }
]
