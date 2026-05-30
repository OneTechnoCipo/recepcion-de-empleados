<template>
  <div class="h-full flex flex-col p-4 md:p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
    
    <div class="mb-6">
      <button 
        @click="showForm = !showForm"
        class="flex items-center gap-2 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm"
      >
        <Icon 
          :icon="showForm ? 'heroicons:eye-slash' : 'heroicons:plus-circle'" 
          class="w-4 h-4" 
        />
        {{ showForm ? 'Ocultar Terminal' : 'Nueva Asistencia' }}
      </button>
    </div>

    <div v-if="showForm" class="shrink-0 mb-6 animate-in slide-in-from-top-2 duration-300">
      <AttendanceCheckInForm @register-attendance="handleRegisterAttendance" />
    </div>

    <div class="flex-1 min-h-0 overflow-hidden">
      <AttendanceTable :records="records" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AttendanceTable from '../../components/attendance/AttendanceTable.vue'
import AttendanceCheckInForm from '../../components/attendance/AttendanceCheckInForm.vue'
import { attendanceRecords } from '../../data/attendance'
import type { AttendanceRecord } from '../../models/CustomModels'

// Reads the DNI in real-time: displays the blue "Entrada" button if the employee is absent, 
// or switches to red "Salida" to close their daily shift if already checked in.

const showForm = ref(true)

// Binds directly to the shared global reactive reference without cloning structural values
const records = attendanceRecords

// Processes employee intent events to register either a fresh check-in log or close an open daily shift
const handleRegisterAttendance = (payload: { employeeId: number; notes: string }) => {
  const currentDate = new Date()
  const today = currentDate.toISOString().split('T')[0]
  const currentTime = currentDate.toTimeString().slice(0, 5)

  // Scans the reference to locate an active attendance record that lacks a check-out timestamp today
  const activeRecord = records.value.find(
    (r) => r.employeeId === payload.employeeId && r.date === today && r.checkOut === null
  )

  if (activeRecord) {
    // If a session exists, closes the employee tracking shift with the current local time
    activeRecord.checkOut = currentTime
    if (payload.notes) activeRecord.notes += ` | ${payload.notes}`
  } else {
    // Generates a fully structure-compliant AttendanceRecord object if no active shift is logged
    const newRecord: AttendanceRecord = {
      id: Date.now(),
      employeeId: payload.employeeId,
      date: today,
      checkIn: currentTime,
      checkOut: null,
      breakHours: 0,
      notes: payload.notes
    }
    // Directly pushes the valid data payload into the globally monitored reactive array
    records.value.push(newRecord)
  }
}
</script>