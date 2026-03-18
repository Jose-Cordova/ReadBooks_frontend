<template>
  <div class="text-center mb-10">
    <h1 class="text-3xl font-bold text-[#1B1226] mb-2 font-serif">Mi Biblioteca Digital</h1>
    <p class="text-gray-600 mb-8 font-medium">Todos tus libros comprados en un solo lugar. ¡Feliz lectura!</p>

    <div class="max-w-3xl mx-auto relative">
      <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
      <input
        v-model="bibliotecaStore.searchQuery"
        type="text"
        placeholder="Buscar por título o autor..."
        class="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition shadow-sm"
      />
      <button
        v-if="bibliotecaStore.searchQuery"
        @click="bibliotecaStore.searchQuery = ''"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <i class="pi pi-times-circle"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useBibliotecaStore } from '@/stores/bibliotecaStore';

// Instanciamos el store para acceder a searchQuery
const bibliotecaStore = useBibliotecaStore();
</script>
