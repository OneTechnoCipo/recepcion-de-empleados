<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div
      v-for="(card, index) in summaryCards"
      :key="index"
      class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
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
        
        <div class="text-gray-400 dark:text-gray-500">
          <Icon 
            :icon="card.icon" 
            class="w-8 h-8" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue'; 

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
  { 
    title: 'Total Empleados', 
    value: props.totalEmployees, 
    icon: 'heroicons:user-group' 
  },
  { 
    title: 'Presentes hoy', 
    value: props.presentToday, 
    icon: 'heroicons:user-check' 
  },
  { 
    title: 'Ausentes hoy', 
    value: props.absentToday, 
    icon: 'heroicons:user-x' 
  },
  { 
    title: 'Llegadas tarde', 
    value: props.totalLate, 
    icon: 'heroicons:clock' 
  },
]);
</script>