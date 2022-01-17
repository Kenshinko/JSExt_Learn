<template>
  <li :id="product.id" class="goods__item">
    <div class="goods__item-wrap">
      <button v-on:click="onClick" class="goods__item-addtocart">
        <i class="fas fa-cart-plus"></i>
        {{ actionname }}
      </button>
    </div>
    <img class="goods__img" :src="`${product.img}`" alt="Изображение">
    <ul class="goods__decs">
      <h3 class="goods__name">{{ product.name }}</h3>
      <p class="goods__price">{{ product.price }}</p>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'card',
  props: ['product', 'actionname'],
  methods: {
    onClick() {
      this.$emit('action', this.product.id);
    }
  },
}
</script>

<style lang="scss">

</style>