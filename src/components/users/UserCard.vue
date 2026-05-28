<template>
  <div class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 transition-all hover:shadow-md">
    <!-- Encabezado con Info de Usuario -->
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-bold text-gray-900 dark:text-white text-lg leading-tight">
          {{ user.firstName }} {{ user.lastName }}
        </h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5 flex items-center gap-1">
          <Icon icon="heroicons:identification" class="w-3.5 h-3.5" />
          DNI: {{ user.id }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
          <Icon icon="heroicons:envelope" class="w-4 h-4 text-gray-400" />
          {{ user.email }}
        </p>
      </div>
    </div>
    
    <!-- Bloque de datos técnicos -->
    <div class="text-sm bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg flex flex-col gap-1.5">
      <div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Icon icon="heroicons:briefcase" class="w-4 h-4 text-gray-400" />
        <span>{{ user.role }} <span class="text-gray-500 text-xs">({{ user.sector }})</span></span>
      </div>
      <div class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Icon icon="heroicons:clock" class="w-4 h-4 text-gray-400" />
        <span>{{ user.standardWorkHours }} hs base</span>
      </div>
    </div>
    
    <!-- Acciones con Iconos -->
    <div class="flex justify-end gap-3 mt-1 pt-3 border-t dark:border-gray-700">
      <RouterLink :to="'/users/' + user.id" class="text-gray-500 hover:text-green-600 transition-colors">
        <Icon icon="heroicons:eye" class="w-5 h-5" />
      </RouterLink>
      <button @click="$emit('edit', user)" class="text-gray-500 hover:text-blue-600 transition-colors">
        <Icon icon="heroicons:pencil-square" class="w-5 h-5" />
      </button>
      <button @click="$emit('delete', user.id)" class="text-gray-500 hover:text-red-600 transition-colors">
        <Icon icon="heroicons:trash" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Employee } from '../../models/CustomModels';
import { RouterLink } from 'vue-router';

defineProps<{ user: Employee }>();
defineEmits<{
  (e: 'edit', user: Employee): void;
  (e: 'delete', id: number): void;
}>();
</script>