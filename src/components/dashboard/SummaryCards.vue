<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div
      v-for="(card, index) in summaryCards"
      :key="index"
      class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
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
        
        <!-- REMOVIDO EL CÍRCULO AZUL: Ahora es un contenedor transparente que solo posiciona el ícono -->
        <div class="p-1">
          <!-- Componente Iconify dinámico usando el color de cada tarjeta -->
          <Icon 
            :icon="card.icon" 
            :class="['w-7 h-7', card.iconClass]" 
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
  iconClass: string; // Nueva propiedad para manejar el color individual del ícono
}

const props = defineProps<{
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  totalLate: number;
}>();

// Definimos los iconos de Iconify y sus respectivos colores con clases de Tailwind
const summaryCards = computed<SummaryCard[]>(() => [
  { 
    title: 'Total Empleados', 
    value: props.totalEmployees, 
    icon: 'heroicons-outline:users', 
    iconClass: 'text-cyan-500 dark:text-cyan-400' 
  },
  { 
    title: 'Presentes hoy', 
    value: props.presentToday, 
    icon: 'lucide:user-check', 
    iconClass: 'text-green-500 dark:text-green-400' 
  },
  { 
    title: 'Ausentes hoy', 
    value: props.absentToday, 
    icon: 'lucide:user-x', 
    iconClass: 'text-red-500 dark:text-red-400' 
  },
  { 
    title: 'Llegadas tarde', 
    value: props.totalLate, 
    icon: 'heroicons-outline:clock', 
    iconClass: 'text-amber-500 dark:text-amber-400' 
  },
]);
</script>