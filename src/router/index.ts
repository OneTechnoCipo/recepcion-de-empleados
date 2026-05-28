
import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '../layouts/DashboardLayout.vue';

// 1. Definir rutas
// Cada ruta debe mapear a un componente.
// Usamos carga perezosa (lazy loading) para optimizar el rendimiento.
const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: { name: 'Dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import("../views/dashboard/DashboardView.vue"),
      },
      {
        path: 'attendance',
        name: 'Attendance',
        component: () => import("../views/attendance/AttendanceView.vue"),
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import("../views/users/UsersView.vue"),
      },
      {
        path: 'users/:id',  // Ruta dinámica solicitada en el TP
        name: 'UserDetail',
        component: () => import("../views/users/UserDetailView.vue"),
      },
    ],
  },
];

// 2. Crear instancia del router
// Se utiliza createWebHistory para un historial HTML5 (modo "history").
// Esto permite URLs limpias sin el hash (#).
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 3. Exportar el router para ser usado en la aplicación principal (main.ts)
export default router;
