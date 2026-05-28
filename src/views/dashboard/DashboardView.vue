<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Principal</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Resumen general del sistema de empleados y asistencia.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Total Empleados</h3>
          <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ totalEmployees }}</p>
        </div>
        <Icon icon="heroicons:user-group" class="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Sectores Únicos</h3>
          <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ totalSectors }}</p>
        </div>
        <Icon icon="heroicons:briefcase" class="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>

      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">Horas Base Totales</h3>
          <p class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ totalStandardHours }} hs</p>
        </div>
        <Icon icon="heroicons:clock" class="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div class="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
        <Icon icon="heroicons:user-plus" class="w-5 h-5 text-gray-400" />
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Últimos Empleados en el Sistema</h2>
      </div>
      <ul class="divide-y divide-gray-100 dark:divide-gray-700 p-2">
        <li v-for="emp in recentEmployees" :key="emp.id" class="py-4 px-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <div class="flex items-center gap-4">
             <div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500">
               <Icon icon="heroicons:user" class="w-5 h-5" />
             </div>
             <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ emp.firstName }} {{ emp.lastName }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ emp.role }} - {{ emp.sector }}</p>
             </div>
          </div>
          <RouterLink :to="{ name: 'UserDetail', params: { id: emp.id } }" class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium flex items-center gap-1">
            Ver Ficha <Icon icon="heroicons:arrow-right" class="w-4 h-4" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
import { employees } from '../../data/employees';

const totalEmployees = computed(() => employees.value.length);
const totalSectors = computed(() => new Set(employees.value.map(emp => emp.sector)).size);
const totalStandardHours = computed(() => employees.value.reduce((acc, emp) => acc + emp.standardWorkHours, 0));
const recentEmployees = computed(() => [...employees.value].reverse().slice(0, 3));
</script>