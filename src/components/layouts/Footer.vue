<template>
  <footer class="mt-auto border-t border-purple-900" style="background-color: #1B1226;">
    <div class="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6">

      <!-- Logo y descripcion -->
      <div class="flex flex-col items-center md:items-start gap-2">
        <div class="flex items-center gap-2 text-xl font-bold text-white">
          <i class="pi pi-book text-purple-400 text-2xl"></i>
          <span>ReadBooks</span>
        </div>
      </div>

      <!-- Links -->
      <div class="flex items-center gap-6 text-sm text-purple-300">
        <a href="#" class="hover:text-white transition">Lectura</a>
        <a href="#" class="hover:text-white transition">Cultura</a>
        <a href="#" class="hover:text-white transition">Conocimiento</a>
      </div>

      <!-- Redes sociales -->
      <div class="flex items-center gap-4 text-purple-300">
        <a href="#" class="hover:text-white transition text-lg"><i class="pi pi-facebook"></i></a>
        <a href="#" class="hover:text-white transition text-lg"><i class="pi pi-twitter"></i></a>
        <a href="#" class="hover:text-white transition text-lg"><i class="pi pi-instagram"></i></a>
      </div>

    </div>

    <!-- Linea de copyright -->
    <div class="border-t border-purple-900 py-4 text-center text-purple-400 text-xs">
      © 2026 ReadBooks — Todos los derechos reservados
    </div>
  </footer>
</template>

<script setup>
import 'primeicons/primeicons.css'
</script>
