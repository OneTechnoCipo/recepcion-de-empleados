<template>
  <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hidden md:block">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-50/50 dark:bg-gray-700/30 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
          <th class="p-4 font-semibold text-sm uppercase tracking-wider">DNI</th>
          <th class="p-4 font-semibold text-sm uppercase tracking-wider">Empleado</th>
          <th class="p-4 font-semibold text-sm uppercase tracking-wider">Email</th>
          <th class="p-4 font-semibold text-sm uppercase tracking-wider">Puesto / Sector</th>
          <th class="p-4 font-semibold text-sm uppercase tracking-wider">Horas</th>
          <th class="p-4 font-semibold text-sm uppercase tracking-wider text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
          <td class="p-4 text-gray-600 dark:text-gray-400 font-mono text-sm">{{ user.id }}</td>
          <td class="p-4">
            <div class="font-medium text-gray-900 dark:text-white">{{ user.firstName }} {{ user.lastName }}</div>
          </td>
          <td class="p-4 text-gray-600 dark:text-gray-400 text-sm">{{ user.email }}</td>
          <td class="p-4">
            <span class="text-sm text-gray-900 dark:text-gray-200 block">{{ user.role }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ user.sector }}</span>
          </td>
          <td class="p-4 text-gray-700 dark:text-gray-300 text-sm">{{ user.standardWorkHours }}h</td>
          
          <!-- Acciones con Iconos -->
          <td class="p-4 text-right space-x-2">
            <RouterLink :to="'/users/' + user.id" class="inline-flex items-center text-gray-500 hover:text-green-600 transition-colors">
              <Icon icon="heroicons:eye" class="w-5 h-5" />
            </RouterLink>
            <button @click="$emit('edit', user)" class="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors">
              <Icon icon="heroicons:pencil-square" class="w-5 h-5" />
            </button>
            <button @click="$emit('delete', user.id)" class="inline-flex items-center text-gray-500 hover:text-red-600 transition-colors">
              <Icon icon="heroicons:trash" class="w-5 h-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'; // Importar Iconify
import type { Employee } from '../../models/CustomModels';
import { RouterLink } from 'vue-router';

defineProps<{ users: Employee[] }>();
defineEmits<{
  (e: 'edit', user: Employee): void;
  (e: 'delete', id: number): void;
}>();
</script>