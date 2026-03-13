<template>
  <div class="border-2 border-black p-4 flex flex-col h-full bg-gray-200 transition-all duration-300 hover:bg-white hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 group cursor-pointer">
    <!-- Contenedor Imagen -->
    <div class="border-b-2 border-black mb-4 bg-gray-300 aspect-square flex items-center justify-center overflow-hidden">
      <img
        v-if="libro.url_imagen"
        :src="getImageUrl(libro.url_imagen)"
        :alt="libro.titulo"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <i v-else class="pi pi-image text-4xl text-gray-500"></i>
    </div>

    <!-- Información -->
    <div class="flex flex-col flex-grow gap-2">
      <h3 class="text-2xl font-bold font-serif leading-tight line-clamp-2">
        {{ libro.titulo }}
      </h3>

      <p class="font-bold text-gray-800">
        {{ libro.autor?.nombre_completo }}
      </p>

      <p class="text-gray-600 text-sm line-clamp-3 flex-grow">
        {{ libro.descripcion }}
      </p>

      <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
        <span class="text-2xl font-bold">
          ${{libro.precio_actual}}
        </span>

        <button
          v-if="authStore.isAuthenticated && authStore.isCliente"
          @click.stop="carritoStore.agregarLibro(libro)"
          class="bg-[#1a1625] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition shadow-md active:scale-95">
          Añadir al carrito
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCarritoStore } from '@/stores/carritoStore'
import { useAuthStore } from '@/stores/authStore'

defineProps({
  libro: {
    type: Object,
    required: true
  }
})

const carritoStore = useCarritoStore()
const authStore = useAuthStore()

const getImageUrl = (url) => {
  return `http://localhost:8000/${url}`
}
</script>

<style scoped>
.font-serif {
  font-family: 'Times New Roman', Times, serif;
}
</style>
