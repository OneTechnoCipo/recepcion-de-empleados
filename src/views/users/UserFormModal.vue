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
            <input 
              v-model="dniInput" 
              type="text" 
              required 
              :disabled="isEditing"
              maxlength="8"
              @input="onDniInput"
              placeholder="Ej: 42123456"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-900 transition-all font-mono"
              :class="{'border-red-500 focus:ring-red-500 dark:border-red-500': dniError || isDniDuplicated}"
            />
            
            <p v-if="dniError" class="text-red-500 text-xs mt-1 font-medium flex items-center gap-1">
              <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 text-red-500" />
              El DNI debe tener entre 7 y 8 dígitos.
            </p>
            
            <p v-if="isDniDuplicated" class="text-red-500 text-xs mt-1 font-medium flex items-center gap-1">
              <Icon icon="heroicons:exclamation-triangle" class="w-4 h-4 text-red-500" />
              Este número de DNI ya pertenece a un empleado.
            </p>
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
            <input v-model.number="formData.standardWorkHours" type="number" required min="1" max="12"
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
          <button 
            type="submit" 
            :disabled="dniError || isDniDuplicated"
            class="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            <Icon icon="heroicons:check" class="w-5 h-5" />
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { Icon } from '@iconify/vue';
import type { Employee } from '../../models/CustomModels';
import { employees } from '../../data/employees'; 

// Manages the user creation and edition form, incorporating a dynamic 
// sector filter and real-time DNI duplication guard to prevent database errors.

const props = defineProps<{ isOpen: boolean; userToEdit: Employee | null; }>();
const emit = defineEmits<{ (e: 'close'): void; (e: 'save', user: Employee, isEditing: boolean): void; }>();

const isEditing = ref(false);
const dniInput = ref(''); 

const defaultForm = (): Employee => ({ id: 0, firstName: '', lastName: '', email: '', role: '', sector: '', standardWorkHours: 8, overtimeValue: 1.5 });
const formData = ref<Employee>(defaultForm());

// Watches the worker injection prop to reset the reactive state configuration accordingly
watch(() => props.userToEdit, (newVal) => {
  if (newVal) { 
    formData.value = { ...newVal }; 
    dniInput.value = newVal.id.toString(); 
    isEditing.value = true; 
  } else { 
    formData.value = defaultForm(); 
    dniInput.value = ''; 
    isEditing.value = false; 
  }
}, { immediate: true });

// Sanitize block that intercepts input streams and strips non-numeric characters using Regex structures
const onDniInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  dniInput.value = input.value.replace(/\D/g, ''); 
};

// Computes structural length failures to flag invalid DNI string configurations
const dniError = computed(() => {
  if (!dniInput.value) return false; 
  return dniInput.value.length < 7 || dniInput.value.length > 8;
});

// Scans the active staff database array dynamically to flag overlapping identities during creation steps
const isDniDuplicated = computed(() => {
  if (isEditing.value || !dniInput.value) return false;
  
  const currentId = parseInt(dniInput.value, 10);
  return employees.value.some(emp => emp.id === currentId);
});

// Helper string method that normalizes casing patterns across whitespace boundaries
const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Dispatches validated payloads up into root composables to trigger core state mutations
const handleSubmit = () => {
  if (dniError.value || isDniDuplicated.value) return;

  // Strict operational safety baseline constraint guard evaluating raw numbers
  if (formData.value.standardWorkHours <= 0 || formData.value.standardWorkHours > 12) {
    alert("⚠️ Las horas base diarias deben ser mayores a 0 y no pueden superar las 12 horas.");
    return;
  }

  formData.value.id = parseInt(dniInput.value, 10);

  // Normalizes target fields structure signatures prior to component communication steps
  formData.value.firstName = capitalizeWords(formData.value.firstName);
  formData.value.lastName = capitalizeWords(formData.value.lastName);
  formData.value.role = capitalizeWords(formData.value.role);
  formData.value.sector = capitalizeWords(formData.value.sector);

  emit('save', formData.value, isEditing.value);
  emit('close');
};
</script>