import { ref } from 'vue';
import type { Employee } from '../models/CustomModels';

export const employees = ref<Employee[]>([
  { id: 40111222, firstName: 'Jeremias', lastName: 'Peralta', email: 'jeremias@example.com', role: 'Jefe Pintor', sector: 'Obras', standardWorkHours: 8, overtimeValue: 1.5 },
  { id: 38999111, firstName: 'Mariano', lastName: 'Collazo', email: 'nano@example.com', role: 'Soporte IT', sector: 'IT', standardWorkHours: 8, overtimeValue: 1.5 }
]);