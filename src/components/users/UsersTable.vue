<template>
  <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hidden md:block">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-50/50 dark:bg-gray-700/30 text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 select-none">
          
          <th @click="$emit('sort', 'id')" class="p-4 font-semibold text-sm uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors group">
            <div class="flex items-center gap-1">
              DNI
              <Icon v-if="sortKey === 'id'" :icon="sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-4 h-4 text-blue-600" />
              <Icon v-else icon="heroicons:chevron-up-down" class="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </th>

          <th @click="$emit('sort', 'name')" class="p-4 font-semibold text-sm uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors group">
            <div class="flex items-center gap-1">
              Empleado
              <Icon v-if="sortKey === 'name'" :icon="sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-4 h-4 text-blue-600" />
              <Icon v-else icon="heroicons:chevron-up-down" class="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </th>

          <th @click="$emit('sort', 'email')" class="p-4 font-semibold text-sm uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors group">
            <div class="flex items-center gap-1">
              Email
              <Icon v-if="sortKey === 'email'" :icon="sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-4 h-4 text-blue-600" />
              <Icon v-else icon="heroicons:chevron-up-down" class="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </th>

          <th @click="$emit('sort', 'sector')" class="p-4 font-semibold text-sm uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors group">
            <div class="flex items-center gap-1">
              Puesto / Sector
              <Icon v-if="sortKey === 'sector'" :icon="sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-4 h-4 text-blue-600" />
              <Icon v-else icon="heroicons:chevron-up-down" class="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </th>

          <th @click="$emit('sort', 'hours')" class="p-4 font-semibold text-sm uppercase tracking-wider cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors group">
            <div class="flex items-center gap-1">
              Horas
              <Icon v-if="sortKey === 'hours'" :icon="sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-4 h-4 text-blue-600" />
              <Icon v-else icon="heroicons:chevron-up-down" class="w-4 h-4 text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </th>

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
          <td class="p-4 text-gray-700 dark:text-gray-300 text-sm font-mono">{{ user.standardWorkHours }}h</td>
          
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
import { Icon } from '@iconify/vue';
import type { Employee } from '../../models/CustomModels';
import type { UserSortKey, SortOrder } from '../../composables/useUsers';
import { RouterLink } from 'vue-router';

defineProps<{ 
  users: Employee[];
  sortKey: UserSortKey;
  sortOrder: SortOrder;
}>();

defineEmits<{
  (e: 'sort', key: UserSortKey): void;
  (e: 'edit', user: Employee): void;
  (e: 'delete', id: number): void;
}>();
</script>