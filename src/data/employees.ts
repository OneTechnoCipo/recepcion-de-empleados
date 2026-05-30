import { ref } from 'vue';
import type { Employee } from '../models/CustomModels';

// Contains the initial seed array for preloaded employees, 
// mapping custom IDs, personal data, and business sectors.

// In-memory collection hosting current staff members and their contract parameters
export const employees = ref<Employee[]>([
  { id: 40111222, firstName: 'Jeremias', lastName: 'Peralta', email: 'jeremias@example.com', role: 'Jefe Pintor', sector: 'Obras', standardWorkHours: 8, overtimeValue: 1.5 },
  { id: 38999111, firstName: 'Mariano', lastName: 'Collazo', email: 'nano@example.com', role: 'Soporte IT', sector: 'IT', standardWorkHours: 8, overtimeValue: 1.5 },
  { id: 42123456, firstName: 'Santiago', lastName: 'Perez', email: 'santi@example.com', role: 'Programador', sector: 'Desarrollo', standardWorkHours: 8, overtimeValue: 1.5 }
]);