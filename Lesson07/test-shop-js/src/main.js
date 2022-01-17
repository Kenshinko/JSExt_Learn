import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Импортирование Fonts Awesome в проект
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faUser, faShippingFast, faTimes, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faShoppingCart, faUser, faShippingFast, faTimes, faMinus);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
  render: h => h(App)
}).$mount('#app')