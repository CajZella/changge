// src/router/index.ts

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Start from "../components/Start.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Start',
    component: Start,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
