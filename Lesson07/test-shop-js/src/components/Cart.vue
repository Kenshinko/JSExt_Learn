<template>
<div class="cart">
              <div class='cart__window'>
                <div class='cart__content'>
                  <div class='cart__header'>
                    <h3 class='cart__title'>Корзина</h3>
                    <button v-on:click="onClick" class='cart__close small-button' type="button" title='Закрыть'><font-awesome-icon icon="times" /></button>
                  </div>
                  <div class='cart__body'>
                    <div class='cart__table table'>
                      <ul class="table__row-header">
                        <li class="table__row-cell table__title">Наименование</li>
                        <li class="table__row-cell table__title">Цена</li>
                        <li class="table__row-cell table__title">Стоимость</li>
                        <li class="table__row-cell table__title">Количество</li>
                      </ul>
                      <div v-if="isCartEmpty == true" class="cart__empty">Ваша корзина пуста...</div>
                      <ul :id="goods.id" class="table__row" v-for="goods of items" v-bind:key="goods.id">
                        <li class="table__row-cell">{{ goods.name }}</li>
                        <li class="table__row-cell">{{ goods.price }}</li>
                        <li class="table__row-cell">{{ `${goods.price * goods.count}` }}</li>
                        <li class="table__row-cell">{{ goods.count }}
                          <div class="table__btns">
                            <button :id="goods.id" v-on:click="onRemove" class="small-button" type='button'><font-awesome-icon icon="minus" /></button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
</template>

<script>
import card from './Card.vue'

export default {
  name: 'cart',
  components: {
    card,
  },
  props: ['items'],
  methods: {
    onClick() {
      this.$emit('close-cart');
    },
    onRemove(id) {
      this.$emit('removefromcart', id);
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

.cart {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #92929294;
  z-index: 1;
  margin: 0;
  padding: 0;

  &__window {
    position: relative;
    max-width: 768px;
    margin: 150px auto;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: $clr-white;
    background-clip: padding-box;
    border: 1px solid $clr-hvr-text;
    border-radius: .3rem;
    box-shadow: 0 5px 15px $clr-black;
    outline: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #eceeef;
  }

  &__title {
    font-family: Tahoma, Geneva, sans-serif;
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 24px;
    font-weight: 500;
  }

  &__close {
    float: right;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    color: $clr-black;
    text-shadow: 0 1px 0 $clr-white;
    opacity: .5;
    text-decoration: none;

    &:focus,
    &:hover {
      color: $clr-black;
      text-decoration: none;
      cursor: pointer;
      opacity: .75;
    }
  }

  &__body {
    position: relative;
    flex: 1 1 auto;
    padding: 15px;
    overflow: auto;
  }

  &__empty {
    width: 736px;
    height: 56px;
    border-right: 1px solid $clr-black;
    border-bottom: 1px solid $clr-black;
    border-left: 1px solid $clr-black;
    box-sizing: border-box;
    font-family: Tahoma, Geneva, sans-serif;
    font-size: 24px;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__item {
    font-family: Tahoma, Geneva, sans-serif;
    font-size: 16px;
    display: flex;
    justify-content: space-around;
  }

  &__table {
    width: 100%;
  }
}

.table {

  &__title {
    font-family: Tahoma, Geneva, sans-serif;
    font-size: 16px;
    font-weight: 900;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    border-top: 1px solid $clr-black;
    border-left: 1px solid $clr-black;

    &-header {
      display: flex;
      border-top: 1px solid $clr-black;
      border-left: 1px solid $clr-black;
    }

    &-cell {
      padding: 0;
      margin: 0;
      border-bottom: 1px solid $clr-black;
      border-right: 1px solid $clr-black;
      box-sizing: border-box;
      width: calc(100% / 4);
      padding: 5px 10px;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__btns {
    display: flex;
    justify-content: space-around;
    width: 40%;
  }
}

</style>