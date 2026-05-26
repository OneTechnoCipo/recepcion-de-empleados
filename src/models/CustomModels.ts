
// src/models/CustomModels.ts

/**
 * @interface Employee
 * @description Representa la estructura de un empleado en el sistema de asistencia.
 */
export interface Employee {
  id: string; // Identificador único del empleado
  firstName: string; // Nombre del empleado
  lastName: string; // Apellido del empleado
  email: string; // Correo electrónico del empleado
  phoneNumber?: string; // Número de teléfono del empleado (opcional)
  hireDate: Date; // Fecha de contratación del empleado
  jobTitle: string; // Puesto de trabajo del empleado
  department: string; // Departamento al que pertenece el empleado
}

/**
 * @interface AttendanceRecord
 * @description Representa un registro de asistencia para un empleado en una fecha y hora específicas.
 */
export interface AttendanceRecord {
  id: string; // Identificador único del registro de asistencia
  employeeId: string; // ID del empleado asociado a este registro
  recordDate: Date; // Fecha y hora del registro de asistencia
  status: "presente" | "ausente" | "tarde"; // Estado de la asistencia: presente, ausente o tarde
  checkInTime?: Date; // Hora de entrada (opcional, si aplica)
  checkOutTime?: Date; // Hora de salida (opcional, si aplica)
}

/**
 * @interface User
 * @description Representa un usuario del sistema, que podría ser un administrador o un empleado con acceso.
 */
export interface User {
  id: string; // Identificador único del usuario
  username: string; // Nombre de usuario para iniciar sesión
  passwordHash: string; // Hash de la contraseña del usuario (nunca almacenar contraseñas en texto plano)
  email: string; // Correo electrónico del usuario
  role: "administrador" | "empleado"; // Rol del usuario en el sistema
  employeeId?: string; // ID del empleado asociado, si el usuario también es un empleado (opcional)
  createdAt: Date; // Fecha de creación del usuario
  updatedAt: Date; // Fecha de la última actualización del usuario
}
