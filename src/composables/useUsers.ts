import { ref, computed } from 'vue';
import { employees } from '../data/employees';
import type { Employee } from '../models/CustomModels';

// Composable que centraliza el estado global de los usuarios, proveyendo las funciones de 
// alta, baja, modificación y filtrado de empleados.

export type UserSortKey = 'id' | 'firstName' | 'email' | 'sector' | 'standardWorkHours';
export type SortOrder = 'asc' | 'desc';

export function useUsers() {
  const searchQuery = ref('');
  const selectedSector = ref(''); // Estado reactivo para controlar el filtro por combo
  
  const sortKey = ref<UserSortKey>('firstName'); 
  const sortOrder = ref<SortOrder>('asc');

  const changeSort = (key: UserSortKey) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };

  const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    const sectorFilter = selectedSector.value;
    
    // 1. Filtrado en cascada (Buscador general + Combo de Sector)
    let result = employees.value.filter(emp => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      
      const matchesSearch = (
        emp.id.toString().includes(query) ||
        fullName.includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.sector.toLowerCase().includes(query)
      );

      const matchesSector = sectorFilter === '' || emp.sector === sectorFilter;

      return matchesSearch && matchesSector;
    });

    // 2. Ordenamiento dinámico sin romper tipos
    return [...result].sort((a, b) => {
      let modifier = sortOrder.value === 'asc' ? 1 : -1;

      if (sortKey.value === 'id') {
        return (a.id - b.id) * modifier;
      }
      
      if (sortKey.value === 'standardWorkHours') {
        return (a.standardWorkHours - b.standardWorkHours) * modifier;
      }

      const valA = String(a[sortKey.value]).toLowerCase();
      const valB = String(b[sortKey.value]).toLowerCase();
      
      return valA.localeCompare(valB) * modifier;
    });
  });

  // Extrae dinámicamente los sectores únicos y válidos para armar las opciones del select
  const availableSectors = computed(() => {
    const sectors = employees.value.map(emp => emp.sector);
    return [...new Set(sectors)].filter(Boolean);
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
    selectedSector,   // Exportado para enlazar con v-model en la vista
    availableSectors, // Exportado para iterar las opciones en la vista
    sortKey, 
    sortOrder, 
    filteredUsers, 
    changeSort, 
    saveUser, 
    deleteUser 
  };
}