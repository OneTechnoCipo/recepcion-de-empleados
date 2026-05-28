import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '../layouts/DashboardLayout.vue';

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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;