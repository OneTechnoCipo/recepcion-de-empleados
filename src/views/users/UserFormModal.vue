<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col border border-gray-100 dark:border-gray-700">
      
      <div class="p-5 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Icon :icon="isEditing ? 'heroicons:pencil-square' : 'heroicons:user-plus'" class="w-6 h-6 text-blue-600" />
          {{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
          <Icon icon="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4 overflow-y-auto flex-1">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <Icon icon="heroicons:identification" class="w-4 h-4 text-gray-400" /> DNI
            </label>
            <input v-model.number="formData.id" type="number" required :disabled="isEditing"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 transition-all"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <Icon icon="heroicons:envelope" class="w-4 h-4 text-gray-400" /> Email
            </label>
            <input v-model="formData.email" type="email" required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
            <input v-model="formData.firstName" type="text" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido</label>
            <input v-model="formData.lastName" type="text" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <Icon icon="heroicons:briefcase" class="w-4 h-4 text-gray-400" /> Puesto
            </label>
            <input v-model="formData.role" type="text" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <Icon icon="heroicons:building-office" class="w-4 h-4 text-gray-400" /> Sector
            </label>
            <input v-model="formData.sector" type="text" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <Icon icon="heroicons:clock" class="w-4 h-4 text-gray-400" /> Horas Base
            </label>
            <input v-model.number="formData.standardWorkHours" type="number" required min="1" max="24"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
              <Icon icon="heroicons:calculator" class="w-4 h-4 text-gray-400" /> Mult. Extra
            </label>
            <input v-model.number="formData.overtimeValue" type="number" step="0.1" required
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div class="pt-6 flex justify-end gap-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors">
            Cancelar
          </button>
          <button type="submit" class="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-all">
            <Icon icon="heroicons:check" class="w-5 h-5" />
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import type { Employee } from '../../models/CustomModels';

const props = defineProps<{ isOpen: boolean; userToEdit: Employee | null; }>();
const emit = defineEmits<{ (e: 'close'): void; (e: 'save', user: Employee, isEditing: boolean): void; }>();

const isEditing = ref(false);
const defaultForm = (): Employee => ({ id: 0, firstName: '', lastName: '', email: '', role: '', sector: '', standardWorkHours: 8, overtimeValue: 1.5 });
const formData = ref<Employee>(defaultForm());

watch(() => props.userToEdit, (newVal) => {
  if (newVal) { formData.value = { ...newVal }; isEditing.value = true; }
  else { formData.value = defaultForm(); isEditing.value = false; }
}, { immediate: true });

const handleSubmit = () => {
  emit('save', formData.value, isEditing.value);
  emit('close');
};
</script>