import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const deefaultRouterList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('@/pages/home/index.vue'),
  },
  {
    path: '/hi/:name',
    name: 'Hi',
    component: () => import ('@/pages/hi/index.vue'),
  },
  {
    path: '/*',
    name: '404Page',
    component: () => import ('@/pages/404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: deefaultRouterList,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})

export default router
