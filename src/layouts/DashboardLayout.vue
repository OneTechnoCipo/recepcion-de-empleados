<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar - Escritorio -->
    <aside
      class="w-64 bg-gray-800 text-white p-4 space-y-4 shrink-0"
      :class="{ 'hidden md:block': !isMobileMenuOpen }"
    >
      <div class="text-2xl font-bold text-center">
        <!-- Título de la aplicación -->
        Sistema de Asistencia
      </div>
      <nav>
        <ul>
          <li>
            <RouterLink
              to="/dashboard"
              class="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/attendance"
              class="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Asistencia
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/users"
              class="block py-2 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Usuarios
            </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Encabezado móvil -->
      <header
        class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md md:hidden"
      >
        <div class="text-xl font-bold text-gray-800 dark:text-white">
          Sistema de Asistencia
        </div>
        <button @click="toggleMobileMenu" class="text-gray-600 dark:text-gray-300 focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </header>

      <!-- Contenido de la página -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

// Variable para controlar la visibilidad del menú móvil
const isMobileMenuOpen = ref(false);

// Función para alternar la visibilidad del menú móvil
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
</style>