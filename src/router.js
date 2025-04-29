import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
  scrollBehavior() {
    // Função para rolar a página para o topo ao mudar de rota
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
});
