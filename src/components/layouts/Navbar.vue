<template>
  <nav class="fixed w-full z-50 top-0 left-0 border-b border-purple-900 bg-[#1B1226]">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">

      <!-- Logo -->
      <router-link class="flex items-center gap-2 text-xl font-bold text-white shrink-0">
        <i class="pi pi-book text-purple-400 text-2xl"></i>
        <span>ReadBooks</span>
      </router-link>

      <!-- Links principales -->
      <div class="hidden md:flex items-center gap-6">
        <router-link to="/" class="text-purple-300 hover:text-white transition font-medium text-sm">
          Catalogo
        </router-link>
        <router-link v-if="authStore.isAuthenticated && authStore.isCliente"
          to="/mi-biblioteca" class="text-purple-300 hover:text-white transition font-medium text-sm">
          Mi Biblioteca
        </router-link>
      </div>

      <!-- Acciones derecha -->
      <div class="hidden md:flex items-center gap-3 ml-auto">

        <!-- Carrito -->
        <div v-if="authStore.isAuthenticated && authStore.isCliente" class="relative inline-block">
          <button @click="carritoStore.toggleCarrito()"
                  class="text-purple-300 hover:text-white hover:bg-purple-900 transition p-2 rounded-full text-lg flex items-center">
            <i class="pi pi-shopping-cart"></i>
          </button>

          <!-- El Contador (Burbuja) -->
          <span v-if="carritoStore.cantidadLibros > 0"
                class="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2
          border-[#1B1226] animate-bounce-once">
            {{ carritoStore.cantidadLibros }}
          </span>
        </div>

        <!-- Toggle tema -->
        <button @click="toggleTema" class="text-purple-300 hover:text-white hover:bg-purple-900 transition p-2 rounded-full flex items-center">
          <i :class="oscuro ? 'pi pi-sun' : 'pi pi-moon'"></i>
        </button>

        <!-- Sesión de usuario -->
        <div v-if="!authStore.isAuthenticated" class="flex gap-3">
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

        <div v-else>
          <!-- Perfil del usuario -->
          <div class="flex items-center gap-4 border-l border-purple-900 pl-3 ml-2">
            <div class="flex items-center border-2 border-black bg-gray-400 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div class="px-2 py-1 border-r-2 border-black bg-gray-200">
                <i class="pi pi-user text-black text-sm"></i>
              </div>
              <div class="px-3">
                <span class="text-1xl font-bold text-black tracking-widest font-serif">{{ authStore.user?.name }}</span>
              </div>
            </div>
            <button @click="authStore.logout()" class="flex items-center gap-1 px-4 py-1.5 bg-purple-700 hover:bg-purple-900 transition rounded-lg text-white text-sm font-semibold">
              <i class="pi pi-sign-out"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <!-- Hamburger mobile -->
      <button @click="menuAbierto = !menuAbierto" class="md:hidden ml-auto text-purple-300 text-2xl focus:outline-none">
        <i :class="menuAbierto ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>
    </div>

    <!-- Menu mobile -->
    <transition name="slide">
      <div v-if="menuAbierto" class="md:hidden border-t border-purple-900 px-6 py-6 flex flex-col gap-4 bg-[#1B1226]">
        <router-link to="/" @click="menuAbierto = false" class="text-purple-300 hover:text-white transition font-medium flex items-center gap-2">
          <i class="pi pi-th-large"></i> Catalogo
        </router-link>
        <router-link to="/mi-biblioteca" @click="menuAbierto = false" class="text-purple-300 hover:text-white transition font-medium flex items-center gap-2">
          <i class="pi pi-bookmark"></i> Mi Biblioteca
        </router-link>
        <!-- Carrito -->
        <div v-if="authStore.isAuthenticated && authStore.isCliente" class="relative inline-block">
          <button @click="carritoStore.toggleCarrito()"
                  class="text-purple-300 hover:text-white hover:bg-purple-900 transition p-2 rounded-full text-lg flex items-center">
            <i class="pi pi-shopping-cart"></i>
          </button>

          <!-- El Contador (Burbuja) -->
          <span v-if="carritoStore.cantidadLibros > 0"
                class="absolute -top-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2
          border-[#1B1226] animate-bounce-once">
            {{ carritoStore.cantidadLibros }}
          </span>
        </div>

                <!-- Toggle tema -->
        <button @click="toggleTema" class="text-purple-300 hover:text-white hover:bg-purple-900 transition p-2 rounded-full flex items-center">
          <i :class="oscuro ? 'pi pi-sun' : 'pi pi-moon'"></i>
        </button>

        <!-- Sesión de usuario -->
        <div v-if="!authStore.isAuthenticated" class="flex gap-3">
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

        <div v-else>
          <!-- Perfil del usuario -->
          <div class="flex items-center gap-4 border-l border-purple-900 pl-3 ml-2">
            <div class="flex items-center border-2 border-black bg-gray-400 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div class="px-2 py-1 border-r-2 border-black bg-gray-200">
                <i class="pi pi-user text-black text-sm"></i>
              </div>
              <div class="px-3">
                <span class="text-1xl font-bold text-black tracking-widest font-serif">{{ authStore.user?.name }}</span>
              </div>
            </div>
            <button @click="authStore.logout()" class="flex items-center gap-1 px-4 py-1.5 bg-purple-700 hover:bg-purple-900 transition rounded-lg text-white text-sm font-semibold">
              <i class="pi pi-sign-out"></i>
              Cerrar Sesión
            </button>
          </div>
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
import { useCarritoStore } from '@/stores/carritoStore'
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const carritoStore = useCarritoStore();
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
.animate-bounce-once{
   animation: bounceOnce 0.5s cubic-bezier(0.36, 0, 0.66, -0.56) iteration-count 1;
}
@keyframes bounceOnce {
  0%, 100% {transform: scale(1);}
  50% {transform: scale(1.3);}
}
.font-serif {
  font-family: 'Times New Roman', Times, serif;
}
</style>
