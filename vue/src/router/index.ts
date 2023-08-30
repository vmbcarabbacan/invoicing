// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import menus from '@/utils/menus'
import { computed } from 'vue'

const routes = [
  {
    path: '/',
    components: {
      default: () => import('@/layouts/default/Default.vue'),
      aside: () => import('@/layouts/default/Aside.vue')
    },
    name: 'Home',
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: menus,
  },
  {
    path: '/sign-in',
    name: 'Login',
    meta: { requiresAuth: false },
    component: () => import('@/views/Signin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const isLoggedIn = computed(() => { return auth.isLoggedIn })

  if(to.meta.requiresAuth && !isLoggedIn.value) next({ name: 'Login' })
  else if(isLoggedIn.value && to.name === 'Login') next({ name: 'Home' })
  else next()
})

export default router
