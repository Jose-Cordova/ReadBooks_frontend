import { defineStore } from 'pinia'
import { useCarritoStore } from './carritoStore'
import api from '@/services/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),

  // Persistencia automática
  persist: true,

  getters: {
    isAuthenticated: (state) => !!state.token,

    isAdmin: (state) => {
      return state.user?.roles?.some(role => role.name === 'ADMIN')
    },
    isCliente: (state) => {
      return state.user?.roles?.some(role => role.name === 'CLIENTE')
    },
    //Verificamos si el usuario tiene el libro comprado
    tieneLibro: (state) => (libroId) => {
      if(!state.user || !state.user.usuario_libros) return false
      //Buscamos si el libro esta en su colecion
      return state.user.usuario_libros.some(ul => ul.libro_id === libroId)
    }
  },

  actions: {

    async login(credentials) {
      try {
        const { data } = await api.post('/auth/login', credentials)

        const carritoStore = useCarritoStore()
        carritoStore.pagoSeleccionado = null

        this.token = data.access_token
        this.user = data.user

        // Redirección según rol
        if (this.isAdmin) {
          router.push('/dashboard')
        } else {
          router.push('/')
        }

      } catch (error) {
        console.error('Error en login:', error)
        throw error
      }
    },

    async register(payload) {
      try {
        const { data } = await api.post('/auth/register', payload)

        this.token = data.access_token
        this.user = data.user

        router.push('/')
      } catch (error) {
        console.error('Error en registro:', error)
        throw error
      }
    },

    async logout() {
      try {
        if (this.token) {
          await api.post('/auth/logout')
        }
      } catch (error) {
        console.warn('Error al cerrar sesión:', error)
      } finally {
        this.$reset()
        router.push('/')
      }
    },

    async fetchUser(){
      try{
        const {data} = await api.get('/auth/me')
        this.user = data //Actualizamos con los datos nuevos
      }catch(error){
        console.error("Error al actaulizar los datos del usuario.", error)
      }
    }
  }
})
