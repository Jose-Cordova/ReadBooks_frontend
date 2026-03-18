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
      component: () => import('../views/PagoView.vue'),
      meta: {requiresAuth: true, requiresCart: true}
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
      name: 'mi-biblioteca',
      component: () => import('../views/BibliotecaView.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/libro/:id',
      name: 'libro-detalle',
      component: () => import('../views/LibroDetalleView.vue')
    },
  {
  path: '/dashboard',
  name: 'admin-dashboard',
  component: () => import('@/views/admin/Dashboard.vue'),
  meta: { requiresAuth: true, role: 'ADMIN' }
  }
  ],
})

import { useAuthStore } from '@/stores/authStore'
import { useCarritoStore } from '@/stores/carritoStore'

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const carritoStore = useCarritoStore()

  //Requiere estar logueado
  if(to.meta.requiresAuth && !authStore.isAuthenticated){
    return '/login'
  }
  //Requiere tener libros en el carrito y metodo pago selecionado
  if(to.meta.requiresCart && carritoStore.cantidadLibros === 0 ){
    return '/'
  }else if(to.meta.requiresCart && !carritoStore.pagoSeleccionado){
    return '/'
  }
  //Requiere tener rol de ADMIN para entrar al dashboard
  if(to.meta.role && !authStore.isAdmin){
    return '/'
  }
  //Si se cumplen las reglas
  return true
})

export default router
