<template>
  <div class="h-full flex flex-col">
    <div class="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full min-h-0">
      
      <div class="flex justify-between items-center mb-4 shrink-0">
        <h2 class="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Icon icon="heroicons:document-text" class="w-5 h-5 text-blue-500" />
          Registros Recientes
        </h2>
        <span class="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
          {{ extendedAttendanceRecords.length }} registros
        </span>
      </div>

      <div class="overflow-x-auto flex-1 overflow-y-auto scrollbar-fina min-h-0">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider sticky top-0 bg-white dark:bg-gray-800 z-10 border-b dark:border-gray-700">
              <th class="py-3 px-3 font-semibold">Fecha</th>
              <th class="py-3 px-3 font-semibold">Empleado</th>
              <th class="py-3 px-3 font-semibold">Puesto</th>
              <th class="py-3 px-3 font-semibold text-center">Entrada</th>
              <th class="py-3 px-3 font-semibold text-center">Salida</th>
              <th class="py-3 px-3 font-semibold text-center">Estado</th>
              <th class="py-3 px-3 font-semibold text-center">Horas</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="record in extendedAttendanceRecords" :key="record.id" 
                class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              
              <td class="px-3 py-4 text-sm text-gray-600 dark:text-gray-300 font-mono">
                {{ formatDate(record.date) }}
              </td>

              <td class="px-3 py-4">
                <p class="font-medium text-gray-900 dark:text-white">{{ record.employeeFullName }}</p>
              </td>

              <td class="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{{ record.employeeRole }}</td>

              <td class="px-3 py-4 text-center font-mono text-sm text-gray-600 dark:text-gray-300">{{ record.checkIn }}</td>
              <td class="px-3 py-4 text-center font-mono text-sm text-gray-600 dark:text-gray-300">
                {{ record.checkOut || '--:--' }}
              </td>

              <td class="px-3 py-4 text-center">
                <span :class="record.checkOut ? 'text-green-500' : 'text-amber-500'" class="flex justify-center">
                  <Icon :icon="record.checkOut ? 'heroicons:check-badge' : 'heroicons:clock'" class="w-5 h-5" />
                </span>
              </td>

              <td class="px-3 py-4 text-center font-bold text-sm" 
                  :class="record.overtimeHours > 0 ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'">
                {{ record.workedHours.toFixed(1) }}h
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import type { AttendanceRecord } from '../../models/CustomModels';
import { employees } from '../../data/employees';

// Displays daily check-in and check-out logs in a structured layout, 
// updating timestamps reactively for active staff.

// Parses the technical ISO date format into a clean day/month display string
const formatDate = (dateStr: string) => {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}`;
  }
  return dateStr;
};

interface ExtendedAttendanceRecord extends AttendanceRecord {
  employeeFullName: string;
  employeeRole: string;
  workedHours: number;
  overtimeHours: number;
}

const props = defineProps<{
  records: AttendanceRecord[]
}>();

// Computes detailed payroll and tracking statistics by cross-referencing logs with employee data
const extendedAttendanceRecords = computed<ExtendedAttendanceRecord[]>(() => {
  return props.records.map((record) => {
    const employee = employees.value.find(e => e.id === record.employeeId);
    const employeeFullName = employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
    const employeeRole = employee ? employee.role : 'N/A';

    let workedHours = 0;  
    let overtimeHours = 0;

    if (record.checkOut) {
      const checkInTime = new Date(`${record.date}T${record.checkIn}:00`);
      const checkOutTime = new Date(`${record.date}T${record.checkOut}:00`);
      const totalMilliseconds = checkOutTime.getTime() - checkInTime.getTime();
      const totalHours = totalMilliseconds / (1000 * 60 * 60);
      
      // Deducts statutory break time from total shift duration
      workedHours = Math.max(0, totalHours - record.breakHours);

      // Calculates dynamic overtime if total duration exceeds standard contract parameters
      if (employee && workedHours > employee.standardWorkHours) {
        overtimeHours = workedHours - employee.standardWorkHours;
      }
    }

    return {
      ...record,
      employeeFullName,
      employeeRole,
      workedHours,
      overtimeHours
    };
  });
});
</script>

<style scoped>
.scrollbar-fina::-webkit-scrollbar { width: 6px; height: 6px; }
.scrollbar-fina::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.dark .scrollbar-fina::-webkit-scrollbar-thumb { background: #475569; }
</style>