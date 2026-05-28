<template>
  <!-- CONTENEDOR PRINCIPAL -->
  <section class="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-colors">

    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
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
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          DNI del Empleado
        </label>

        <!-- CAMBIO: Fondo gris-celestito oscuro y texto celeste claro al escribir -->
        <input
          id="dni"
          v-model="employeeDni"
          type="text"
          required
          class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900/60 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-cyan-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono placeholder-gray-400 dark:placeholder-slate-500"
          placeholder="Ej: 40111222"
        />
      </div>

      <!-- Notas -->
      <div>
        <label
          for="notes"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Notas / Incidentes
        </label>

        <!-- CAMBIO: Mismo comportamiento integrado para el área de texto -->
        <textarea
          id="notes"
          v-model="notes"
          rows="3"
          class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900/60 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-cyan-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400 dark:placeholder-slate-500"
          placeholder="Comentarios adicionales..."
        />
      </div>

      <!-- Botón -->
      <!-- CAMBIO: Pasamos del azul eléctrico a un cian/celeste que calza mejor con el modo oscuro -->
      <button
        type="submit"
        class="w-full bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-700 dark:hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
      >
        Registrar Entrada
      </button>

    </form>

    <!-- Confirmación Estilizada -->
    <div
      v-if="showConfirmation"
      class="mt-6 p-4 bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/60 rounded-lg text-center text-sm font-medium"
    >
      Asistencia registrada exitosamente.
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { employees } from '../../data/employees'

const employeeDni = ref<string>('')
const notes = ref<string>('')
const showConfirmation = ref<boolean>(false)

const emit = defineEmits<{
  (event: 'register-attendance', payload: { employeeId: number, notes: string }): void
}>()

const submitAttendance = (): void => {
  if (!employeeDni.value) return

  const employeeExists = employees.find(
    (employee) => employee.id === Number(employeeDni.value)
  )

  if (!employeeExists) {
    alert('Empleado no encontrado')
    return
  }

  emit('register-attendance', {
    employeeId: Number(employeeDni.value),
    notes: notes.value
  })

  showConfirmation.value = true
  employeeDni.value = ''
  notes.value = ''

  setTimeout(() => {
    showConfirmation.value = false
  }, 3000)
}
</script>