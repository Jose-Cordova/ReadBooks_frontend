import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import { metodosPagosService } from '@/services/metodosPagosService'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    carritoPorUsuario: {},
    isOpen: false,
    metodosPagos: [],
    pagoSeleccionado: null
  }),

  persist: true,

  getters: {
    //Actua como un filtro de seguriad y trae unicamente el carrito de libros que le pertenece al usuario
    items: (state) => {
      const authStore = useAuthStore();
      const userId = authStore.user?.id
      //Si existe el usuario se busca el carrito con el id del usuario
      return userId ? (state.carritoPorUsuario[userId] || []) : []

    },

    totalPagar: (state) => {
      return state.items.reduce((total, libro) => total + parseFloat(libro.precio_actual), 0)
    },
    cantidadLibros: (state) => state.items.length
  },

  actions: {
    agregarLibro(libro) {
      const authStore = useAuthStore()
      const userId = authStore.user?.id

      if(!userId) return
      //Si es primera ves que inicia sesion el usuario se le crea un objeto
      if(!this.carritoPorUsuario[userId]){
        this.carritoPorUsuario[userId] = []
      }

      const existe = this.carritoPorUsuario[userId].find(item => item.id === libro.id)
      if (!existe) {
        this.carritoPorUsuario[userId].push(libro)
      }
    },
    eliminarLibro(id) {
      const authStore = useAuthStore()
      const userId = authStore.user?.id
      if(userId && this.carritoPorUsuario[userId]){
        this.carritoPorUsuario[userId] = this.carritoPorUsuario[userId].filter(item => item.id !== id)
      }
    },
    toggleCarrito() {
      this.isOpen = !this.isOpen
    },
    async fetchMetodosPagos(){
      try{
        const response = await metodosPagosService.getMetodosPagos();
        this.metodosPagos = response.data //Guardamos la lista
      }catch(error){
        console.error("Error al traer métodos de pago", error)
      }
    },
    setMetodoPago(id){
      this.pagoSeleccionado = id
    }
  }
})
