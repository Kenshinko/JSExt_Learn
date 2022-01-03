Vue.component('showcase', {
  template: `
            <ul class="goods__list">
              <card v-for="goods of list" :product="goods" v-on:action="addGoods" :actionname="'Добавить в корзину'"></card>
            </ul>
            `,
  props: ['list'],
  methods: {
    addGoods(id) {
      this.$emit('addtocart', id);
    }
  },
});