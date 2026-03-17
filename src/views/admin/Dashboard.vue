<template>
  <div class="min-h-screen flex flex-col" style="background-color: #f3f4f6;">

    <Navbar />

    <!-- Encabezado -->
    <div class="text-center py-8">
      <h1 class="text-3xl font-bold text-gray-800">Panel de Administrador</h1>
      <p class="text-gray-500 mt-1">Administra tu librería con facilidad</p>
    </div>

   
    <div class="max-w-6xl mx-auto px-4 w-full flex-1">
      <div class="flex border border-gray-300 rounded-t-lg overflow-hidden">
        <button
          @click="tabActivo = 'libros'"
          :class="tabActivo === 'libros' ? 'bg-gray-900 text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100'"
          class="flex-1 py-3 text-sm font-semibold transition"
        >
          Gestión de Libros
        </button>
        <button
          @click="cambiarTabVentas"
          :class="tabActivo === 'ventas' ? 'bg-gray-900 text-white font-bold' : 'bg-white text-gray-600 hover:bg-gray-100'"
          class="flex-1 py-3 text-sm font-semibold transition border-l border-gray-300"
        >
          Reportes de Ventas
        </button>
      </div>

      <!-- TAB LIBROS -->
      <div v-if="tabActivo === 'libros'" class="border border-gray-300 border-t-0 bg-white rounded-b-lg p-6">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800">Catalogo de Libros</h2>
            <p class="text-gray-500 text-sm">Añade, edita o elimina libros de tu tienda</p>
          </div>
          <button @click="abrirModalAgregar"
            class="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
            <i class="pi pi-plus"></i>
            Añadir Nuevo Libro
          </button>
        </div>

        <div v-if="cargando" class="text-center py-12 text-gray-400">
          <i class="pi pi-spin pi-spinner text-3xl"></i>
          <p class="mt-2">Cargando libros...</p>
        </div>

        <div v-else-if="error" class="text-center py-12 text-red-400">
          <i class="pi pi-exclamation-circle text-3xl"></i>
          <p class="mt-2">{{ error }}</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b-2 border-gray-200">
                <th class="text-left py-3 px-4 font-bold text-gray-700">Titulo</th>
                <th class="text-left py-3 px-4 font-bold text-gray-700">Autor</th>
                <th class="text-left py-3 px-4 font-bold text-gray-700">Categoría</th>
                <th class="text-left py-3 px-4 font-bold text-gray-700">Precio</th>
                <th class="text-right py-3 px-4 font-bold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="libro in libros" :key="libro.id"
                class="border-b border-gray-100 hover:bg-gray-50 transition">
                <td class="py-3 px-4 font-semibold text-gray-800">{{ libro.titulo }}</td>
                <td class="py-3 px-4 text-gray-600">{{ libro.autor?.nombre_completo }}</td>
                <td class="py-3 px-4 text-gray-600">{{ libro.categoria?.nombre }}</td>
                <td class="py-3 px-4 text-gray-700 font-medium">${{ Number(libro.precio_actual).toFixed(2) }}</td>
                <td class="py-3 px-4 text-right">
                  <button @click="abrirModalEditar(libro)" class="text-green-500 hover:text-green-700 transition mr-3" title="Editar">
                    <i class="pi pi-file-edit text-lg"></i>
                  </button>
                  <button @click="confirmarEliminar(libro)" class="text-red-500 hover:text-red-700 transition" title="Eliminar">
                    <i class="pi pi-trash text-lg"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="libros.length === 0">
                <td colspan="5" class="text-center py-10 text-gray-400">No hay libros registrados</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TAB VENTAS -->
      <div v-if="tabActivo === 'ventas'" class="border border-gray-300 border-t-0 bg-white rounded-b-lg p-6">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-800">Reporte de Ventas</h2>
          <p class="text-gray-500 text-sm">Consulta y filtra las ventas realizadas</p>
        </div>

        <div class="flex flex-col md:flex-row gap-4 mb-6">
          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700">Fecha inicio</label>
            <input v-model="filtroFechaInicio" type="date"
              class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700">Fecha fin</label>
            <input v-model="filtroFechaFin" type="date"
              class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div class="flex items-end gap-2">
            <button @click="cargarVentas"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition">
              <i class="pi pi-search"></i> Filtrar
            </button>
            <button @click="limpiarFiltros"
              class="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-600 text-sm font-semibold rounded-lg transition">
              <i class="pi pi-times"></i> Limpiar
            </button>
          </div>
        </div>

        <div v-if="cargandoVentas" class="text-center py-12 text-gray-400">
          <i class="pi pi-spin pi-spinner text-3xl"></i>
          <p class="mt-2">Cargando ventas...</p>
        </div>

        <div v-else-if="errorVentas" class="text-center py-12 text-red-400">
          <i class="pi pi-exclamation-circle text-3xl"></i>
          <p class="mt-2">{{ errorVentas }}</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b-2 border-gray-200">
                <th class="text-left py-3 px-4 font-bold text-gray-700">Cliente</th>
                <th class="text-left py-3 px-4 font-bold text-gray-700">Fecha</th>
                <th class="text-left py-3 px-4 font-bold text-gray-700">Estado</th>
                <th class="text-center py-3 px-4 font-bold text-gray-700">Artículos</th>
                <th class="text-right py-3 px-4 font-bold text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(venta, index) in ventas" :key="index"
                class="border-b border-gray-100 hover:bg-gray-50 transition">
                <td class="py-3 px-4 font-semibold text-gray-800">{{ venta.cliente }}</td>
                <td class="py-3 px-4 text-gray-600">{{ venta.fecha }}</td>
                <td class="py-3 px-4">
                  <span
                    :class="venta.estado === 'pagado' ? 'bg-green-100 text-green-700' : venta.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'"
                    class="px-2 py-1 rounded-full text-xs font-semibold capitalize">
                    {{ venta.estado }}
                  </span>
                </td>
                <td class="py-3 px-4 text-gray-600 text-center">{{ venta.articulos }}</td>
                <td class="py-3 px-4 text-right font-medium text-gray-700">${{ Number(venta.total).toFixed(2) }}</td>
              </tr>
              <tr v-if="ventas.length === 0">
                <td colspan="5" class="text-center py-10 text-gray-400">No hay ventas registradas</td>
              </tr>
            </tbody>
          </table>

          <div v-if="ventas.length > 0" class="flex justify-end mt-4 pt-4 border-t border-gray-200">
            <div class="text-right">
              <p class="text-sm text-gray-500">Total general</p>
              <p class="text-xl font-bold text-gray-800">${{ totalVentas }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL AGREGAR / EDITAR -->
    <transition name="fade">
      <div v-if="modalAbierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

          <div class="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-bold text-gray-800">
              {{ modoEditar ? 'Editar Libro' : 'Agregar Nuevo Libro' }}
            </h3>
            <button @click="cerrarModal" class="text-gray-400 hover:text-gray-600 transition">
              <i class="pi pi-times text-xl"></i>
            </button>
          </div>

          <div class="px-6 py-5 flex flex-col gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Título</label>
              <input v-model="formulario.titulo" type="text" placeholder="Título del libro"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
              <textarea v-model="formulario.descripcion" placeholder="Descripción del libro" rows="3"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Precio</label>
              <input v-model="formulario.precio_actual" type="number" placeholder="0.00" min="0" step="0.01"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
              <select v-model="formulario.categoria_id"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Autor</label>
              <select v-model="formulario.autor_id"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                <option value="" disabled>Selecciona un autor</option>
                <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.nombre_completo }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">
                Imagen {{ modoEditar ? '(opcional, solo si deseas cambiarla)' : '' }}
              </label>
              <input type="file" accept="image/jpg,image/jpeg,image/png,image/webp"
                @change="e => formulario.imagen = e.target.files[0]"
                class="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100" />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">
                Archivo PDF {{ modoEditar ? '(opcional, solo si deseas cambiarlo)' : '' }}
              </label>
              <input type="file" accept="application/pdf"
                @change="e => formulario.archivo = e.target.files[0]"
                class="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100" />
            </div>
          </div>

          <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button @click="cerrarModal"
              class="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              Cancelar
            </button>
            <button @click="guardarLibro" :disabled="guardando"
              class="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 disabled:opacity-50">
              <i v-if="guardando" class="pi pi-spin pi-spinner"></i>
              {{ modoEditar ? 'Guardar Cambios' : 'Agregar Libro' }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <Footer />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { librosService } from '@/services/librosService'
import api from '@/services/api'
import Swal from 'sweetalert2'
import 'primeicons/primeicons.css'
import Navbar from '@/components/layouts/Navbar.vue'
import Footer from '@/components/layouts/Footer.vue'

const libros          = ref([])
const categorias      = ref([])
const autores         = ref([])
const cargando        = ref(false)
const error           = ref(null)
const tabActivo       = ref('libros')
const modalAbierto    = ref(false)
const modoEditar      = ref(false)
const guardando       = ref(false)
const libroEditandoId = ref(null)

const formulario = ref({
  titulo: '',
  descripcion: '',
  precio_actual: '',
  categoria_id: '',
  autor_id: '',
  imagen: null,
  archivo: null
})

const ventas            = ref([])
const cargandoVentas    = ref(false)
const errorVentas       = ref(null)
const filtroFechaInicio = ref('')
const filtroFechaFin    = ref('')

const totalVentas = computed(() => {
  return ventas.value.reduce((sum, v) => sum + Number(v.total), 0).toFixed(2)
})

const cargarLibros = async () => {
  cargando.value = true
  error.value = null
  try {
    const { data } = await librosService.getLibros()
    libros.value = data
  } catch {
    error.value = 'Error al cargar los libros.'
  } finally {
    cargando.value = false
  }
}

const cargarSelectores = async () => {
  try {
    const [resCats, resAutores] = await Promise.all([
      librosService.getCategorias(),
      librosService.getAutores()
    ])
    categorias.value = resCats.data
    autores.value = resAutores.data
  } catch (e) {
    console.error('Error al cargar categorías o autores', e)
  }
}

const cargarVentas = async () => {
  cargandoVentas.value = true
  errorVentas.value = null
  try {
    const params = {}
    if (filtroFechaInicio.value) params.fecha_inicio = filtroFechaInicio.value
    if (filtroFechaFin.value)    params.fecha_fin    = filtroFechaFin.value
    const { data } = await api.get('/ventas', { params })
    ventas.value = data
  } catch {
    errorVentas.value = 'Error al cargar las ventas.'
  } finally {
    cargandoVentas.value = false
  }
}

const limpiarFiltros = () => {
  filtroFechaInicio.value = ''
  filtroFechaFin.value = ''
  cargarVentas()
}

const cambiarTabVentas = () => {
  tabActivo.value = 'ventas'
  cargarVentas()
}

onMounted(() => {
  cargarLibros()
  cargarSelectores()
})

const limpiarFormulario = () => {
  formulario.value = {
    titulo: '',
    descripcion: '',
    precio_actual: '',
    categoria_id: '',
    autor_id: '',
    imagen: null,
    archivo: null
  }
  libroEditandoId.value = null
}

const abrirModalAgregar = () => {
  limpiarFormulario()
  modoEditar.value = false
  modalAbierto.value = true
}

const abrirModalEditar = (libro) => {
  limpiarFormulario()
  modoEditar.value = true
  libroEditandoId.value = libro.id
  formulario.value.titulo        = libro.titulo
  formulario.value.descripcion   = libro.descripcion
  formulario.value.precio_actual = libro.precio_actual
  formulario.value.categoria_id  = libro.categoria_id
  formulario.value.autor_id      = libro.autor_id
  modalAbierto.value = true
}

const cerrarModal = () => {
  modalAbierto.value = false
  limpiarFormulario()
}

const guardarLibro = async () => {
  const confirmacion = await Swal.fire({
    title: modoEditar.value ? '¿Guardar cambios?' : '¿Agregar este libro?',
    text: modoEditar.value
      ? '¿Estás seguro de que deseas actualizar este libro?'
      : '¿Estás seguro de que deseas agregar este nuevo libro?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#6b7280',
    confirmButtonText: modoEditar.value ? 'Sí, guardar' : 'Sí, agregar',
    cancelButtonText: 'Cancelar'
  })

  if (!confirmacion.isConfirmed) return

  guardando.value = true

  try {
    const fd = new FormData()
    fd.append('titulo',        formulario.value.titulo)
    fd.append('descripcion',   formulario.value.descripcion)
    fd.append('precio_actual', formulario.value.precio_actual)
    fd.append('categoria_id',  formulario.value.categoria_id)
    fd.append('autor_id',      formulario.value.autor_id)
    if (formulario.value.imagen)  fd.append('imagen',  formulario.value.imagen)
    if (formulario.value.archivo) fd.append('archivo', formulario.value.archivo)

    if (modoEditar.value) {
      await librosService.updateLibro(libroEditandoId.value, fd)
    } else {
      await librosService.createLibro(fd)
    }

    cerrarModal()
    await cargarLibros()

    Swal.fire({
      title: modoEditar.value ? '¡Actualizado!' : '¡Libro agregado!',
      text: modoEditar.value
        ? 'El libro fue actualizado correctamente.'
        : 'El libro fue agregado correctamente.',
      icon: 'success',
      confirmButtonColor: '#2563eb',
      timer: 2500,
      timerProgressBar: true
    })

  } catch (e) {
    Swal.fire({
      title: 'Error',
      text: e?.response?.data?.message || 'Ocurrió un error al guardar el libro.',
      icon: 'error',
      confirmButtonColor: '#2563eb'
    })
  } finally {
    guardando.value = false
  }
}

const confirmarEliminar = async (libro) => {
  const confirmacion = await Swal.fire({
    title: '¿Eliminar libro?',
    text: `¿Estás seguro de eliminar "${libro.titulo}"? Esta acción no se puede deshacer.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (!confirmacion.isConfirmed) return

  try {
    await librosService.deleteLibro(libro.id)
    await cargarLibros()

    Swal.fire({
      title: '¡Eliminado!',
      text: 'El libro fue eliminado correctamente.',
      icon: 'success',
      confirmButtonColor: '#2563eb',
      timer: 2000,
      timerProgressBar: true
    })
  } catch (e) {
    Swal.fire({
      title: 'No se puede eliminar',
      text: e?.response?.data?.message || 'Ocurrió un error al eliminar el libro.',
      icon: 'error',
      confirmButtonColor: '#2563eb'
    })
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
