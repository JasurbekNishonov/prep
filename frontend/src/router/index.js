import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '../stores/index'
const routes = [
  {
    path: '/auth',
    name: 'AuthLayout',
    component: () => import('../views/authLayout.vue'),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../components/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../components/Register.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'HomeLayout',
    component: () => import('../views/HomeLayout.vue'),
    redirect: '/auth',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '/transaction',
        name: 'Transaction',
        component: () => import('../views/Transaction.vue'),
      },
      {
        path: '/history',
        name: 'History',
        component: () => import('../views/History.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/UserProfile.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if (to.meta.requireAuth && !store.isTokenValid()) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
