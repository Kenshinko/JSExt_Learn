const API_URL = 'http://localhost:3000/api/v1';

new Vue({
  el: '#application',
  data: {
    showcaseList: [
      {id: 1, name: "iPhone", price: 300}
    ],
    cartList: [
      {id: 1, name: "iPhone", price: 300, count: 1}
    ],
    isCartVisible: false,
    isCartEmpty: false
  },

  methods: {
    showCart() {
      this.isCartVisible = !this.isCartVisible;
    },

    addProduct(id) {
      const product = this.showcaseList.find((goods) => goods.id === id)

      fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
      })
        .then(() => {
          this.cartList.push(product);
        })
    },

    deleteProduct(id) {
      const productID = this.cartList.findIndex((goods) => goods.id === id)

      fetch(`${API_URL}/cart`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.cartList[productID])
      })
        .then(() => {
          this.cartList.splice(productID, 1)
        })
    }
  },

  mounted() {
    fetch(`${API_URL}/showcase`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      this.showcaseList = data;
    });

    fetch(`${API_URL}/cart`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      this.cartList = data;
    });
  }
});