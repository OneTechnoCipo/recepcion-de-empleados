<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
      <div class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
          {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          ✕
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre Completo</label>
          <input 
            v-model="formData.name" 
            type="text" 
            required
            minlength="3"
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ej: Mariano Collazo"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
          <input 
            v-model="formData.email" 
            type="email" 
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Ej: correo@ejemplo.com"
          />
        </div>

        <div class="pt-4 flex justify-end gap-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-lg transition">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { User } from '../../models/CustomModels';

const props = defineProps<{
  isOpen: boolean;
  userToEdit: User | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', user: User): void;
}>();

// Estado local del formulario
    const formData = ref<User>({ id: 0, name: '', email: '' });
    const isEditing = ref(false);

// Vigilar los cambios en la prop userToEdit para rellenar el formulario
watch(() => props.userToEdit, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal };
    isEditing.value = true;
  } else {
    formData.value = { id: 0, name: '', email: '' };
    isEditing.value = false;
  }
});

const handleSubmit = () => {
  // Validación básica extra además del 'required' de HTML5
  if (formData.value.name.trim() === '' || formData.value.email.trim() === '') {
    alert('Por favor, completa todos los campos.');
    return;
  }
  emit('save', formData.value);
  emit('close');
};
</script>