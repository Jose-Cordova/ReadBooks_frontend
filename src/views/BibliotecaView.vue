<template>
  <div class="bg-gray-50 min-h-screen py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <HeroBiblioteca />
      <BibliotecaGrid />
    </div>
  </div>
</template>

<script setup>
import HeroBiblioteca from "@/components/home/HeroBiblioteca.vue"
import BibliotecaGrid from "@/components/home/BibliotecaGrid.vue"
</script>
