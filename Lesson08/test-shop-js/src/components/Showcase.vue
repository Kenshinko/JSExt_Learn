<template>
  <ul class="goods__list">
    <card v-for="goods of list" :product="goods" v-on:click="addGoods" :actionname="'Добавить в корзину'" v-bind:key="goods.id"></card>
  </ul>
</template>

<script>
import card from './Card.vue';

export default {
  name: 'showcase',
  components: {
    card,
  },
    computed: {
    list() {
      return this.$store.getters.getShowcase;
    }
  },
  methods: {
    addGoods(product) {
      this.$store.dispatch('addToCart', product);
    }
  }
}
</script>

<style lang="scss">

// Colors
$clr-black: #000;
$clr-white: #fff;
$clr-hvr-text: #00308F;

//Math values
$site-width: 1140px;

.goods {
  display: flex;
  justify-content: space-around;

  &__list {
    min-width: 600px;
    min-height: 370px;
    display: flex;
    justify-content: space-between;
    border: 1px solid $clr-black;
    border-radius: 3px;
    padding: 5px;
  }

  &__item {
    position: relative;
    margin: 0 15px;

    &-wrap {
      position: absolute;
      width: 100%;
      height: 330px;
      left: 0;
      top: 0;
      background: rgba(34, 32, 32, 0.86);
      opacity: 0;
      justify-content: center;
      align-items: center;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__item-addtocart {
    position: absolute;
    top: 45%;
    left: 12%;
    background: none;
    border: 1px solid $clr-white;
    color: $clr-white;
    align-items: center;
    padding: 10px 14px;
    font-size: 14px;
    cursor: pointer;
  }

  &__img {
    object-fit: cover;
    max-width: 240px;
    max-height: 320px;
  }

  &__decs {
    position: relative;
    display: flex;
    justify-content: space-between;

    &:before {
      position: absolute;
      background-color: $clr-black;
      content: '';
      width: 100%;
      height: 2px;
      right: 0;
      top: 5px;
    }
  }

  &__name {
    font-family: Tahoma, Geneva, sans-serif;
    font-size: 24px;
    letter-spacing: -0.4px;
    font-weight: 700;
    margin-top: 10px;
  }

  &__price {
    font-family: Tahoma, Geneva, sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin-top: 15px;
  }
}

</style>