<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div
      v-for="(card, index) in summaryCards"
      :key="index"
      class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
            {{ card.title }}
          </p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {{ card.value }}
          </p>
        </div>
        <div class="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
          <!-- Icon placeholder -->
          <span class="text-blue-600 dark:text-blue-300">
            {{ card.icon }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface SummaryCard {
  title: string;
  value: string | number;
  icon: string;
}

const props = defineProps<{
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  totalLate: number;
}>();

const summaryCards = computed<SummaryCard[]>(() => [
  { title: 'Total Empleados', value: props.totalEmployees, icon: '👥' },
  { title: 'Presentes hoy', value: props.presentToday, icon: '✅' },
  { title: 'Ausentes hoy', value: props.absentToday, icon: '❌' },
  { title: 'Llegadas tarde', value: props.totalLate, icon: '⏳' },
]);
</script>
