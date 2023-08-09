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
    },
    {
     path: '/customerpage/edit/:id',
     name: 'customerEdit',
     component: () => import('../Customers/CustomerForm.vue')
   },
   {
    path: '/orderpage',
    name: 'orderpage',
    component: () => import('../Order/OrderPage.vue')
   },

  ]
})

export default router
