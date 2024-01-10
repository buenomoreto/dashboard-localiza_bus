import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import DashboardListing from '@/views/DashboardListingView.vue'
import DashboardEditing from '@/views/DashboardEditingView.vue'
import DashboardCreation from '@/views/DashboardCreationView.vue'
import LoginViewAuth from '@/views/Auth/LoginViewAuth.vue'
import ForgotPasswordViewAuth from '@/views/Auth/ForgotPasswordViewAuth.vue'
import RegisterViewAuth from '@/views/Auth/RegisterViewAuth.vue'
import TokenViewAuth from '@/views/Auth/TokenViewAuth.vue'
import RecoverPasswordViewAuth from '@/views/Auth/RecoverPasswordViewAuth.vue'
import DashboardConfigVieW from '@/views/DashboardConfigView.vue'
import DashboardProfileView from '@/views/DashboardProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DashboardView
    },
    {
      path: '/signIn',
      name: 'Login',
      component: LoginViewAuth,
      meta: { transition: 'slide-right' },
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterViewAuth,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordViewAuth,
      meta: { transition: 'slide-right' },
    },
    {
      path: '/auth-token',
      name: 'AuthToken',
      component: TokenViewAuth,
      meta: { transition: 'slide-right' },
    },
    {
      path: '/recover-password',
      name: 'RecoverPassword',
      component: RecoverPasswordViewAuth,
      meta: { transition: 'slide-right' },
    },
    {
      path: '/:listing/:listing2?',
      name: 'Listing',
      component: DashboardListing
    },
    {
      path: '/:listing/editing/:id',
      name: 'Editing',
      component: DashboardEditing
    },
    {
      path: '/:listing/creation/:id?',
      name: 'Creation',
      component: DashboardCreation
    },
    {
      path: '/dashboard/config',
      name: 'Config',
      component: DashboardConfigVieW
    },
    {
      path: '/dashboard/profile',
      name: 'Profile',
      component: DashboardProfileView
    }
  ]
})

export default router
