
// Interfaz que representa a un empleado en el sistema.
export interface Employee {
  id: number; // Identificador único del empleado
  firstName: string; // Primer nombre del empleado
  lastName: string; // Apellido del empleado
  role: string; // Rol o puesto del empleado
  sector: string; // Sector o departamento al que pertenece el empleado
  standardWorkHours: number; // Horas de trabajo estándar diarias o semanales
  overtimeValue: number; // Valor de la hora extra o multiplicador
}

// Interfaz que representa un registro de asistencia de un empleado.
export interface AttendanceRecord {
  id: number; // Identificador único del registro de asistencia
  employeeId: number; // ID del empleado asociado a este registro
  date: string; // Fecha del registro de asistencia (e.g., "YYYY-MM-DD")
  checkIn: string; // Hora de entrada (e.g., "HH:MM")
  checkOut: string; // Hora de salida (e.g., "HH:MM")
  breakHours: number; // Horas tomadas para el descanso
  notes: string; // Notas adicionales sobre la asistencia
}

// Interfaz que representa a un usuario del sistema (por ejemplo, para autenticación).
export interface User {
  id: number; // Identificador único del usuario
  name: string; // Nombre completo del usuario
  email: string; // Dirección de correo electrónico del usuario
}
