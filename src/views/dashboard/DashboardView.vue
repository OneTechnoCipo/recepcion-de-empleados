<template>
  <div class="space-y-6 p-4">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Vista del Dashboard
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Bienvenido al Dashboard. Aquí encontrarás un resumen de la actividad reciente.
      </p>
    </div>
    
    <SummaryCards
      :total-employees="totalEmployees"
      :present-today="presentToday"
      :absent-today="absentToday"
      :total-late="totalLate"
      :current-filter="currentFilter"
      @select-filter="updateFilter"
    />

    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold text-gray-800 dark:text-white">
           {{ filterTitle }}
        </h2>
        <span class="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-full">
          {{ filteredEmployees.length }} Encontrados
        </span>
      </div>

      <div v-if="filteredEmployees.length === 0" class="text-gray-400 dark:text-gray-500 italic py-8 text-center text-sm">
        No hay registros cargados para esta categoría en la jornada de hoy.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="text-gray-400 border-b border-gray-100 dark:border-gray-700 text-xs uppercase">
              <th class="py-3 font-semibold">Empleado</th>
              <th class="py-3 font-semibold">Puesto / Sector</th>
              <th class="py-3 font-semibold text-right">ID</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr 
              v-for="emp in filteredEmployees" 
              :key="emp.id" 
              class="text-gray-900 dark:text-gray-100 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700/50"
            >
              <td class="py-3 font-medium text-gray-900 dark:text-white">
                {{ emp.lastName }}, {{ emp.firstName }}
              </td>
              <td class="py-3 text-xs">
                <span class="block text-gray-800 dark:text-gray-200 font-medium">{{ emp.role }}</span>
                <span class="block text-gray-400 text-[11px]">{{ emp.sector }}</span>
              </td>
              <td class="py-3 text-right text-xs font-mono text-gray-400">
                {{ emp.id }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SummaryCards from '../../components/dashboard/SummaryCards.vue';
import { employees } from '../../data/employees';
import { attendanceRecords } from '../../data/attendance';
import type { Employee, AttendanceRecord } from '../../models/CustomModels';

const today = '2026-05-26';
const currentFilter = ref<string>('total');

// Contadores estáticos para las tarjetas
const totalEmployees = ref(employees.length);
const todayRecords = attendanceRecords.filter((r: AttendanceRecord) => r.date === today);
const presentToday = ref(todayRecords.length);
const absentToday = ref(employees.length - todayRecords.length);
const totalLate = ref(todayRecords.filter((r: AttendanceRecord) => r.checkIn > '09:00').length);

// Actualizar filtro seleccionado
const updateFilter = (filterId: string) => {
  currentFilter.value = filterId;
};

// Segmentación para la lógica de la tabla
const idPresentesHoy = computed(() => todayRecords.map((r: AttendanceRecord) => r.employeeId));
const idTardesHoy = computed(() => 
  todayRecords.filter((r: AttendanceRecord) => r.checkIn > '09:00').map((r: AttendanceRecord) => r.employeeId)
);

// Filtrado reactivo de la tabla
const filteredEmployees = computed<Employee[]>(() => {
  if (currentFilter.value === 'presentes') {
    return employees.filter((emp: Employee) => idPresentesHoy.value.includes(emp.id));
  }
  if (currentFilter.value === 'ausentes') {
    return employees.filter((emp: Employee) => !idPresentesHoy.value.includes(emp.id));
  }
  if (currentFilter.value === 'tardes') {
    return employees.filter((emp: Employee) => idTardesHoy.value.includes(emp.id));
  }
  return employees;
});

// Título adaptativo
const filterTitle = computed(() => {
  const titles: Record<string, string> = {
    total: 'Personal Registrado en el Sistema',
    presentes: 'Nómina de Personal Presente Hoy',
    ausentes: 'Nómina de Personal Ausente Hoy',
    tardes: 'Reporte de Personal con Llegada Tarde'
  };
  return titles[currentFilter.value] || 'Personal';
});
</script>