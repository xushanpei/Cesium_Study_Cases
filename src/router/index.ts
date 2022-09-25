import { createRouter, createWebHistory } from 'vue-router'
import Init from '../views/init.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Init
    }
  ]
})

export default router
