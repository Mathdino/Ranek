<template>
  <ul v-if="paginasTotal > 1">
    <li v-for="pagina in paginasTotal" :key="pagina">
      <router-link :to="{ query: query(pagina) }">
        {{ pagina }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProdutosPaginar',
  props: {
    produtosTotal: {
      type: Number,
      default: 1,
    },
    produtosPorPagina: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    query(pagina) {
      //Função para pegar o query antiga do site e adicionar o _page com o n° da página
      //Por exemplo: Quando pesquisar notebook no "Buscar" a url será : https://localhost:8080/?q=notebook e depois que formos para a pag 2 dos notebook , o url ficará : https://localhost:8080/?q=notebook&_page=2
      return {
        ...this.$route.query,
        _page: pagina,
      };
    },
  },
  computed: {
    paginas() {
      //Função para pegar o total de páginas
      const current = Number(this.$route.query._page);
      const range = 9; // Mude o total de páginas que serão mostradas
      const offset = Math.ceil(range / 2);
      const total = this.paginasTotal;
      const pagesArray = [];

      for (let i = 1; i <= total; i++) {
        pagesArray.push(i);
      }

      pagesArray.splice(0, current - offset);
      pagesArray.splice(range, total);

      return pagesArray;
    },
    totalPaginas() {
      const total = this.produtosTotal / this.produtosPorPagina;
      return total !== Infinity ? Math.ceil(total) : 0;
      // Se o total for infinito, retorna 0, senão retorna o número de páginas
      // Math.ceil arredonda o valor para cima, então esse calculo retornará o número de páginas
    },
  },
};
</script>

<style scoped>
ul {
  grid-column: 1 / -1;
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>
