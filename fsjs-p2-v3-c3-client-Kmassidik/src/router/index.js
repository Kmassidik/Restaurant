import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import NotFound from '../views/NotFoundPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue')
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/DetailPage.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name == 'favorites' && !localStorage.getItem('access_token')) {
    next({ name: 'login' })
  } else if (
    (to.name == 'login' || to.name == 'register') &&
    localStorage.getItem('access_token')
  ) {
    next({ name: 'home' })
  } else next()
})

export default router
