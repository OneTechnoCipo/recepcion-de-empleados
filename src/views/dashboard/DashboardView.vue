<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
      Vista del Dashboard
    </h1>
    
    <SummaryCards
      :total-employees="totalEmployees"
      :present-today="presentToday"
      :absent-today="absentToday"
      :total-late="totalLate"
    />

    <p class="text-gray-700 dark:text-gray-300">
      Bienvenido al Dashboard. Aquí encontrarás un resumen de la actividad reciente.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SummaryCards from '../../components/dashboard/SummaryCards.vue';
import { employees } from '../../data/employees';
import { attendanceRecords } from '../../data/attendance';

const today = '2023-10-26';

const totalEmployees = ref(employees.length);

const todayRecords = attendanceRecords.filter(r => r.date === today);
const presentToday = ref(todayRecords.length);
const absentToday = ref(employees.length - todayRecords.length);

// Simplificación: consideramos "llegada tarde" si la hora de entrada es mayor a las 09:00
const totalLate = ref(todayRecords.filter(r => r.checkIn > '09:00').length);
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
</style>