<template>
  <div class="p-6 space-y-8">

    <!-- Formulario de fichaje -->
    <AttendanceCheckInForm
      @register-attendance="handleRegisterAttendance"
    />

    <!-- Tabla de asistencia -->
    <AttendanceTable
      :records="records"
    />

  </div>
</template>

<script setup lang="ts">
import type { AttendanceRecord } from '../../models/CustomModels'
import { ref } from 'vue'

import AttendanceTable from '../../components/attendance/AttendanceTable.vue'
import AttendanceCheckInForm from '../../components/attendance/AttendanceCheckInForm.vue'

import { attendanceRecords } from '../../data/attendance'


// Estado reactivo principal de registros
const records = ref<AttendanceRecord[]>([
  ...attendanceRecords
])

// Función para registrar asistencia
const handleRegisterAttendance = (
  payload: {
    employeeId: number
    notes: string
  }
) => {

  const currentDate = new Date()

  const today = currentDate
    .toISOString()
    .split('T')[0]

  const currentTime = currentDate
    .toTimeString().slice(0, 8)

  // Buscar registro activo del empleado
  const activeRecord = records.value.find(
    (record) =>
      record.employeeId === payload.employeeId &&
      record.date === today &&
      record.checkOut === null
  )

  // SI YA TIENE ENTRADA → registrar salida
  if (activeRecord) {

    activeRecord.checkOut = currentTime

    // Agregar nota extra si existe
    if (payload.notes) {
      activeRecord.notes += ` | ${payload.notes}`
    }

    return
  }

  // SI NO TIENE ENTRADA → crear nuevo registro
  const newRecord: AttendanceRecord = {
    id: Date.now(),

    employeeId: payload.employeeId,

    date: today,

    checkIn: currentTime,

    checkOut: null,

    breakHours: 0,

    notes: payload.notes
  }

  records.value.push(newRecord)
}
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
</style>