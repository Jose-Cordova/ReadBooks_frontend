<template>
  <div>
    <div v-if="bibliotecaStore.loading" class="flex flex-col items-center justify-center py-16">
      <i class="pi pi-spin pi-spinner text-5xl text-[#1b4396] mb-4"></i>
      <h2 class="text-xl font-bold text-gray-700 font-serif">Buscando tus libros...</h2>
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
      <div v-for="libro in bibliotecaStore.libros" :key="libro.id" class="bg-[#e5e7eb] border-2 border-gray-300 flex flex-col">
        <div class="bg-gray-300 h-56 flex items-center justify-center border-b-2 border-gray-300">
          <i class="pi pi-image text-5xl text-gray-500"></i>
        </div>

        <div class="p-4 flex flex-col flex-grow bg-gray-100">
          <h3 class="font-bold text-lg text-gray-900 truncate">{{ libro.titulo }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ libro.autor }}</p>

          <div class="mt-auto">
            <p class="text-xs text-gray-600 mb-1 font-semibold">Progreso</p>
            <div class="w-full bg-gray-300 rounded-full h-2 mb-4 border border-gray-400">
              <div class="bg-blue-500 h-2 rounded-full" :style="{ width: (libro.progreso || 0) + '%' }"></div>
            </div>

            <button class="w-full bg-[#1b4396] hover:bg-blue-800 text-white text-sm font-semibold py-2 rounded flex items-center justify-center gap-2 border-2 border-[#122b5e] transition">
              <i class="pi pi-desktop"></i> Continuar leyendo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBibliotecaStore } from '@/stores/bibliotecaStore'; // Asegúrate de que esta ruta sea correcta

// Inicializamos el store
const bibliotecaStore = useBibliotecaStore();

// Cuando el componente aparece en pantalla, mandamos a llamar a Laravel
onMounted(() => {
  bibliotecaStore.cargarBiblioteca();
});
</script>
