
import { Employee } from '../models/CustomModels';

// Datos simulados de empleados con información de estilo argentino/latinoamericano.
export const employees: Employee[] = [
  {
    id: 1, // Identificador único para el empleado
    firstName: 'Juan', // Primer nombre del empleado
    lastName: 'Pérez', // Apellido del empleado
    role: 'Desarrollador Frontend', // Rol o puesto del empleado
    sector: 'IT', // Sector al que pertenece el empleado
    standardWorkHours: 8, // Horas de trabajo estándar diarias
    overtimeValue: 1.5, // Multiplicador para horas extras (1.5x el valor normal)
  },
  {
    id: 2, // Identificador único para el empleado
    firstName: 'María', // Primer nombre del empleado
    lastName: 'González', // Apellido del empleado
    role: 'Diseñadora UX/UI', // Rol o puesto del empleado
    sector: 'Diseño', // Sector al que pertenece el empleado
    standardWorkHours: 8, // Horas de trabajo estándar diarias
    overtimeValue: 1.75, // Multiplicador para horas extras (1.75x el valor normal)
  },
  {
    id: 3, // Identificador único para el empleado
    firstName: 'Carlos', // Primer nombre del empleado
    lastName: 'Rodríguez', // Apellido del empleado
    role: 'Gerente de Proyecto', // Rol o puesto del empleado
    sector: 'Gestión', // Sector al que pertenece el empleado
    standardWorkHours: 8, // Horas de trabajo estándar diarias
    overtimeValue: 2.0, // Multiplicador para horas extras (2.0x el valor normal)
  },
  {
    id: 4, // Identificador único para el empleado
    firstName: 'Ana', // Primer nombre del empleado
    lastName: 'Fernández', // Apellido del empleado
    role: 'Analista de QA', // Rol o puesto del empleado
    sector: 'IT', // Sector al que pertenece el empleado
    standardWorkHours: 8, // Horas de trabajo estándar diarias
    overtimeValue: 1.5, // Multiplicador para horas extras
  },
];
