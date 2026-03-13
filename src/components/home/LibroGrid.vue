<template>
  <div class="container mx-auto px-4 pb-20">
    <div v-if="librosStore.loading" class="text-center py-10">
      <i class="pi pi-spin pi-spinner text-4xl"></i>
      <p class="mt-2 text-black-600">Cargando catálogo...</p>
    </div>

    <div v-else>
      <div v-if="librosStore.filteredLibros.length === 0" class="text-center py-20 text-black-500 border-2 border-dashed border-gray-300 rounded-lg">
        No se encontraron libros que coincidan con tu búsqueda.
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <LibroCard
          v-for="libro in librosStore.filteredLibros"
          :key="libro.id"
          :libro="libro"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLibrosStore } from '@/stores/librosStore'
import LibroCard from './LibroCard.vue'

const librosStore = useLibrosStore()

onMounted(() => {
  librosStore.fetchLibros()
})
</script>
