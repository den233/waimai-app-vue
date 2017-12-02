// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';
import Seller from './components/seller/seller';
import './common/stylus/index.stylus';

import store from './store/index';
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
// 如果Web服务器无法处理编码为application/json的请求，你可以启用emulateJSON选项。启用该选项后，请求会以application/x-www-form-urlencoded作为MIME type。
Vue.http.options.emulateJSON = true;
// 如果Web服务器无法处理PUT, PATCH和DELETE这种REST风格的请求，你可以启用enulateHTTP现象。启用该选项后，请求会以普通的POST方法发出，并且HTTP头信息的X-HTTP-Method-Override属性会设置为实际的HTTP方法。
Vue.http.options.emulateHTTP = true;

let router = new VueRouter({
  mode: 'history',
  base: '/app/',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
