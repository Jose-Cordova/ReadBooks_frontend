<template>
  <div class="min-h-screen bg-gray-200 pt-18 pb-12">
    <Navbar />
    <CarritoModal />
    <div class="container mx-auto px-4 max-w-6xl">
      <button @click="$router.back()"  class="flex items-center gap-2 text-black hover:bg-white border-2 border-black p-2 mb-8 transition-all
       shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 group">
       <i class="pi pi-arrow-left"></i>
        <span class="font-bold">Volver</span>
      </button>
      <div v-if="loading" class="text-center py-20">
         <i class="pi pi-spin pi-spinner text-4xl text-black"></i>
      </div>
      <div v-else-if="libro" class="grid grid-cols-1 md:grid-cols-2 gap-12  items-start">
        <!-- Portada -->
         <div class="bg-white border-4 border-black p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div class="overflow-hidden border-2 border-black bg-gray-300">
            <img :src="getImageUrl(libro.url_imagen)" :alt="libro.titulo" class="w-full h-full object-cover">
          </div>
         </div>
        <!-- Información -->
         <div class="space-y-6">
          <span class="inline-block bg-blue-400 text-black px-4 py-1 border-2 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {{ libro.categoria?.nombre }}
          </span>
          <h1 class="text-5xl md:text-6xl font-bold font-serif leading-tight text-black">
            {{ libro.titulo }}
          </h1>
          <p class="text-2xl text-gray-700 font-bold font-serif">
            <span class="decoration-2 underline-offset-4">{{ libro.autor?.nombre_completo }}</span>
          </p>
        <!-- Caja de Descripción -->
          <div class="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 class="text-xl font-bold font-serif mb-4 border-b-2 border-black pb-2">Descripción</h3>
            <p class="text-gray-800 leading-relaxed text-lg">
              {{ libro.descripcion }}
            </p>
          </div>
        <!-- Precio y Acción -->
          <div class="flex flex-wrap items-center gap-8 pt-4">
            <span class="text-4xl font-black text-black">
              ${{ parseFloat(libro.precio_actual).toFixed(2) }}
            </span>
            <!-- Botón Ya Comprado -->
            <button v-if="authStore.isAuthenticated && authStore.isCliente && authStore.tieneLibro(libro.id)"
                    disabled
                    class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold opacity-80 cursor-not-allowed border-2 border-black">
              <i class="pi pi-check-circle mr-2"></i>
              Comprado
            </button>
            <!-- Botón Añadir -->
            <button v-else-if="authStore.isAuthenticated && authStore.isCliente"
                    @click="carritoStore.agregarLibro(libro)"
                    class="bg-[#1a1625] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition shadow-md active:scale-95">
              <i class="pi pi-shopping-cart mr-2"></i>
              Añadir al carrito
            </button>
          </div>
         </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/layouts/Navbar.vue';
import { librosService } from '@/services/librosService';
import { useAuthStore } from '@/stores/authStore';
import { useCarritoStore } from '@/stores/carritoStore';
import CarritoModal from '@/components/home/CarritoModal.vue';
import Footer from '@/components/layouts/Footer.vue';

const route = useRoute()
const authStore = useAuthStore()
const carritoStore = useCarritoStore()

const libro = ref(null)
const loading = ref(true)

onMounted(async () => {
  try{
    const {data} = await librosService.getLibro(route.params.id)
    libro.value = data
  }catch(error){
    console.error('Error al cargar detalles del libro', error)
  }finally{
    loading.value = false
  }
})

const getImageUrl = (url) => `http://localhost:8000/${url}`

</script>

<style scoped>
  .font-serif{
    font-family: 'Times New Roman', Times, serif;
  }
</style>
