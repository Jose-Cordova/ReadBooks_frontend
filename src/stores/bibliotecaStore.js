import { defineStore } from 'pinia'
import { bibliotecaService } from '@/services/bibliotecaService'

export const useBibliotecaStore = defineStore('biblioteca', {
  state: () => ({
    libros: [],
    loading: false,
    error: null,
    searchQuery: '' // Término de búsqueda vinculado al Hero
  }),

  getters: {
    // IMPORTANTE: Este es el que debes usar en el v-for para que el buscador funcione
    librosFiltrados: (state) => {
      const q = state.searchQuery.toLowerCase().trim();
      if (!q) return state.libros;

      return state.libros.filter(libro =>
        libro.titulo.toLowerCase().includes(q) ||
        libro.autor.toLowerCase().includes(q)
      );
    },

    totalLibros: (state) => state.libros.length,
    librosTerminados: (state) => state.libros.filter(l => l.estado === 'terminado')
  },

  actions: {
    async cargarBiblioteca() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await bibliotecaService.getBiblioteca();

        if (data && data.libros_comprados) {
          this.libros = data.libros_comprados.map(libro => {
            const nombreImagen = libro.imagen ? libro.imagen.split('/').pop() : null;

            return {
              ...libro,
              imagen: nombreImagen
                ? `http://localhost:8000/libros/imagenes/${nombreImagen}`
                : null,

              progreso: parseFloat(libro.progreso) || 0,
              paginaActual: parseInt(libro.paginaActual, 10) || 0,
              estado: libro.estado || 'pendiente'
            };
          });
        } else {
          this.libros = [];
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al conectar con la biblioteca';
        console.error('Error en Store Biblioteca:', error);

        if (error.response?.status === 401) this.libros = [];
      } finally {
        this.loading = false;
      }
    },

    limpiarBiblioteca() {
      this.libros = [];
      this.searchQuery = '';
      this.error = null;
    }
  }
})
