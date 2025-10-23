import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';

const routes = [
  { path: '/', component: Home },
  //{ path: '/editar/:id', component: TareaForm, props: true },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});