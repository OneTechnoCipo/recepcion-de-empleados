import { ref, computed } from 'vue';
import { employees } from '../data/employees';
import type { Employee } from '../models/CustomModels';

// Tipos estrictos basados exactamente en las propiedades de tu Employee
export type UserSortKey = 'id' | 'firstName' | 'email' | 'sector' | 'standardWorkHours';
export type SortOrder = 'asc' | 'desc';

export function useUsers() {
  const searchQuery = ref('');
  
  // Estados reactivos para controlar el ordenamiento (por defecto por nombre)
  const sortKey = ref<UserSortKey>('firstName'); 
  const sortOrder = ref<SortOrder>('asc');

  // Función interactiva para cambiar de columna o invertir el orden
  const changeSort = (key: UserSortKey) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };

  // Procesamiento en cascada: Primero Filtra, después Ordena
  const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    
    // 1. Filtrado completo por múltiples campos
    let result = employees.value.filter(emp => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      return (
        emp.id.toString().includes(query) ||
        fullName.includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.sector.toLowerCase().includes(query)
      );
    });

    // 2. Ordenamiento dinámico sin romper los tipos de TS
    return [...result].sort((a, b) => {
      let modifier = sortOrder.value === 'asc' ? 1 : -1;

      if (sortKey.value === 'id') {
        return (a.id - b.id) * modifier;
      }
      
      if (sortKey.value === 'standardWorkHours') {
        return (a.standardWorkHours - b.standardWorkHours) * modifier;
      }

      // Tratamiento seguro de strings para firstName, email y sector
      const valA = String(a[sortKey.value]).toLowerCase();
      const valB = String(b[sortKey.value]).toLowerCase();
      
      return valA.localeCompare(valB) * modifier;
    });
  });

  const saveUser = (userData: Employee, isEditing: boolean) => {
    if (isEditing) {
      const index = employees.value.findIndex(e => e.id === userData.id);
      if (index !== -1) employees.value[index] = userData;
    } else {
      employees.value.push(userData);
    }
  };

  const deleteUser = (id: number) => {
    const index = employees.value.findIndex(e => e.id === id);
    if (index !== -1) {
      employees.value.splice(index, 1);
    }
  };

  return { 
    searchQuery, 
    sortKey, 
    sortOrder, 
    filteredUsers, 
    changeSort, 
    saveUser, 
    deleteUser 
  };
}