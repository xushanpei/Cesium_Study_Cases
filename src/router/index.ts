import { createRouter, createWebHistory } from 'vue-router'
import Init from '../views/init.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Init
    },
    {
      path: '/tiles',
      name: 'tiles',
      component: () => import('@/views/tiles.vue'),
    },
  ]
})

export default router
