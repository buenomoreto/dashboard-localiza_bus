import Dashboard from '@/assets/images/icons/sidebar-menu/dashboard.svg'
import Bus from '@/assets/images/icons/sidebar-menu/bus.svg'
import Driver from '@/assets/images/icons/sidebar-menu/driver.svg'
import Hours from '@/assets/images/icons/sidebar-menu/hours.svg'
import Points from '@/assets/images/icons/sidebar-menu/points.svg'

export const menu = [
  {
    label: 'Dashboard',
    icon: Dashboard,
    path: '/'
  },
  {
    label: 'Ônibus',
    icon: Bus,
    path: '/onibus',
    subItems: [
      {
        label: 'Linha',
        icon: '',
        path: '/onibus/linha'
      },
      {
        label: 'Ponto',
        icon: '',
        path: '/onibus/ponto'
      }
    ]
  },
  {
    label: 'Motorista',
    icon: Driver,
    path: '/motorista'
  },
  {
    label: 'Horários',
    icon: Hours,
    path: '/horarios'
  },
  {
    label: 'Pontos',
    icon: Points,
    path: '/pontos'
  }
]
