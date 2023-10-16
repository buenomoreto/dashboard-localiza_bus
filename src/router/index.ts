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
      component: LoginViewAuth
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterViewAuth
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPasswordViewAuth
    },
    {
      path: '/auth-token',
      name: 'AuthToken',
      component: TokenViewAuth
    },
    {
      path: '/recover-password',
      name: 'RecoverPassword',
      component: RecoverPasswordViewAuth
    },
    {
      path: '/:listing/:listing2?',
      name: 'Listing',
      component: DashboardListing
    },
    {
      path: '/:listing/editing',
      name: 'Editing',
      component: DashboardEditing
    },
    {
      path: '/:listing/creation',
      name: 'Creation',
      component: DashboardCreation
    }
  ]
})

export default router
