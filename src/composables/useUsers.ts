// src/composables/useUsers.ts
import { ref, computed } from 'vue';
import type { Employee } from '../models/CustomModels';
import { employees } from '../data/employees';

export function useUsers() {
  const searchQuery = ref<string>('');

  // Filtrado multivariable exigido por la cátedra
  const filteredUsers = computed(() => {
    if (!searchQuery.value) return employees.value;
    const query = searchQuery.value.toLowerCase();
    return employees.value.filter(emp => 
      emp.firstName.toLowerCase().includes(query) ||
      emp.lastName.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.id.toString().includes(query)
    );
  });

  const getUserById = (id: number | string) => {
    return employees.value.find(emp => emp.id.toString() === id.toString());
  };

  const deleteUser = (id: number) => {
    employees.value = employees.value.filter(emp => emp.id !== id);
  };

  const saveUser = (userData: Employee, isEditing: boolean) => {
    if (isEditing) {
      const index = employees.value.findIndex(emp => emp.id === userData.id);
      if (index !== -1) {
        employees.value[index] = { ...userData };
      }
    } else {
      const exists = employees.value.some(emp => emp.id === userData.id);
      if (exists) {
        alert('El DNI ingresado ya pertenece a un usuario existente.');
        return;
      }
      employees.value.push({ ...userData });
    }
  };

  return {
    searchQuery,
    filteredUsers,
    getUserById,
    deleteUser,
    saveUser
  };
}