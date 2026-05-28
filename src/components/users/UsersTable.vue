<template>
  <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow hidden md:block">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">
          <th class="p-4 font-semibold">ID</th>
          <th class="p-4 font-semibold">Nombre</th>
          <th class="p-4 font-semibold">Email</th>
          <th class="p-4 font-semibold text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="user in users" 
          :key="user.id" 
          class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <td class="p-4 text-gray-900 dark:text-gray-100">{{ user.id }}</td>
          <td class="p-4 text-gray-900 dark:text-gray-100 font-medium">{{ user.name }}</td>
          <td class="p-4 text-gray-600 dark:text-gray-400">{{ user.email }}</td>
          <td class="p-4 text-right space-x-2">
            <button @click="$emit('edit', user)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">Editar</button>
            <button @click="$emit('delete', user.id)" class="text-red-600 hover:text-red-800 dark:text-red-400 font-medium">Eliminar</button>
          </td>
        </tr>
        
        <tr v-if="users.length === 0">
          <td colspan="4" class="p-8 text-center text-gray-500 dark:text-gray-400">
            No se encontraron usuarios.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../../models/CustomModels';

// Props tipadas estrictamente
defineProps<{
  users: User[]
}>();

// Emits tipados
defineEmits<{
  (e: 'edit', user: User): void
  (e: 'delete', id: number): void
}>();
</script>