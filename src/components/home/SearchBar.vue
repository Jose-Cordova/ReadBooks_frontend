<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-4 items-center">
      <!-- Input de Búsqueda -->
      <div class="relative flex-grow w-full">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-black">
          <i class="pi pi-search"></i>
        </span>
        <input
          v-model="search"
          type="text"
          placeholder="Search"
          class="w-full pl-10 pr-4 py-3 bg-[#e5e7eb] border-2 border-black focus:outline-none"
        />
      </div>

      <!-- Dropdown de Categorías -->
      <div class="w-full md:w-64">
        <Dropdown
          v-model="selectedCategoria"
          :options="librosStore.categorias"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Categorias"
          showClear
          class="w-full h-[54px] border-2 border-white rounded-xl shadow-sm"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useLibrosStore } from '@/stores/librosStore'
import Dropdown from 'primevue/dropdown'

const librosStore = useLibrosStore()

const search = computed({
  get: () => librosStore.searchQuery,
  set: (value) => librosStore.setSearch(value)
})

const selectedCategoria = computed({
  get: () => librosStore.selectedCategoria,
  set: (value) => librosStore.setCategoria(value)
})

onMounted(() => {
  librosStore.fetchCategorias()
})
</script>

<style scoped>
:deep(.p-dropdown) {
  background: #1a1625;
  border-radius: 12px;
  display: flex;
  align-items: center;
}
:deep(.p-dropdown-label) {
  padding-left: 1rem;
  color: white;
}
</style>
