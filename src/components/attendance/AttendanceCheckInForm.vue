<script setup lang="ts">
import { ref } from 'vue';
import { employees } from '../../data/employees';
import type { Employee } from '../../models/CustomModels';

const dni = ref('');
const notes = ref('');

const emit = defineEmits<{
  (e: 'register-attendance', payload: { employeeId: number; notes: string }): void
}>();

const submit = () => {
  const employeeId = Number(dni.value);
  
  // Accedemos a la lista reactiva usando .value y tipamos explícitamente el callback
  const employee = employees.value.find((e: Employee) => e.id === employeeId);

  if (!employee) {
    alert("Error: No se encontró ningún empleado con ese DNI.");
    return;
  }

  // Emitimos el evento al padre (AttendanceView)
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
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-blue-500/20"
      >
        Registrar Entrada
      </button>
    </form>
  </div>
</template>