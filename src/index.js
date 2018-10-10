require('es6-promise/auto');
import Vue from 'vue';
import VueRouter from 'vue-router';
import routerConfig from 'router';
import Layout from './components/Layout.vue';
import store from './store';

import myStorage from './Storage';

import VueCookies from 'vue-cookies'; //https://www.npmjs.com/package/vue-cookies
Vue.use(VueCookies);

Vue.use(VueRouter);
const router = new VueRouter(routerConfig);

require('./scss/_reset.scss');

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(Layout),
  mounted: function() {
    store.commit('initToken');
    // document.dispatchEvent(new Event('render-event'));
    setTimeout(() => {
      document.dispatchEvent(new Event('render-event'));
    }, 5000);
    // this.$nextTick(()=>{
    //   document.dispatchEvent(new Event('render-event'));
    // })
  },
  destroyed: () => {}
});
