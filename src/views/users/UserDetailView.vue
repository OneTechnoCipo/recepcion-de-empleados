<template>
  <div class="max-w-3xl mx-auto mt-8">
    <button @click="router.back()" class="mb-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium flex items-center gap-1">
      ← Volver a la lista
    </button>

    <div v-if="user" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
      <div class="flex items-center gap-4 mb-6 pb-6 border-b dark:border-gray-700">
        <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
          {{ user.name.charAt(0).toUpperCase() }}
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ user.name }}</h1>
          <p class="text-gray-500 dark:text-gray-400">ID de Sistema: {{ user.id }}</p>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Información de Contacto</h3>
          <p class="mt-1 text-lg text-gray-900 dark:text-white flex items-center gap-2">
            ✉️ {{ user.email }}
          </p>
        </div>
        
        </div>
    </div>

    <div v-else class="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 class="text-xl font-bold text-red-600 mb-2">Usuario no encontrado</h2>
      <p class="text-gray-600 dark:text-gray-400">El ID proporcionado no corresponde a ningún usuario en el sistema.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsers } from '../../composables/useUsers';
import type { User } from '../../models/CustomModels';

const route = useRoute();
const router = useRouter();
const { getUserById } = useUsers();

const user = ref<User | undefined>(undefined);

onMounted(() => {
  // Obtenemos el parámetro ':id' de la URL
  const id = route.params.id as string;
  user.value = getUserById(id);
});
</script>