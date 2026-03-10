import api from './api'

export const librosService = {
  getLibros() {
    return api.get('/libros')
  },
  getLibro(id) {
    return api.get(`/libros/${id}`)
  },
  getCategorias() {
    return api.get('/categorias')
  }
}
