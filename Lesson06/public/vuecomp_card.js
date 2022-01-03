Vue.component('card', {
  template: `
            <li :id="product.id" class="goods__item">
              <div class="goods__item-wrap">
                <button v-on:click="onClick" class="goods__item-addtocart">
                  <i class="fas fa-cart-plus"></i>
                  {{ actionname }}
                </button>
              </div>
              <img class="goods__img" src="https://source.unsplash.com/random/240x320?sig=${Math.trunc(Math.random() * 100)}" alt="Изображение${Math.trunc(Math.random() * 100)}">
              <ul class="goods__decs">
                <h3 class="goods__name">{{ product.name }}</h3>
                <p class="goods__price">{{ product.price }}</p>
              </ul>
            </li>
            `,
  props: ['product', 'actionname'],
  methods: {
    onClick() {
      this.$emit('action', this.product.id);
    }
  },
});