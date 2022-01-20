<template>
  <div class="home">
      <header class="container">
        <div class='menu'>
          <div class='menu__btns'>
            <button v-on:click="showCart" class='menu__cart-button large-button' type='button'>
              <font-awesome-icon icon="shopping-cart" />
              Корзина
            </button>
            <button class='menu__user-button large-button' type='button'>
              <font-awesome-icon icon="user" />
              ...
            </button>
            <button class='menu__shipping-button large-button' type='button'>
              <font-awesome-icon icon="shipping-fast" />
              ...
            </button>
            <filtering />
          </div>
        </div>
        <cart v-if="isCartVisible" :items="cartList" v-on:removefromcart="deleteProduct" v-on:close-cart="showCart"></cart>
      </header>

    <main class="goods container">
      <!-- <showcase></showcase> -->
      <showcase />
    </main>
  </div>
</template>

<script>
import cart from '../components/Cart.vue';
import showcase from  '../components/Showcase.vue';
import filtering from '../components/Filter.vue';

export default {
  name: 'Home',
  components: {
    cart,
    showcase,
    filtering
  },
  data() {
    return {
      isCartVisible: false,
      isCartEmpty: false
    }
  },
  methods: {
    showCart() {
      this.isCartVisible = !this.isCartVisible;
    }
  },

  mounted() {
  }
}
</script>

<style lang="scss">

// http://meyerweb.com/eric/tools/css/reset/
// v2.0 | 20110126
// License: none (public domain)
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
}

// HTML5 display-role reset for older browsers
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}

body {
    line-height: 1;
}

ol,
ul {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
    content: '';
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

// Colors
$clr-black: #000;
$clr-white: #fff;
$clr-hvr-text: #00308F;

//Math values
$site-width: 1140px;

::-webkit-scrollbar {
  display: none;
}

.container {
  max-width: $site-width - 40px;
  margin: 0 auto;
}

.hidden {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  margin: -1px;
}

.menu {
  display: flex;
  justify-content: center;

  &__btns {
    display: flex;
    justify-content: space-between;
    margin: 25px 0;
    width: calc(100% - 640px);
  }
}

.small-button {
  background-color: transparent;
  border: 1px solid $clr-black;
  border-radius: 3px;
  font-family: Tahoma, Geneva, sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: $clr-hvr-text;
    background-color: #F0F8FF;
    border: 1px solid #7CB9E8;
    transition: all 0.2s ease-in-out;
  }
}

.large-button {
  display: block;
  padding: 5px 15px;
  background-color: transparent;
  border: 2px solid $clr-black;
  border-radius: 3px;
  font-family: Tahoma, Geneva, sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 125px;
  height: 30px;

  &:hover {
    color: $clr-hvr-text;
    background-color: #F0F8FF;
    border: 2px solid #7CB9E8;
    transition: all 0.2s ease-in-out;
  }
}

</style>