<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-3">
    <div class="flex justify-between items-start">
      <div>
        <span class="text-xs font-mono text-gray-500 dark:text-gray-400">DNI: {{ user.id }}</span>
        <h3 class="font-semibold text-gray-900 dark:text-white mt-0.5">
          {{ user.firstName }} {{ user.lastName }}
        </h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ user.email }}</p>
      </div>
      <span class="text-xs font-mono font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
        {{ user.standardWorkHours }}h
      </span>
    </div>

    <div class="border-t border-gray-100 dark:border-gray-700/50 pt-2 flex justify-between items-center">
      <div>
        <span class="text-xs font-medium text-gray-900 dark:text-gray-200 block">{{ user.role }}</span>
        <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ user.sector }}</span>
      </div>
      
      <div class="flex items-center gap-3">
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
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Employee } from '../../models/CustomModels';
import { RouterLink } from 'vue-router';

// Displays a summarized visual card profile for individual employees, 
// detailing their assigned sectors and personal information.

defineProps<{
  user: Employee;
}>();

// Defines reactive event emitters to communicate action payloads back to the parent view container
defineEmits<{
  (e: 'edit', user: Employee): void;
  (e: 'delete', id: number): void;
}>();
</script>