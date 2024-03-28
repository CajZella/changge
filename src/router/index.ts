import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
import Index from '@/views/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/conversation', // 设为对话页，保证一进入就渲染右侧页面
    children: [
      {
        path: '/conversation',
        name: 'conversation',
        component: () => import('@/views/conversation.vue')
      },
      {
        path: '/knowledgeBase',
        name: 'knowledgeBase',
        component: () => import('@/views/knowledgeBase.vue')
      },
      {
        path: '/agent',
        name: 'agent',
        component: () => import('@/views/agent.vue')
      }
    ]
  }

]
const router = createRouter({
  // 配置为Hash模式
  history: createWebHashHistory(),
  // 配置routes
  routes,
  // 路由跳转时返回顶部
  scrollBehavior () {
    return {top: 0}
  }
})
export default router;