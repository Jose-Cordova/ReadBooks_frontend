import { defineStore } from 'pinia'
import { librosService } from '@/services/librosService'

export const useLibrosStore = defineStore('libros', {
  state: () => ({
    libros: [],
    categorias: [],
    loading: false,
    error: null,
    selectedCategoria: null,
    searchQuery: ''
  }),
  actions: {
    async fetchLibros() {
      this.loading = true
      try {
        const response = await librosService.getLibros()
        this.libros = response.data
      } catch (err) {
        this.error = 'Error al cargar los libros'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async fetchCategorias() {
      try {
        const response = await librosService.getCategorias()
        this.categorias = response.data
      } catch (err) {
        console.error('Error al cargar categorías', err)
      }
    },
    setCategoria(categoriaId) {
      this.selectedCategoria = categoriaId
    },
    setSearch(query) {
      this.searchQuery = query
    }
  },
  getters: {
    filteredLibros: (state) => {
      let filtered = state.libros

      if (state.selectedCategoria) {
        filtered = filtered.filter(libro => libro.categoria_id === state.selectedCategoria)
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(libro => {
          const tituloMatch = libro.titulo?.toLowerCase().includes(query)
          return tituloMatch
        })
      }
      return filtered
    }
  }
})
