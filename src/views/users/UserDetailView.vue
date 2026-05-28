<template>
  <div v-if="user" class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
        <Icon icon="heroicons:arrow-left" class="w-6 h-6" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Ficha de Empleado</h1>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div class="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      
      <div class="px-8 pb-8">
        <div class="relative -mt-12 mb-6">
          <div class="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center text-gray-400">
            <Icon icon="heroicons:user-solid" class="w-12 h-12" />
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">{{ user.firstName }} {{ user.lastName }}</h2>
            <p class="text-blue-600 dark:text-blue-400 font-medium">{{ user.role }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Icon icon="heroicons:identification" class="w-5 h-5 text-gray-400" />
                <span>DNI: {{ user.id }}</span>
              </div>
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Icon icon="heroicons:envelope" class="w-5 h-5 text-gray-400" />
                <span>{{ user.email }}</span>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Icon icon="heroicons:briefcase" class="w-5 h-5 text-gray-400" />
                <span>Sector: {{ user.sector }}</span>
              </div>
              <div class="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Icon icon="heroicons:clock" class="w-5 h-5 text-gray-400" />
                <span>{{ user.standardWorkHours }} hs base</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center p-12 text-gray-500">Empleado no encontrado.</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { employees } from '../../data/employees';

const route = useRoute();
const employeeId = computed(() => Number(route.params.id));
const user = computed(() => employees.value.find(e => e.id === employeeId.value));
</script>