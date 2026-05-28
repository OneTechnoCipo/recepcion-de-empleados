import { ref, computed } from 'vue';
import type { User } from '../models/CustomModels';
import { initialUsers } from '../data/users';

const users = ref<User[]>([...initialUsers]);

export function useUsers() {
  const searchQuery = ref<string>('');

  const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return users.value.filter(user => 
      user.name.toLowerCase().includes(lowerCaseQuery) ||
      user.email.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const getUserById = (id: number | string) => {
    return users.value.find(u => u.id.toString() === id.toString());
  };

  const deleteUser = (id: number | string) => {
    users.value = users.value.filter(user => user.id !== id);
  };

  const saveUser = (userData: User) => {
    if (userData.id) {
      // Editar existente
      const index = users.value.findIndex(u => u.id === userData.id);
      if (index !== -1) {
        users.value[index] = { ...userData };
      }
    } else {
      // Crear nuevo (generamos un ID temporal basado en la fecha para simular una BD)
      const newUser: User = {
        ...userData,
        id: Date.now()
      };
      users.value.push(newUser);
    }
  };

  return {
    users,
    searchQuery,
    filteredUsers,
    getUserById,
    deleteUser,
    saveUser
  };
}   