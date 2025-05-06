import Vue from "vue";
import Router from "vue-router";
import HomeRanek from "./views/Home.vue";
import ProdutoRanek from "./views/Produto.vue";
import LoginRanek from "./views/Login.vue";
import UsuarioRanek from "./views/usuario/Usuario.vue";
import UsuarioProdutos from "./views/usuario/UsuarioProdutos.vue";
import UsuarioVendas from "./views/usuario/UsuarioVendas.vue";
import UsuarioCompras from "./views/usuario/UsuarioCompras.vue";
import UsuarioEditar from "./views/usuario/UsuarioEditar.vue";
import PaginaNaoEncontrada from "./views/PaginaNaoEncontrada.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: PaginaNaoEncontrada
    },
    {
      path: "/",
      name: "home",
      component: HomeRanek
    },
    {
      path: "/produto/:id",
      name: "produto",
      component: ProdutoRanek,
      props: true
    },
    {
      path: "/login",
      name: "login",
      component: LoginRanek
    },
    {
      path: "/usuario",
      component: UsuarioRanek,
      meta: {
        login: true
      },
      children: [
        {
          path: "",
          name: "usuario",
          component: UsuarioProdutos
        },
        {
          path: "compras",
          name: "compras",
          component: UsuarioCompras
        },
        {
          path: "vendas",
          name: "vendas",
          component: UsuarioVendas
        },
        {
          path: "editar",
          name: "usuario-editar",
          component: UsuarioEditar
        }
      ]
    }
  ],
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)) {
    if (!window.localStorage.token) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
