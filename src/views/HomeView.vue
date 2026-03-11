<template>
  <div class="bg-gray-200 min-h-screen flex flex-col">
    <NavBar />
    <HeroCatalogo />
    <SearchBar />
    <LibroGrid />

  </div>
</template>

<script setup>
  import HeroCatalogo from "@/components/home/HeroCatalogo.vue";
  import SearchBar from "@/components/home/SearchBar.vue";
  import LibroGrid from "@/components/home/LibroGrid.vue";
  import NavBar from '@/components/layouts/Navbar.vue'


</script>
