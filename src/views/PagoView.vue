<template>
  <div class="min-h-screen bg-gray-200 pb-12">
    <Navbar />
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Encabezado -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold font-serif text-[#1a1625]">Pagar</h1>
        <p class="text-gray-600 font-bold uppercase text-xs tracking-widest mt-2">Completa tu compra</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Información de Pago -->
         <div class="bg-gray-100 border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 class="text-3xl font-bold font-serif mb-2">Información de pago</h2>
          <p class="text-gray-600 font-medium mb-8">Ingresa tus detalles de pago a continuación.</p>
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-bold mb-2" >NOMBRE DE LA TARGETA</label>
              <input type="text" class="w-full p-3 border-2 border-black bg-gray-50 focus:outline-none focus:bg-white transition-colors">
            </div>
            <div>
              <label class="block text-sm font-bold mb-2">NÚMERO DE TARGETA</label>
              <input type="text" class="w-full p-3 border-2 border-black bg-gray-50 focus:outline-none focus:bg-white transition-colors" placeholder="0000 0000 0000 0000">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold mb-2" >VENCIMIENTO</label>
                <input type="text" class="w-full p-3 border-2 border-black bg-gray-50 focus:outline-none focus:bg-white transition-colors" placeholder="MM/AA">
              </div>
              <div>
                <label class="block text-sm font-bold mb-2">CVC</label>
                <input type="text" class="w-full p-3 border-2 border-black bg-gray-50 focus:outline-none focus:bg-white transition-colors" placeholder="000">
              </div>
            </div>
            <button type="submit" class="w-full bg-[#1a1625] text-white py-4 border-2 border-black font-bold text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95 mt-4">
              Pagar ${{ carritoStore.totalPagar.toFixed(2) }}
            </button>
          </form>
         </div>
         <!-- Resumen del Pedido -->
         <div class="bg-gray-100 border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 class="text-3xl font-bold font-serif mb-2" >Resumen del Pedido</h2>
          <p class="text-gray-600 font-medium mb-4">Estás comprando {{ carritoStore.cantidadLibros }} artículo(s).</p>
          <!-- Lista de Libros -->
          <div class="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="libro in carritoStore.items" :key="libro.id" class="flex gap-4 items-center bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div class="w-20 h-20 bg-gray-300 border border-black flex-shrink-0">
                <img :src="getImageUrl(libro.url_imagen)" class="w-full h-full object-cover">
              </div>
              <div class="flex-grow">
                <h3 class="font-bold text-xl leading-tight">{{ libro.titulo }}</h3>
                <p class="text-xl font-bold text-blue-600 mt-1">{{ libro.autor?.nombre_completo }}</p>
                <p class="font-black text-right ">${{ libro.precio_actual }}</p>
              </div>
            </div>
          </div>
          <!-- Total Final -->
          <div class="mt-8 pt-6 border-t-4 border-black">
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold">Total</span>
              <span class="text-3xl font-black">${{ carritoStore.totalPagar.toFixed(2) }}</span>
            </div>
          </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Navbar from '@/components/layouts/Navbar.vue';
  import { useCarritoStore } from '@/stores/carritoStore';

  const carritoStore = useCarritoStore()

  const getImageUrl = (url) => `http://localhost:8000/${url}`
</script>

<style scoped>
.font-serif{
  font-family:'Times New Roman', Times, serif;
}
.custom-scrollbar::-webkit-scrollbar{
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track{
  background: #e5e7eb;
}
.custom-scrollbar::-webkit-scrollbar-thumb{
  background: #000;
}
</style>
