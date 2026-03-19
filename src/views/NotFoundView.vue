<template>
  <div class="min-h-screen bg-gray-200 flex flex-col items-center justify-center px-4">
    <div class="bg-white border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center max-w-lg">
      <h1 class="text-9xl font-black font-serif mb-4">404</h1>
      <h2 class="text-2xl font-bold uppercase tracking-tighter mb-6 border-b-4 border-black pb-2">
        Página no encontrada
      </h2>
      <p class="text-gray-600 font-medium mb-10 leading-relaxed">
        Parece que te has perdido entre las estanterías. El libro o la página que buscas no existe en nuestra biblioteca.
      </p>
      
      <router-link to="/" class="inline-block bg-[#1a1625] text-white px-8 py-4 border-2 border-black font-bold text-lg transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95">
        Volver al Inicio
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.font-serif {
  font-family: 'Times New Roman', Times, serif;
}
</style>
