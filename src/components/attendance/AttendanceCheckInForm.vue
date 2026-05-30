<script setup lang="ts">
import { ref, computed } from 'vue';
import { employees } from '../../data/employees';
import { attendanceRecords } from '../../data/attendance'; // Importamos los registros para validar el estado actual
import type { Employee } from '../../models/CustomModels';

const dni = ref('');
const notes = ref('');

const emit = defineEmits<{
  (e: 'register-attendance', payload: { employeeId: number; notes: string }): void
}>();

// Computado para detectar en tiempo real si el DNI ingresado ya está adentro
const isEmployeeCheckedIn = computed(() => {
  const employeeId = Number(dni.value);
  if (!employeeId) return false;

  const today = new Date().toISOString().split('T')[0];

  // Retorna true si tiene un fichaje hoy sin hora de salida
  return attendanceRecords.value.some(
    (r) => r.employeeId === employeeId && r.date === today && (r.checkOut === null || r.checkOut.trim() === '')
  );
});

const submit = () => {
  const employeeId = Number(dni.value);
  
  const employee = employees.value.find((e: Employee) => e.id === employeeId);

  if (!employee) {
    alert("Error: No se encontró ningún empleado con ese DNI.");
    return;
  }

  // Emitimos el evento (el padre AttendanceView se encarga de procesar entrada o salida automáticamente)
  emit('register-attendance', {
    employeeId,
    notes: notes.value
  });

  // Limpiar campos tras registrar
  dni.value = '';
  notes.value = '';
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
    <h3 class="text-md font-bold text-gray-800 dark:text-white mb-4">Terminal de Asistencia</h3>
    
    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
          DNI del Empleado
        </label>
        <input
          v-model="dni"
          type="number"
          required
          placeholder="Ej: 40111222"
          class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">
          Notas / Incidentes
        </label>
        <textarea
          v-model="notes"
          placeholder="Comentarios adicionales..."
          rows="2"
          class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-lg"
        :class="
          isEmployeeCheckedIn 
            ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20' 
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
        "
      >
        {{ isEmployeeCheckedIn ? 'Registrar Salida' : 'Registrar Entrada' }}
      </button>
    </form>
  </div>
</template>