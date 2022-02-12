import { TokenService } from '@/services/token.service';
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import ('../views/LoginPage.vue'),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/profile/edit',
    name: 'routes.edit_profile',
    component: () => import ('../views/EditProfilePage.vue'),
    meta: {
      public: true,
    }
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
  },
  {
    path: '/imprint',
    name: 'routes.imprint',
    component: () => import ('../views/ImprintPage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Redirect to login page if not logged in.
// Redirect to explore page if logged in and visiting content pages.

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/explore');
  }

  next();
})


export default router
