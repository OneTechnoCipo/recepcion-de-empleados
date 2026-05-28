import { ref, computed } from 'vue';
import { employees } from '../data/employees';
import type { Employee } from '../models/CustomModels';

export function useUsers() {
  const searchQuery = ref('');

  const filteredUsers = computed(() => {
    return employees.value.filter(emp => 
      emp.firstName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const saveUser = (userData: Employee, isEditing: boolean) => {
    if (isEditing) {
      const index = employees.value.findIndex(e => e.id === userData.id);
      if (index !== -1) employees.value[index] = userData;
    } else {
      employees.value.push(userData);
    }
  };

  return { searchQuery, filteredUsers, saveUser };
}