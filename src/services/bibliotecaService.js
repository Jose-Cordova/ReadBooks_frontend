import api from './api'

export const bibliotecaService = {
  getBiblioteca() {
    return api.get('/usuarios_libros')
  },
  getLibroBiblioteca(libroId) {
    return api.get(`/usuarios_libros/${libroId}`)
  },
  actualizarProgreso(libroId, progreso) {
    return api.put(`/usuarios_libros/${libroId}`, progreso)
  }
}
