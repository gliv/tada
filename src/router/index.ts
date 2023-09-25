import { createRouter, createWebHistory } from 'vue-router'
import { nhost } from '@/main'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/views/TasksView.vue')
    },
    {
      path: '/tasks/:id',
      name: 'task',
      component: () => import('@/views/TaskDetailView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/UserProfileView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/auth/SignUpView.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/auth/SignInView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.path === '/profile' && !(await nhost.auth.isAuthenticatedAsync())) {
    return '/signin'
  }
  return true
})

export default router
