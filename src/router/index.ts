import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/login',
  //   component: Login
  // },

]
const router = createRouter({
  routes,
  // 路由模式
  history: createWebHistory()
})
export default router;