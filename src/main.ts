import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import 'moment/locale/pt-br'
import 'moment/dist/locale/pt-br'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTheMask)
app.use(VCalendar, {})
app.use(money, { precision: 4 })
app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions)
app.use(PrimeVue)
app.mount('#app')
