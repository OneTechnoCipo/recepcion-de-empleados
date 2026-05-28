<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Usuarios</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Administra los accesos y perfiles del sistema.</p>
      </div>
      
      <div class="w-full sm:w-auto flex gap-2">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar por nombre o email..." 
          class="w-full sm:w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button @click="openCreateModal" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition whitespace-nowrap">
          + Nuevo Usuario
        </button>
      </div>
    </div>

    <UsersTable 
      :users="filteredUsers" 
      @edit="openEditModal" 
      @delete="handleDelete" 
    />

    <div class="grid grid-cols-1 gap-4 md:hidden">
      <UserCard 
        v-for="user in filteredUsers" 
        :key="user.id" 
        :user="user"
        @edit="openEditModal" 
        @delete="handleDelete"
      />
      <div v-if="filteredUsers.length === 0" class="text-center p-6 text-gray-500 bg-white dark:bg-gray-800 rounded-lg shadow">
        No se encontraron usuarios.
      </div>
    </div>

    <UserFormModal 
      :is-open="isModalOpen"
      :user-to-edit="selectedUser"
      @close="closeModal"
      @save="handleSaveUser"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useUsers } from '../../composables/useUsers';
import UsersTable from '../../components/users/UsersTable.vue';
import UserCard from '../../components/users/UserCard.vue';
import UserFormModal from '../../views/users/UserFormModal.vue';
import type { User } from '../../models/CustomModels';


const { searchQuery, filteredUsers, deleteUser, saveUser } = useUsers();

// Estado del Modal
const isModalOpen = ref(false);
const selectedUser = ref<User | null>(null);

// Lógica para abrir/cerrar modal
const openCreateModal = () => {
  selectedUser.value = null;
  isModalOpen.value = true;
};

const openEditModal = (user: User) => {
  selectedUser.value = user;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
};

// Acciones CRUD
const handleSaveUser = (userData: User) => {
  saveUser(userData);
};

const handleDelete = (id: number | string) => {
  if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
    deleteUser(id);
  }
};
</script>