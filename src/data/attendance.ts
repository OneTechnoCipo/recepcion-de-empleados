import { ref } from 'vue';
import type { AttendanceRecord } from '../models/CustomModels';

// Exports mock attendance tracking datasets to populate 
// table records during the application development phase.

// Mock structural dataset containing historical tracking sessions for local execution
const initialRecords: AttendanceRecord[] = [
  {
    id: 1,
    employeeId: 40111222, 
    date: '2026-05-26',
    checkIn: '09:00',
    checkOut: '17:00',
    breakHours: 0.5,
    notes: 'Trabajo completado en el proyecto Alpha.',
  },
  {
    id: 2,
    employeeId: 38999111, 
    date: '2026-05-26',
    checkIn: '08:30',
    checkOut: '18:00',
    breakHours: 1.0,
    notes: 'Monitoreo de nodos y soporte técnico.',
  },
  {
    id: 3,
    employeeId: 42123456, 
    date: '2026-05-26',
    checkIn: '09:15',
    checkOut: '17:30',
    breakHours: 0.75,
    notes: 'Desarrollo de nuevas vistas en Vue.',
  },
  {
    id: 4,
    employeeId: 40111222, 
    date: '2026-05-27',
    checkIn: '09:00',
    checkOut: '19:00',
    breakHours: 0.5,
    notes: 'Horas extras por cierre de obra.',
  },
  {
    id: 5,
    employeeId: 38999111, 
    date: '2026-05-27',
    checkIn: '09:00',
    checkOut: '17:00',
    breakHours: 1.0,
    notes: 'Configuración de enlaces y repetidores.',
  },
  {
    id: 6,
    employeeId: 42123456,
    date: '2026-05-26',
    checkIn: '09:00',
    checkOut: '17:00',
    breakHours: 0.5,
    notes: 'Pruebas de regresión del sistema.',
  },
  {
    id: 7,
    employeeId: 42123456, 
    date: '2026-05-27',
    checkIn: '08:00',
    checkOut: '19:00',
    breakHours: 1.0,
    notes: 'Incidente crítico resuelto en producción.',
  },
];

// Instantiates and exports a global reactive state reference to allow persistence across layouts
export const attendanceRecords = ref<AttendanceRecord[]>(initialRecords);