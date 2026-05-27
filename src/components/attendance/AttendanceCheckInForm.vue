<template>
  <section class="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">

    <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
      Terminal de Asistencia
    </h2>

    <form
      @submit.prevent="submitAttendance"
      class="space-y-5"
    >

      <!-- DNI -->
      <div>
        <label
          for="dni"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          DNI del Empleado
        </label>

        <input
          id="dni"
          v-model="employeeDni"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: 40111222"
        />
      </div>

      <!-- Notas -->
      <div>
        <label
          for="notes"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Notas / Incidentes
        </label>

        <textarea
          id="notes"
          v-model="notes"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Comentarios adicionales..."
        />
      </div>

      <!-- Botón -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Registrar Entrada
      </button>

    </form>

    <!-- Confirmación -->
    <div
      v-if="showConfirmation"
      class="mt-6 p-4 bg-green-100 text-green-700 rounded-lg text-center"
    >
      Asistencia registrada exitosamente.
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { employees } from '../../data/employees'

// Variables para el estado del formulario
const employeeDni = ref<string>('')
const notes = ref<string>('')
const showConfirmation = ref<boolean>(false)

// Emits tipados
const emit = defineEmits<{
  (
    event: 'register-attendance',
    payload: {
      employeeId: number
      notes: string
    }
  ): void
}>()

// Maneja el envío del formulario
const submitAttendance = (): void => {

  if (!employeeDni.value) {
    return
  }

  // Buscar empleado por DNI
  const employeeExists = employees.find(
    (employee) =>
      employee.id === Number(employeeDni.value)
  )

  // Validación simple
  if (!employeeExists) {
    alert('Empleado no encontrado')
    return
  }

  // Emitimos el evento al componente padre
  emit('register-attendance', {
    employeeId: Number(employeeDni.value),
    notes: notes.value
  })

  // Mostrar confirmación
  showConfirmation.value = true

  // Limpiar formulario
  employeeDni.value = ''
  notes.value = ''

  // Ocultar confirmación
  setTimeout(() => {
    showConfirmation.value = false
  }, 3000)
}
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>