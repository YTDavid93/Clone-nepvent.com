import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/customerpage',
      name: 'customerpage',
      component: () => import('../Customers/CustomerView.vue')
    },
    {
      path: '/customer-form',
      name: 'customerform',
      component: () => import('../Customers/CustomerForm.vue')
    }
  ]
})

export default router
