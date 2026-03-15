import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pago',
      name: 'pago',
      component: () => import('../views/PagoView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/mi-biblioteca',
      name: ' mi-biblioteca',
      component: () => import('../views/BibliotecaView.vue')
    }
  ],
})

export default router
