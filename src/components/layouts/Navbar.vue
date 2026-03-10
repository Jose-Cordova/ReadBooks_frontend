<template>
  <nav class="navbar">
    <div class="navbar-container">

      <!-- Logo -->
      <a href="#" class="navbar-logo">
        <i class="pi pi-book logo-icon"></i>
        <span class="logo-text"><strong>ReadBooks</strong></span>
      </a>

      <!-- Links principales -->
      <div class="navbar-links">
        <a href="#" class="nav-link">Catalogo</a>
        <a href="#" class="nav-link">Mi Biblioteca</a>
      </div>

      <!-- Acciones del lado derecho -->
      <div class="navbar-actions">

        <!-- Carrito -->
        <a href="#" class="cart-btn">
          <i class="pi pi-shopping-cart"></i>
        </a>

        <!-- Modo oscuro toggle -->
        <button class="icon-btn" @click="toggleTheme" :title="isDark ? 'Modo claro' : 'Modo oscuro'">
          <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'"></i>
        </button>

        <!-- Botones auth estáticos -->
        <a href="#" class="btn-outline">
          <i class="pi pi-sign-in"></i>
          Iniciar Sesion
        </a>
        <a href="#" class="btn-solid">
          <i class="pi pi-user-plus"></i>
          Registrarse
        </a>
      </div>

      <!-- Hamburger (mobile) -->
      <button class="hamburger" @click="isOpen = !isOpen">
        <i :class="isOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition name="slide">
      <div v-if="isOpen" class="mobile-menu">
        <a href="#" class="mobile-link">
          <i class="pi pi-th-large"></i> Catalogo
        </a>
        <a href="#" class="mobile-link">
          <i class="pi pi-bookmark"></i> Mi Biblioteca
        </a>

        <div class="mobile-auth">
          <a href="#" class="btn-outline full">
            <i class="pi pi-sign-in"></i> Iniciar Sesion
          </a>
          <a href="#" class="btn-solid full">
            <i class="pi pi-user-plus"></i> Registrarse
          </a>
        </div>
      </div>
    </transition>
  </nav>

  <div class="navbar-spacer"></div>
</template>

<script setup>
import { ref } from 'vue'
import 'primeicons/primeicons.css'

const isOpen = ref(false)
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<style scoped>
:root {
  --radius: 8px;
}

/* Navbar base */
.navbar {
background-color: #1B1226;
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar-spacer {
  height: 64px;
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.25rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.logo-icon {
  font-size: 1.4rem;
  color: #9b7fe8;
}

.logo-text strong {
  color: #ffffff;
  letter-spacing: -0.02em;
}

/* Nav links */
.navbar-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-shrink: 0;
}

.nav-link {
  text-decoration: none;
  color: #b0a8c8;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
  letter-spacing: 0.01em;
}

.nav-link:hover {
  color: #ffffff;
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
  flex-shrink: 0;
}

/* Carrito */
.cart-btn {
  text-decoration: none;
  font-size: 1.2rem;
  color: #b0a8c8;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 50%;
  transition: color 0.2s, background 0.2s;
}

.cart-btn:hover {
  color: #ffffff;
  background: rgba(155, 127, 232, 0.15);
}

/* Icon button tema */
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: #b0a8c8;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  transition: color 0.2s, background 0.2s;
}

.icon-btn:hover {
  color: #ffffff;
  background: rgba(155, 127, 232, 0.15);
}

/* Btn outline */
.btn-outline {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 6px 14px;
  border: 1.5px solid #9b7fe8;
  border-radius: var(--radius);
  color: #9b7fe8;
  font-size: 0.85rem;
  font-weight: 600;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
  font-family: inherit;
}

.btn-outline:hover {
  background: rgba(155, 127, 232, 0.15);
  color: #c4a8ff;
}

/* Btn solid */
.btn-solid {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 6px 16px;
  border-radius: var(--radius);
  background: #9b7fe8;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
  font-family: inherit;
}

.btn-solid:hover {
  background: #7c5fd4;
}

/* Hamburger */
.hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #b0a8c8;
  margin-left: auto;
  padding: 4px;
}

/* Mobile menu */
.mobile-menu {
  background: #1B1226;
}

.mobile-link {
  text-decoration: none;
  color: #b0a8c8;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.mobile-link:hover {
  color: #ffffff;
}

.mobile-auth {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-top: 0.5rem;
  border-top: 1px solid #2e1f45;
}

.full {
  width: 100%;
  justify-content: center;
}

/* Transición */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-links,
  .navbar-actions {
    display: none;
  }

  .hamburger {
    display: block;
  }
}
</style>
