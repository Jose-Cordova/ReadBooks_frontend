import { defineStore } from 'pinia'
import { bibliotecaService } from '@/services/bibliotecaService'

export const useBibliotecaStore = defineStore('biblioteca', {
  state: () => ({
    libros: [],
    loading: false,
    error: null
  }),

  getters: {
    librosBiblioteca: (state) => state.libros
  },

  actions: {
    async cargarBiblioteca() {
      this.loading = true
      this.error = null
      try {
        const { data } = await bibliotecaService.getBiblioteca()
        this.libros = data.libros_comprados || []
      } catch (error) {
        this.error = error.response?.data?.message || 'Error cargando biblioteca'
        console.error('Error biblioteca:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
