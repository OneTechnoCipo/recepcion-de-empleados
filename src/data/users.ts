import { ref, computed } from 'vue';
import { employees } from '../data/employees';
import type { Employee } from '../models/CustomModels';

// Tipos estrictos para el ordenamiento estilo 
export type UserSortKey = 'id' | 'name' | 'email' | 'sector' | 'hours';
export type SortOrder = 'asc' | 'desc';

export function useUsers() {
  const searchQuery = ref('');
  
  // Estados reactivos para controlar el ordenamiento
  const sortKey = ref<UserSortKey>('name'); // Por defecto ordena por nombre
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
    // 1. Filtrado completo por múltiples campos
    const query = searchQuery.value.toLowerCase().trim();
    let result = employees.value.filter(emp => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      return (
        emp.id.toString().includes(query) ||
        fullName.includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.sector.toLowerCase().includes(query)
      );
    });

    // 2. Ordenamiento dinámico 
    return [...result].sort((a, b) => {
      let modifier = sortOrder.value === 'asc' ? 1 : -1;

      if (sortKey.value === 'id') {
        return (a.id - b.id) * modifier;
      }
      
      if (sortKey.value === 'hours') {
        return (a.standardWorkHours - b.standardWorkHours) * modifier;
      }

      if (sortKey.value === 'name') {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return nameA.localeCompare(nameB) * modifier;
      }

      // Para email y sector de forma genérica
      return a[sortKey.value].toLowerCase().localeCompare(b[sortKey.value].toLowerCase()) * modifier;
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