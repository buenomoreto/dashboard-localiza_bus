import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueTheMask)
app.use(money, { precision: 4 })
app.use(Vue3Toastify, {
  autoClose: 3000
} as ToastContainerOptions)
app.mount('#app')
