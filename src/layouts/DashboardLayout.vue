<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { Icon } from '@iconify/vue';

// Defines the main dashboard visual grid wrapper, 
// organizing the main shell container and dynamic slot sections.

const isMobileMenuOpen = ref(false);

// Toggles the structural visibility state for the slide-out navigation bar on mobile screen layouts
const toggleMobileMenu = () => { 
  isMobileMenuOpen.value = !isMobileMenuOpen.value; 
};
</script>

<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <aside
      class="w-64 bg-gray-800 text-white p-4 space-y-6 shrink-0 transition-all duration-300"
      :class="{ 'hidden md:block': !isMobileMenuOpen, 'block absolute inset-y-0 z-20': isMobileMenuOpen }"
    >
      <div class="text-xl font-bold text-center py-4 border-b border-gray-700">
        Sistema de Asistencia
      </div>
      
      <nav class="space-y-2">
        <RouterLink to="/dashboard" class="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-gray-700/50">
          <Icon icon="heroicons:squares-2x2" class="w-5 h-5" />
          Dashboard
        </RouterLink>

        <RouterLink to="/attendance" class="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-gray-700/50">
          <Icon icon="heroicons:clipboard-document-check" class="w-5 h-5" />
          Asistencia
        </RouterLink>

        <RouterLink to="/users" class="flex items-center gap-3 py-2.5 px-4 rounded-lg hover:bg-gray-700/50">
          <Icon icon="heroicons:user-group" class="w-5 h-5" />
          Usuarios
        </RouterLink>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm md:hidden">
        <div class="font-bold text-gray-800 dark:text-white">Sistema de Asistencia</div>
        <button @click="toggleMobileMenu" class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 rounded-lg">
          <Icon icon="heroicons:bars-3" class="w-6 h-6" />
        </button>
      </header>

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>