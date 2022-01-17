Vue.component('cart', {
  template: `
            <div class="cart">
              <div class='cart__window'>
                <div class='cart__content'>
                  <div class='cart__header'>
                    <h3 class='cart__title'>Корзина</h3>
                    <button v-on:click="onClick" class='cart__close small-button' type="button" title='Закрыть'><i class="fas fa-times"></i></button>
                  </div>
                  <div class='cart__body'>
                    <div class='cart__table table'>
                      <ul class="table__row-header">
                        <li class="table__row-cell table__title">Наименование</li>
                        <li class="table__row-cell table__title">Цена</li>
                        <li class="table__row-cell table__title">Стоимость</li>
                        <li class="table__row-cell table__title">Количество</li>
                      </ul>
                      <div v-if="isCartEmpty === false" class="cart__empty">Ваша корзина пуста...</div>
                      <ul :id="goods.id" class="table__row" v-for="goods of items">
                        <li class="table__row-cell">{{ goods.name }}</li>
                        <li class="table__row-cell">{{ goods.price }}</li>
                        <li class="table__row-cell">{{ goods.price * goods.count }}</li>
                        <li class="table__row-cell">{{ goods.count }}
                          <div class="table__btns">
                            <button v-on:action="onRemove" class="small-button" type='button'><i class="fas fa-minus"></i></button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `,
  props: ['items'],
  methods: {
    onClick() {
      this.$emit('close-cart');
    },
    onRemove(id) {
      this.$emit('removefromcart', id);
    }
  }
});