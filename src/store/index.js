import Vuex from 'vuex';
import Vue from 'vue';
import goods from './modules/goods';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    goods
  }
});
