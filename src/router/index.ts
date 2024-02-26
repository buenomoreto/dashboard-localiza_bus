import { createRouter, createWebHistory } from 'vue-router'

const DashboardView = () => import('@/views/DashboardView.vue')
const DashboardListing = () => import('@/views/DashboardListingView.vue')
const DashboardEditing = () => import('@/views/DashboardEditingView.vue')
const DashboardCreation = () => import('@/views/DashboardCreationView.vue')
const LoginViewAuth = () => import('@/views/Auth/LoginViewAuth.vue')
const ForgotPasswordViewAuth = () => import('@/views/Auth/ForgotPasswordViewAuth.vue')
const RegisterViewAuth = () => import('@/views/Auth/RegisterViewAuth.vue')
const TokenViewAuth = () => import('@/views/Auth/TokenViewAuth.vue')
const RecoverPasswordViewAuth = () => import('@/views/Auth/RecoverPasswordViewAuth.vue')
const DashboardConfigView = () => import('@/views/DashboardConfigView.vue')
const DashboardProfileView = () => import('@/views/DashboardProfileView.vue')

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
      component: DashboardConfigView
    },
    {
      path: '/dashboard/profile',
      name: 'Profile',
      component: DashboardProfileView
    }
  ]
})

export default router
