// Define las interfaces y tipos de datos personalizados requeridos por 
// TypeScript para estructurar los objetos de negocio del proyecto.

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  sector: string;
  standardWorkHours: number;
  overtimeValue: number;
}

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: string;
  checkIn: string;
  checkOut: string | null;
  breakHours: number;
  notes: string;
}