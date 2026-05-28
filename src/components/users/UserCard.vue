<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-bold text-gray-900 dark:text-white text-lg">{{ user.name }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ user.email }}</p>
      </div>
      <span class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded font-mono">
        ID: {{ user.id }}
      </span>
    </div>
    
    <div class="flex justify-end gap-3 mt-2 pt-2 border-t dark:border-gray-700">
      <button @click="$emit('edit', user)" class="text-sm text-blue-600 dark:text-blue-400 font-medium">Editar</button>
      <button @click="$emit('delete', user.id)" class="text-sm text-red-600 dark:text-red-400 font-medium">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../../models/CustomModels';

defineProps<{
  user: User
}>();

defineEmits<{
  (e: 'edit', user: User): void
  (e: 'delete', id: number): void
}>();
</script>