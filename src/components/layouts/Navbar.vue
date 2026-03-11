<template>
  <nav class="fixed w-full z-50 top-0 left-0 border-b border-purple-900" style="background-color: #1B1226;">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">

      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 text-xl font-bold text-white shrink-0">
        <i class="pi pi-book text-purple-400 text-2xl"></i>
        <span>ReadBooks</span>
      </router-link>

      <!-- Links principales -->
      <div class="hidden md:flex items-center gap-6">
        <router-link to="/catalogo" class="text-purple-300 hover:text-white transition font-medium text-sm">
          Catalogo
        </router-link>
        <router-link to="/mi-biblioteca" class="text-purple-300 hover:text-white transition font-medium text-sm">
          Mi Biblioteca
        </router-link>
      </div>

      <!-- Acciones derecha -->
      <div class="hidden md:flex items-center gap-3 ml-auto">

        <!-- Carrito -->
        <router-link to="/carrito" class="text-purple-300 hover:text-white hover:bg-purple-900 transition p-2 rounded-full text-lg flex items-center">
          <i class="pi pi-shopping-cart"></i>
        </router-link>

        <!-- Toggle tema -->
        <button @click="toggleTema" class="text-purple-300 hover:text-white hover:bg-purple-900 transition p-2 rounded-full flex items-center">
          <i :class="oscuro ? 'pi pi-sun' : 'pi pi-moon'"></i>
        </button>

        <!-- Iniciar sesion -->
        <router-link to="/login" class="flex items-center gap-1 px-4 py-1.5 border border-purple-400 rounded-lg text-purple-400 hover:bg-purple-900 transition text-sm font-semibold">
          <i class="pi pi-sign-in"></i>
          Iniciar Sesion
        </router-link>

        <!-- Registrarse -->
        <router-link to="/registro" class="flex items-center gap-1 px-4 py-1.5 bg-purple-500 hover:bg-purple-700 transition rounded-lg text-white text-sm font-semibold">
          <i class="pi pi-user-plus"></i>
          Registrarse
        </router-link>
      </div>

      <!-- Hamburger mobile -->
      <button @click="menuAbierto = !menuAbierto" class="md:hidden ml-auto text-purple-300 text-2xl focus:outline-none">
        <i :class="menuAbierto ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>
    </div>

    <!-- Menu mobile -->
    <transition name="slide">
      <div v-if="menuAbierto" class="md:hidden border-t border-purple-900 px-6 py-6 flex flex-col gap-4" style="background-color: #1B1226;">
        <router-link to="/catalogo" @click="menuAbierto = false" class="text-purple-300 hover:text-white transition font-medium flex items-center gap-2">
          <i class="pi pi-th-large"></i> Catalogo
        </router-link>
        <router-link to="/mi-biblioteca" @click="menuAbierto = false" class="text-purple-300 hover:text-white transition font-medium flex items-center gap-2">
          <i class="pi pi-bookmark"></i> Mi Biblioteca
        </router-link>

        <div class="flex flex-col gap-3 pt-4 border-t border-purple-900">
          <router-link to="/login" @click="menuAbierto = false" class="flex items-center justify-center gap-2 px-4 py-2 border border-purple-400 rounded-lg text-purple-400 hover:bg-purple-900 transition text-sm font-semibold">
            <i class="pi pi-sign-in"></i> Iniciar Sesion
          </router-link>
          <router-link to="/registro" @click="menuAbierto = false" class="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-700 transition rounded-lg text-white text-sm font-semibold">
            <i class="pi pi-user-plus"></i> Registrarse
          </router-link>
        </div>
      </div>
    </transition>
  </nav>

  <!-- Espaciado para que el contenido no quede debajo del navbar -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref } from 'vue'
import 'primeicons/primeicons.css'

const menuAbierto = ref(false)
const oscuro = ref(false)

const toggleTema = () => {
  oscuro.value = !oscuro.value
  document.documentElement.classList.toggle('dark', oscuro.value)
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
