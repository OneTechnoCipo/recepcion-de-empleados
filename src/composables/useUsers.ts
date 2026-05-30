import { ref, computed } from 'vue';
import { employees } from '../data/employees';
import type { Employee } from '../models/CustomModels';

// Composable function that centralizes user global state, providing CRUD actions and 
// filtering methods for employee data management.

export type UserSortKey = 'id' | 'firstName' | 'email' | 'sector' | 'standardWorkHours';
export type SortOrder = 'asc' | 'desc';

export function useUsers() {
  const searchQuery = ref('');
  const selectedSector = ref(''); // Reactive state to control drop-down sector filtering
  
  const sortKey = ref<UserSortKey>('firstName'); 
  const sortOrder = ref<SortOrder>('asc');

  // Handles internal sorting state management by toggling directions or switching target keys
  const changeSort = (key: UserSortKey) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortKey.value = key;
      sortOrder.value = 'asc';
    }
  };

  // Reactively processes both text queries and drop-down sector constraints in a cascading filter architecture
  const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    const sectorFilter = selectedSector.value;
    
    // 1. Cascading filter execution (General search bar + Sector dropdown selection)
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

    // 2. Dynamic multi-type sorting algorithm preserving structural data types
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

  // Dynamically extracts valid unique sectors using a Set structure to populate layout select elements
  const availableSectors = computed(() => {
    const sectors = employees.value.map(emp => emp.sector);
    return [...new Set(sectors)].filter(Boolean);
  });

  // Persists modified structural records or pushes newly created employee entities into local data array
  const saveUser = (userData: Employee, isEditing: boolean) => {
    if (isEditing) {
      const index = employees.value.findIndex(e => e.id === userData.id);
      if (index !== -1) employees.value[index] = userData;
    } else {
      employees.value.push(userData);
    }
  };

  // Removes a specific employee record from the dataset by matching its unique ID signature
  const deleteUser = (id: number) => {
    const index = employees.value.findIndex(e => e.id === id);
    if (index !== -1) {
      employees.value.splice(index, 1);
    }
  };

  return { 
    searchQuery, 
    selectedSector,   // Exported to bind with v-model in layout view templates
    availableSectors, // Exported to loop options inside select dropdown lists
    sortKey, 
    sortOrder, 
    filteredUsers, 
    changeSort, 
    saveUser, 
    deleteUser 
  };
}