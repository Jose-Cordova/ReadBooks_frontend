<template>
  <div>
    <div v-if="bibliotecaStore.loading" class="flex flex-col items-center justify-center py-16">
      <i class="pi pi-spin pi-spinner text-5xl text-[#1b4396] mb-4"></i>
      <h2 class="text-xl font-bold text-gray-700 font-serif">Buscando tus libros...</h2>
    </div>

    <div v-else-if="bibliotecaStore.searchQuery && bibliotecaStore.librosFiltrados.length === 0" class="flex flex-col items-center justify-center py-16 bg-white border-2 border-dashed border-gray-300 rounded-lg">
      <i class="pi pi-search text-6xl text-gray-400 mb-4"></i>
      <h2 class="text-2xl font-bold text-gray-800 mb-2 font-serif">Sin coincidencias</h2>
      <p class="text-gray-500 font-medium">No encontramos nada para "{{ bibliotecaStore.searchQuery }}"</p>
    </div>

    <div v-else-if="bibliotecaStore.libros.length === 0" class="flex flex-col items-center justify-center py-16 bg-white border-2 border-dashed border-gray-300 rounded-lg">
      <i class="pi pi-folder-open text-6xl text-gray-400 mb-4"></i>
      <h2 class="text-2xl font-bold text-gray-800 mb-2 font-serif">Tu biblioteca está vacía</h2>
      <p class="text-gray-500 mb-6 font-medium">Aún no has adquirido ningún libro. ¡Descubre tu próxima aventura!</p>
      <router-link to="/" class="bg-[#1b4396] hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center gap-2">
        <i class="pi pi-compass"></i> Explorar Catálogo
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <div v-for="libro in bibliotecaStore.librosFiltrados" :key="libro.id" class="bg-[#e5e7eb] border-2 border-gray-300 flex flex-col relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">

        <div class="absolute top-2 right-2 px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold text-white shadow z-10" :class="getColorEstado(libro.estado)">
          {{ getTextoEstado(libro.estado) }}
        </div>

        <div class="bg-gray-300 h-64 flex items-center justify-center border-b-2 border-gray-300 overflow-hidden relative">
          <img
            v-if="libro.url_imagen"
            :src="getImagenUrl(libro.url_imagen)"
            :alt="libro.titulo"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            @error="imagenPorDefecto"
          />
          <div v-else class="flex flex-col items-center justify-center text-gray-500">
            <i class="pi pi-image text-5xl mb-2"></i>
            <span class="text-xs font-semibold">Sin Portada</span>
          </div>
        </div>

        <div class="p-4 flex flex-col flex-grow bg-gray-100">
          <h3 class="font-bold text-lg text-gray-900 truncate" :title="libro.titulo">{{ libro.titulo }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ libro.autor }}</p>

          <div class="mt-auto">
            <div class="flex justify-between items-center mb-1">
              <p class="text-xs text-gray-600 font-semibold">Progreso</p>
              <p class="text-xs font-bold text-[#1b4396]">{{ libro.progreso }}%</p>
            </div>

            <div class="w-full bg-gray-300 rounded-full h-2 mb-4 border border-gray-400 overflow-hidden">
              <div
                class="bg-blue-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: libro.progreso + '%' }"
              ></div>
            </div>

            <button @click="abrirLibro(libro)" class="w-full text-white text-sm font-semibold py-2 rounded flex items-center justify-center gap-2 border-2 transition shadow-sm hover:shadow" :class="getColorBoton(libro.estado)">
              <i :class="getIconoBoton(libro.estado)"></i> {{ getTextoBoton(libro.estado) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBibliotecaStore } from '@/stores/bibliotecaStore';

const bibliotecaStore = useBibliotecaStore();
const router = useRouter();

// LÓGICA DE ESTADOS
const getTextoEstado = (estado) => {
  const estados = { pendiente: 'Pendiente', leyendo: 'Leyendo', terminado: 'Terminado' };
  return estados[estado] || 'Pendiente';
};

const getColorEstado = (estado) => {
  const colores = { pendiente: 'bg-yellow-500', leyendo: 'bg-[#1b4396]', terminado: 'bg-green-600' };
  return colores[estado] || 'bg-gray-500';
};

const getTextoBoton = (estado) => {
  const textos = { pendiente: 'Comenzar lectura', leyendo: 'Seguir leyendo', terminado: 'Volver a leer' };
  return textos[estado] || 'Leer';
};

const getIconoBoton = (estado) => {
  const iconos = { pendiente: 'pi pi-book', leyendo: 'pi pi-desktop', terminado: 'pi pi-replay' };
  return iconos[estado] || 'pi pi-book';
};

const getColorBoton = (estado) => {
  const estilos = {
    pendiente: 'bg-yellow-600 hover:bg-yellow-700 border-yellow-800',
    leyendo: 'bg-[#1b4396] hover:bg-blue-800 border-[#122b5e]',
    terminado: 'bg-green-600 hover:bg-green-700 border-green-800'
  };
  return estilos[estado] || 'bg-[#1b4396] hover:bg-blue-800 border-[#122b5e]';
};

const imagenPorDefecto = (e) => {
  e.target.src = 'https://via.placeholder.com/300x400?text=Cargando...';
};
const getImagenUrl = (url) => {
  return `http://localhost:8000/${url}`
};

const abrirLibro = (libro) => {
  router.push({
    name: 'lector',
    params: { id: libro.id }
  });
};

onMounted(() => {
  bibliotecaStore.cargarBiblioteca();
});
</script>

<style scoped>
h3 { min-width: 0; }
</style>
