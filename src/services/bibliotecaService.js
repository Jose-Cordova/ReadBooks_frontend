import api from './api'

/**
 * Servicio para gestionar la biblioteca personal del usuario (Libros comprados/leídos)
 */
export const bibliotecaService = {

  /**
   * Obtiene la lista completa de libros en la biblioteca del usuario logueado.
   * Endpoint: GET /api/usuarios_libros
   */
  getBiblioteca() {
    return api.get('/usuarios_libros')
  },

  /**
   * Obtiene el detalle de un libro específico para iniciar la lectura.
   * Se usa para cargar la URL del archivo (PDF/EPUB) y la última página guardada.
   * Endpoint: GET /api/usuarios_libros/{libroId}
   */
  getLibroBiblioteca(_libroId) {
    return api.get('/usuarios_libros/${libroId}')
  },

  /**
   * Guarda el progreso de lectura del usuario.
   * * @param {Number|String} libroId - El ID del libro (libro_id en DB)
   * @param {Object} datos - Objeto con: { pagina_actual: Int, porcentaje_leido: Float }
   * * NOTA: Usamos POST con _method: 'PUT' porque Laravel procesa mejor los datos
   * del body de esta forma cuando vienen de un cliente JS.
   */
  actualizarProgreso(_libroId, datos) {
    return api.post('/usuarios_libros/${libroId}', {
      ...datos,
      _method: 'PUT' // Esto le dice a Laravel: "Trata este POST como un PUT"
    })
  },
}
