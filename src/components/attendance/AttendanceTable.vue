<script setup lang="ts">
import {computed } from 'vue';
import type { AttendanceRecord } from '../../models/CustomModels'

import { employees } from '../../data/employees';

// Definimos la interfaz para un registro de asistencia extendido con detalles del empleado
// We define the interface for an attendance record extended with employee details
interface ExtendedAttendanceRecord extends AttendanceRecord {
  employeeFullName: string;
  employeeRole: string;
  workedHours: number;
  overtimeHours: number;
  isActive: boolean; // Indica si el empleado está activo (simulado para este ejemplo)
}
const props = defineProps<{
  records: AttendanceRecord[]
}>()
// Mapeamos los registros de asistencia a registros extendidos
// We map the attendance records to extended records
const extendedAttendanceRecords = computed<ExtendedAttendanceRecord[]>(() => {
  return props.records.map((record) => {
    const employee = employees.find((emp) => emp.id === record.employeeId);
    const employeeFullName = employee ? `${employee.firstName} ${employee.lastName}` : 'Desconocido';
    const employeeRole = employee ? employee.role : 'N/A';

    // Calculamos las horas trabajadas
    // We calculate the worked hours
let workedHours = 0;
let overtimeHours = 0;

if (record.checkOut) {
  const checkInTime = new Date(`${record.date}T${record.checkIn}:00`);
  const checkOutTime = new Date(`${record.date}T${record.checkOut}:00`);

  const totalMilliseconds =
    checkOutTime.getTime() - checkInTime.getTime();

  const totalHours = totalMilliseconds / (1000 * 60 * 60);

  workedHours = totalHours - record.breakHours;

  if (employee && workedHours > employee.standardWorkHours) {
    overtimeHours =
      workedHours - employee.standardWorkHours;
  }
}

    // Si las horas trabajadas superan las horas estándar del empleado, calculamos las horas extras
    // If worked hours exceed employee's standard hours, we calculate overtime hours
if (employee && workedHours > employee.standardWorkHours) {
  overtimeHours = workedHours - employee.standardWorkHours;
}

    // Simulamos el estado activo del empleado (ejemplo académico simple)
    // We simulate the active status of the employee (simple academic example)
    const isActive = record.employeeId % 2 === 0; // Solo para demostración

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
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Tabla de Asistencia</h1>
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Empleado
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Entrada
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Salida
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Horas Trab.
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Horas Extra
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notas/Incidentes
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="record in extendedAttendanceRecords"
            :key="record.id"
            :class="[
              record.overtimeHours > 0 ? 'bg-yellow-100 hover:bg-yellow-200' : 'hover:bg-gray-50',
              record.isActive ? 'border-l-4 border-green-500' : ''
            ]"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ record.employeeFullName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ record.employeeRole }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ record.date }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ record.checkIn }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ record.checkOut }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ record.workedHours.toFixed(2) }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm"
              :class="record.overtimeHours > 0 ? 'text-red-600 font-semibold' : 'text-gray-500'"
            >
              {{ record.overtimeHours.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ record.notes }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos para este componente si son necesarios */
/* Specific styles for this component if needed */
</style>
