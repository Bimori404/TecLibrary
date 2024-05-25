import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { CtalogoView } from '../views/Catalog.vue';
// import { RouteRecordRaw } from 'vue-router';

// const routes: Array<RouteRecordRaw> = [
const routes = [
  {
    path: '',
    redirect: '/folder/Catalogo'
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  },
  // {
  //   path: '/folder/Catalogo',
  //   component: () => import ('../views/Catalog.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
