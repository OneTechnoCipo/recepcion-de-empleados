<script setup lang="ts">
import { computed } from 'vue';
import type { AttendanceRecord } from '../../models/CustomModels';
import { employees } from '../../data/employees';

interface ExtendedAttendanceRecord extends AttendanceRecord {
  employeeFullName: string;
  employeeRole: string;
  workedHours: number;
  overtimeHours: number;
  isActive: boolean;
}

const props = defineProps<{
  records: AttendanceRecord[]
}>();

const extendedAttendanceRecords = computed<ExtendedAttendanceRecord[]>(() => {
  return props.records.map((record) => {
    const employee = employees.find((emp) => emp.id === record.employeeId);
    const employeeFullName = employee ? `${employee.firstName} ${employee.lastName}` : 'Desconocido';
    const employeeRole = employee ? employee.role : 'N/A';

    let workedHours = 0;
    let overtimeHours = 0;

    if (record.checkOut) {
      const checkInTime = new Date(`${record.date}T${record.checkIn}:00`);
      const checkOutTime = new Date(`${record.date}T${record.checkOut}:00`);
      const totalMilliseconds = checkOutTime.getTime() - checkInTime.getTime();
      const totalHours = totalMilliseconds / (1000 * 60 * 60);
      
      workedHours = totalHours - record.breakHours;

      if (employee && workedHours > employee.standardWorkHours) {
        overtimeHours = workedHours - employee.standardWorkHours;
      }
    }

    const isActive = record.employeeId % 2 === 0;

    return {
      ...record,
      employeeFullName,
      employeeRole,
      workedHours,
      overtimeHours,
      isActive,
    };
  });
});
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 flex flex-col h-full min-h-0">
      
      <div class="flex justify-between items-center mb-4 flex-shrink-0">
        <h2 class="text-lg font-bold text-gray-800 dark:text-white">
          Registros de Asistencia Recientes
        </h2>
        <span class="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-full">
          {{ extendedAttendanceRecords.length }} Procesados
        </span>
      </div>

      <div class="overflow-x-auto flex-1 overflow-y-auto pr-1 scrollbar-fina min-h-0">
        <table class="w-full text-left text-sm border-collapse">
          <thead>
            <tr class="text-gray-400 dark:text-gray-400 text-xs uppercase tracking-wider sticky top-0 bg-white dark:bg-gray-800 z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.1)]">
              <th scope="col" class="py-3 px-3 font-semibold bg-white dark:bg-gray-800">Empleado</th>
              <th scope="col" class="py-3 px-3 font-semibold bg-white dark:bg-gray-800">Rol</th>
              <th scope="col" class="py-3 px-3 font-semibold bg-white dark:bg-gray-800">Fecha</th>
              <th scope="col" class="py-3 px-3 font-semibold bg-white dark:bg-gray-800">Entrada</th>
              <th scope="col" class="py-3 px-3 font-semibold bg-white dark:bg-gray-800">Salida</th>
              <th scope="col" class="py-3 px-3 font-semibold text-center bg-white dark:bg-gray-800">Horas Trab.</th>
              <th scope="col" class="py-3 px-3 font-semibold text-center bg-white dark:bg-gray-800">Horas Extra</th>
              <th scope="col" class="py-3 px-3 font-semibold bg-white dark:bg-gray-800">Notas/Incidentes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr
              v-for="record in extendedAttendanceRecords"
              :key="record.id"
              :class="[
                'transition-colors border-b border-gray-100 dark:border-gray-700/60',
                record.overtimeHours > 0 
                  ? 'text-gray-900 dark:text-gray-300 bg-amber-50/40 dark:bg-amber-500/5 hover:bg-amber-50/70 dark:hover:bg-amber-500/10' 
                  : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50',
                record.isActive ? 'border-l-4 border-green-500' : 'border-l-4 border-transparent'
              ]"
            >
              <td class="px-3 py-3.5 font-medium text-gray-900 dark:text-white">
                {{ record.employeeFullName }}
              </td>
              <td class="px-3 py-3.5 text-xs text-gray-500 dark:text-gray-400">
                {{ record.employeeRole }}
              </td>
              <td class="px-3 py-3.5 text-xs font-mono text-gray-500 dark:text-gray-400">
                {{ record.date }}
              </td>
              <td class="px-3 py-3.5 text-xs text-gray-600 dark:text-gray-300">
                <span class="px-2 py-0.5 rounded bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-mono">
                  {{ record.checkIn }}
                </span>
              </td>
              <td class="px-3 py-3.5 text-xs text-gray-600 dark:text-gray-300">
                <span v-if="record.checkOut" class="px-2 py-0.5 rounded bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 font-mono">
                  {{ record.checkOut }}
                </span>
                <span v-else class="text-gray-400 dark:text-gray-500 italic text-[11px]">En curso...</span>
              </td>
              <td class="px-3 py-3.5 text-xs font-mono text-center text-gray-700 dark:text-gray-300">
                {{ record.workedHours.toFixed(2) }}h
              </td>
              <td
                class="px-3 py-3.5 text-xs font-mono text-center"
                :class="record.overtimeHours > 0 ? 'text-red-500 dark:text-red-400 font-bold' : 'text-gray-400 dark:text-gray-500'"
              >
                {{ record.overtimeHours > 0 ? `+${record.overtimeHours.toFixed(2)}h` : '0.00' }}
              </td>
              <td class="px-3 py-3.5 text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate" :title="record.notes">
                {{ record.notes || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilo refinado para la barra de scroll vertical interna */
.scrollbar-fina::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.scrollbar-fina::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-fina::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}
.scrollbar-fina::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>