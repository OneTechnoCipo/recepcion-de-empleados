<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Administra la información de accesos, sectores y horarios de los empleados.</p>
      </div>
      
      <div class="w-full sm:w-auto flex gap-2">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar por nombre, DNI, sector..." 
          class="w-full sm:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button @click="openCreateModal" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition whitespace-nowrap">
          + Nuevo Usuario
        </button>
      </div>
    </div>

    <UsersTable 
      :users="filteredUsers" 
      :sort-key="sortKey"
      :sort-order="sortOrder"
      @sort="changeSort"
      @edit="openEditModal" 
      @delete="handleDelete" 
    />

    <div class="grid grid-cols-1 gap-4 md:hidden">
      <UserCard v-for="user in filteredUsers" :key="user.id" :user="user" @edit="openEditModal" @delete="handleDelete" />
      <div v-if="filteredUsers.length === 0" class="text-center p-6 text-gray-500 bg-white dark:bg-gray-800 rounded-lg shadow">
        No se encontraron resultados.
      </div>
    </div>

    <UserFormModal :is-open="isModalOpen" :user-to-edit="selectedUser" @close="closeModal" @save="handleSaveUser" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUsers } from '../../composables/useUsers';
import UsersTable from '../../components/users/UsersTable.vue';
import UserCard from '../../components/users/UserCard.vue';
import UserFormModal from './UserFormModal.vue'; 
import type { Employee } from '../../models/CustomModels';

// Desestructuración con las nuevas variables y funciones añadidas en el composable
const { 
  searchQuery, 
  sortKey, 
  sortOrder, 
  filteredUsers, 
  changeSort, 
  deleteUser, 
  saveUser 
} = useUsers();

const isModalOpen = ref(false);
const selectedUser = ref<Employee | null>(null);

const openCreateModal = () => {
  selectedUser.value = null;
  isModalOpen.value = true;
};

const openEditModal = (user: Employee) => {
  selectedUser.value = user;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
};

const handleSaveUser = (userData: Employee, isEditing: boolean) => {
  saveUser(userData, isEditing);
};

const handleDelete = (id: number) => {
  if (confirm('¿Estás seguro de eliminar este usuario? Quitarlo aquí también afectará las pantallas de asistencia.')) {
    deleteUser(id);
  }
};
</script>