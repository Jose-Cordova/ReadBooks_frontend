<template>
  <div class="bg-gray-200 min-h-screen flex flex-col">
    <Navbar />
    <HeroCatalogo />
    <SearchBar />
    <LibroGrid />
    <CarritoModal />
    <Footer />
  </div>
</template>

<script setup>
  import Navbar from "@/components/layouts/Navbar.vue";
  import HeroCatalogo from "@/components/home/HeroCatalogo.vue";
  import SearchBar from "@/components/home/SearchBar.vue";
  import LibroGrid from "@/components/home/LibroGrid.vue";
  import CarritoModal from "@/components/home/CarritoModal.vue";
  import Footer from "@/components/layouts/Footer.vue"
</script>
