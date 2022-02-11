import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import ('../views/LoginPage.vue')
  },
  {
    path: '/profile/edit',
    name: 'routes.edit_profile',
    component: () => import ('../views/EditProfilePage.vue')
  },
  {
    path: '/profile/:id',
    name: 'routes.profile',
    component: () => import ('../views/ProfileDetailsPage.vue')
  },
  {
    path: '/explore',
    name: 'routes.explore',
    component: () => import ('../views/ExplorePage.vue'),
  },
  {
    path: '/matches',
    name: 'routes.matches',
    component: () => import ('../views/MatchesPage.vue'),
  },
  {
    path: '/messages/:id',
    name: 'routes.messages',
    component: () => import ('../views/MessagesPage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
