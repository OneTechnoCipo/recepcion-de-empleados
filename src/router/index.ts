import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '../layouts/DashboardLayout.vue';

// Defines the SPA navigation routes, dynamically connecting 
// the Users, Attendance, and History views without reloading the browser.

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
        path: 'users/:id',
        name: 'UserDetail',
        component: () => import("../views/users/UserDetailView.vue"),
      },
    ],
  },
];

// Instantiates the core Vue Router engine leveraging modern HTML5 history mode mapping
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;