'use strict';

function send (onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {
 
  let xhr;

  if (window.XMLHttpRequest) {
    // Chrome, Mozilla, Opera, Safari
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    // Internet Explorer
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  for([key, value] of Object.entries(headers)) {
    xhr.setRequestHeader(key, value);
  }

  xhr.timeout = timeout; 
  xhr.ontimeout = onError;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if(xhr.status < 400) {
        onSuccess(xhr.responseText);
      } else if (xhr.status >= 400) {
        onError(xhr.status);
      }
    }
  }

  xhr.open(method, url, true);
  xhr.send(data);
}

function convertRow2Goods(event) {
  const id = +event.target.closest('.table__row').dataset.id;
  const name = event.target.closest('.table__row').dataset.name;
  const price = +event.target.closest('.table__row').dataset.price;

  if (event.target.classList.contains('fa-plus')) {
    myCart.addGoods({id, name, price});
  } else if (event.target.classList.contains('fa-minus')) {
    myCart.removeGoods(id);
  }

  myCart.update();
}

function getCounter() {
  let last = 0;

  return () => ++last;
}

const stackIDGenrator = getCounter();
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

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
    const index = this.list.findIndex((stack) => stack.getGoodsId() === goods.id);

    if (index >= 0) {
      this.list[index].addGoods();
    } else {
      this.list.push(new GoodsStack(goods));
    }
    document.querySelector('.cart__empty').classList.add('hidden');
  }

  removeGoods(id) {
    const index = this.list.findIndex((stack) => stack.getGoodsId() === id);

    if (index >= 0) {
      this.list[index].removeGoods();

      if (this.list[index].getCount() <= 0) {
        this.list.splice(index, 1);
      }
    }

    if (this.list == false) {
      document.querySelector('.cart__empty').classList.remove('hidden');
    }
  }
}

class Showcase {
  constructor(cart) {
    this.list = [];
    this.cart = cart;
  }

  #onSuccess(response) {
    const data = JSON.parse(response);

    data.forEach(product => {
      this.list.push(
        new Goods({id: product.id_product, name:product.product_name, price:product.price})
      )
    });
  }

  #onError(err) {
    console.log(err);
  }

  fetchGoods() {
    send(this.#onError, this.#onSuccess.bind(this), `${API_URL}/catalogData.json`);
  }

  // fetchAddResult(id) {
  //     send(this.#onError, this.addToCart( id), `${API_URL}/addToBasket.json`);
  // }

  addToCart(id) {
    const index = this.list.findIndex((goods) => id === goods.id);

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

  #onSuccess(response) {
    const data = JSON.parse(response);

    data.contents.forEach(product => {
      this.addGoods(
        new Goods ({id: product.id_product, name: product.product_name, price: product.price})
      )
    });

    this.renderCart();
  }

  #onError(err) {
    console.log(err);
  }

  addToCartOnResponse(target) {
    if (this.fetchResponse) {
      const goodsName = target.closest('.goods__item').querySelector('.goods__name').innerText;

      for (let i = 0; i < myCart.list.length; i++) {
        if (myCart.list[i].goods.name === goodsName) {
          myCart.addGoods(myCart.list[i].goods);
        }
  
      myCart.update();
      }
    }
  }

  renderCart() {
    for (let i = 0; i < this.list.length; i++) {
      const item = `<div class='cart__table table'>
                      <ul class="table__row" data-id='${this.list[i].goods.id}' data-name='${this.list[i].goods.name}' data-price='${this.list[i].goods.price}'>
                        <li class="table__row-cell">${this.list[i].goods.name}</li>
                        <li class="table__row-cell">${this.list[i].goods.price}</li>
                        <li class="table__row-cell">${(this.list[i].goods.price * this.list[i].count)}</li>
                        <li class="table__row-cell">${this.list[i].count}
                          <div class="table__btns">
                            <button class="small-button" type='button' onclick='convertRow2Goods(event)'><i class="fas fa-plus"></i></button>
                            <button class="small-button" type='button' onclick='convertRow2Goods(event)'><i class="fas fa-minus"></i></button>
                          </div>
                        </li>
                      </ul>
                    </div>`;
        document.querySelector('.cart__body')
                .insertAdjacentHTML('beforeend', item);
    }
  }

  fetchCartList() {
      send(this.#onError.bind(this), this.#onSuccess.bind(this), `${API_URL}/getBasket.json`);
  }

  fetchResponse() {
    send(this.#onError.bind(this), this.getTrue.bind(this), `${API_URL}/addToBasket.json`);
  }

  getTrue(response) {
    const data = JSON.parse(response);
    if (data) {
      this.addToCartOnResponse(document.querySelector('.goods__list'));
    }
  }

  update() {
    const currentCartTable = document.querySelectorAll('.table__row');

    for (let i = currentCartTable.length - 1; i > 0; i--) {
      currentCartTable[i].remove();
    }

    return this.renderCart();
  }
}

const cart = new Cart();
const showcase = new Showcase(cart);
const myCart = new CartProduct(cart);

showcase.fetchGoods();
myCart.fetchCartList();

setTimeout(() => {
  // showcase.addToCart(123);
  // showcase.addToCart(123);
  // showcase.addToCart(123);
  // showcase.addToCart(456);
  // cart.removeGoods(123);

  const glr = new GoodsListRender(showcase.list, '.goods__list');
  glr.renderList();
  // myCart.renderCart();
  
  console.log(showcase, cart);
}, 1000)

document.querySelector('.menu__cart-button')
        .addEventListener('click', () => {
  document.querySelector('.cart').classList.remove('hidden');
});

document.querySelector('.cart__close')
        .addEventListener('click', () => {
  document.querySelector('.cart').classList.add('hidden');
});

document.querySelector('.goods__list')
        .addEventListener('click', ({target}) => {
          if (target.localName === 'button'){
            console.log(target);
            myCart.fetchResponse();
          }

});