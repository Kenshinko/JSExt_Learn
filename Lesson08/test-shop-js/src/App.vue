<template>
  <div id="app">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/shoppingcart">Корзина</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showcase: null
    }
  },
  mounted() {
    this.$store.dispatch('loadShowcase');
    this.$store.dispatch('loadCart');
  }
}
</script>

<style lang="scss"></style>
