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
  },
  getAutores() {
    return api.get('/autores')
  },
  createLibro(formData) {
    return api.post('/libros', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateLibro(id, formData) {
    return api.post(`/libros/${id}?_method=PUT`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  deleteLibro(id) {
    return api.delete(`/libros/${id}`)
  }
}
