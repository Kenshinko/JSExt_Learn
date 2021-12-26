'use strict';

function getCounter() {
  let last = 0;

  return () => ++last;
}

const stackIDGenrator = getCounter()

class Goods {
  constructor({id, name, price}) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }
}

class GoodsStack {
  constructor(goods) {
    this.id = stackIDGenrator();
    this.goods = goods;
    this.count = 1;
  }

  getGoodsId() {
    return this.goods.id;
  }

  getGoods() {
    return this.goods;
  }

  getCount() {
    return this.count;
  }

  addGoods() {
    this.count++;
    return this.count;
  }

  removeGoods() {
    this.count--;
    return this.count;
  }
}

class Cart {
  constructor() {
    this.list = [];
  }

  addGoods(goods) {
    const index = this.list.findIndex((stack) => stack.getGoodsId() === goods.id)

    if (index >= 0) {
      this.list[index].addGoods();
    } else {
      this.list.push(new GoodsStack(goods));
    }
    document.querySelector('.cart__empty').classList.add('hidden');
  }

  removeGoods(id) {
    const index = this.list.findIndex((stack) => stack.getGoodsId() === id)

    if (index >= 0) {
      this.list[index].removeGoods();

      if (this.list[index].getCount() <= 0) {
        this.list.splice(index, 1);
      }
    }
  }
}

class Showcase {
  constructor(cart) {
    this.list = [];
    this.cart = cart;
  }

  fetchGoods() {
    this.list = [
      new Goods ({id: 1, name: 'Футболка', price: 140}),
      new Goods ({id: 2, name: 'Брюки', price: 320}),
      new Goods ({id: 3, name: 'Галстук', price: 54}),
      new Goods ({id: 4, name: 'Носки', price: 14}),
    ];
  }

  addToCart(id) {
    const index = this.list.findIndex((goods) => id === goods.id)

    if (index >= 0) {
      this.cart.addGoods(this.list[index]);
    }
  }
}

class RenderGoods extends Goods {
  constructor({id, name, price}, className) {
    super({id, name, price});
    this.className = className;
  }

  renderGoods() {
    const item = `<li class='goods__item'>
                    <div class="goods__item-wrap">
                      <button class="goods__item-addtocart">
                        <i class="fas fa-cart-plus"></i>
                        Добавить в корзину
                      </button>
                    </div>
                    <img class='goods__img' src='https://source.unsplash.com/random/240x320?sig=${Math.trunc(Math.random() * 100)}' alt='Изображение${Math.trunc(Math.random() * 100)}'>
                    <ul class='goods__decs'>
                      <h3 class='goods__name'>${this.name}</h3>
                      <p class='goods__price'>${this.price}</p>
                    </ul>
                  </li>`;
    document.querySelector(this.className)
            .insertAdjacentHTML('beforeend', item);
  }
}

class GoodsListRender {
  constructor(goodsList, className) {
    this.goodsRenderListCache = [];
    for (let i = 0; i < goodsList.length; i++) {
      this.goodsRenderListCache.push(new RenderGoods(goodsList[i], className));
    }
  }

  renderList() {
    for (let i = 0; i < this.goodsRenderListCache.length; i++) {
      this.goodsRenderListCache[i].renderGoods();
    }
  }
}

class CartProduct extends Cart {
  constructor(cart) {
    super();
    this.list = cart.list;
  }

  renderCart() {
    for (let i = 0; i < this.list.length; i++) {
      const item = `<div class='cart__item'>
                      <div>${this.list[i].goods.name}</div>
                      <div>
                        <span class='cart__item-count'>${this.list[i].count}</span> шт.
                      </div>
                      <div class='cart__price'>$${this.list[i].goods.price}</div>
                      <div>
                        $<span class='cart__totalprice'>${(this.list[i].goods.price * this.list[i].count).toFixed(2)}</span>
                      </div>
                    </div>`;
        document.querySelector('.cart__body')
                .insertAdjacentHTML('beforeend', item);      
    }
  }
}

const cart = new Cart();
const showcase = new Showcase(cart);

showcase.fetchGoods();
const glr = new GoodsListRender(showcase.list, '.goods__list');
glr.renderList();

showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(3);

const abs = new CartProduct(cart);

abs.renderCart();

console.log(showcase, cart);

document.querySelector('.menu__cart-button')
        .addEventListener('click', () => {
  document.querySelector('.cart').classList.remove('hidden');
});

document.querySelector('.cart__close')
        .addEventListener('click', () => {
  document.querySelector('.cart').classList.add('hidden');
});

