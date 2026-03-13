<template>
  <!-- Fondo con overlay -->
  <div v-if="carritoStore.isOpen"
       class="fixed inset-0 bg-black/40 z-50 transition-all duration-300"
       @click="carritoStore.toggleCarrito">

    <!-- Modal del Carrito -->
    <div class="fixed right-0 top-0 h-full w-full max-w-sm bg-gray-200 border-l-4 border-black shadow-[-10px_0px_0px_0px_rgba(0,0,0,1)] flex flex-col p-6 overflow-hidden transition-transform duration-300 animate-slide-left"
         @click.stop>

      <!-- Cabecera -->
      <div class="flex justify-between items-start mb-6 border-b-4 border-black pb-4">
        <div>
          <h2 class="text-2xl font-bold font-serif text-[#1a1625]">
            Carrito de Compras  ({{ carritoStore.cantidadLibros }})
          </h2>
          <p class="text-gray-600 font-bold mt-1 uppercase text-xs tracking-widest">
            Revisa los artículos antes de pagar.
          </p>
        </div>
        <button @click="carritoStore.toggleCarrito"
                class="bg-black text-white w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors border-2 border-black">
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <!-- Lista de Libros  -->
      <div class="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <div v-if="carritoStore.items.length === 0" class="text-center py-20 border-2 border-dashed border-black rounded-lg bg-gray-300">
          <i class="pi pi-shopping-bag text-5xl mb-4 block opacity-20"></i>
          <p class="font-bold text-gray-500 italic font-serif">El carrito está vacío</p>
        </div>

        <div v-for="libro in carritoStore.items" :key="libro.id"
             class="bg-white border-2 border-black p-3 flex gap-4 items-center group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">

          <div class="w-16 h-16 bg-gray-300 border border-black flex-shrink-0 overflow-hidden">
            <img :src="getImageUrl(libro.url_imagen)" class="w-full h-full object-cover" />
          </div>

          <div class="flex-grow">
            <h3 class="font-bold font-serif text-lg leading-tight line-clamp-1">{{ libro.titulo }}</h3>
            <p class="text-gray-600 text-xs font-bold">{{ libro.autor?.nombre_completo }}</p>
            <p class="font-bold text-lg mt-1 text-black">${{ libro.precio_actual }}</p>
          </div>

          <button @click="carritoStore.eliminarLibro(libro.id)"
                  class="bg-gray-200 border-2 border-black w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
            <i class="pi pi-trash text-sm"></i>
          </button>
        </div>
      </div>

       <!-- Sección de Selección de Pago -->
      <div v-if="carritoStore.items.length > 0" class="mt-2 mb-2">
        <div class="mt-auto pt-3 border-t-4 border-black"></div>
        <p class="font-bold font-serif text-lg mb-2 uppercase">
          Selecciona Método de Pago:
        </p>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="metodo in carritoStore.metodosPagos"
            :key="metodo.id"
            @click="carritoStore.setMetodoPago(metodo.id)"
            class="p-1 border-2 border-black font-bold text-xs uppercase transition-all duration-200"
            :class="carritoStore.pagoSeleccionado === metodo.id ? 'bg-black text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100'">
            {{ metodo.nombre }}
          </button>
        </div>
      </div>

      <!-- Footer Subtotal y Pago -->
      <div class="mt-auto pt-3 border-t-4 border-black">
        <div class="flex justify-between items-center mb-6">
          <span class="text-2xl font-bold font-serif">Subtotal:</span>
          <span class="text-2xl font-bold text-black">${{ carritoStore.totalPagar}}</span>
        </div>
        <button
          :disabled="!carritoStore.cantidadLibros > 0 || !carritoStore.pagoSeleccionado"
          class="w-full bg-[#1a1625] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 text-white py-2 border-2 border-black font-bold text-xl uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:bg-black">
          Proceder al Pago
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCarritoStore } from '@/stores/carritoStore'

onMounted(() => {
  carritoStore.fetchMetodosPagos(); // Pedimos los métodos al backend
})
const carritoStore = useCarritoStore()

const getImageUrl = (url) => `http://localhost:8000/${url}`
</script>

<style scoped>
.font-serif {
  font-family: 'Times New Roman', Times, serif;
}

.animate-slide-left {
  animation: slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideLeft {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #e5e7eb;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 10px;
}
</style>
