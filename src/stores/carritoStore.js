import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    items: [],
    isOpen: false
  }),
  
  persist: true,

  getters: {
    totalPagar: (state) => {
      return state.items.reduce((total, libro) => total + parseFloat(libro.precio_actual), 0)
    },
    cantidadLibros: (state) => state.items.length
  },

  actions: {
    agregarLibro(libro) {
      const existe = this.items.find(item => item.id === libro.id)
      if (!existe) {
        this.items.push(libro)
      }
    },
    eliminarLibro(id) {
      this.items = this.items.filter(item => item.id !== id)
    },
    toggleCarrito() {
      this.isOpen = !this.isOpen
    }
  }
})
