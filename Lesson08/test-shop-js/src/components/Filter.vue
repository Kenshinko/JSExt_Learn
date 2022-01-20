<template>
  <div class="regexp__search">
    <input v-model="searchString" class="regexp__input" type="text">
  </div>
</template>

<script>
export default {
  name: 'filtering',
  computed: {
    searchString: {
      get() {return this.store.getters.getSearchString},
      set(value) {this.$store.commit('setSearchString', value)}
    }
  }
}
</script>

<style lang="scss">

</style>