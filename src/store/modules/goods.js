const state = {
  selectGoods: []
};

const getters = {
  getSelectGoods (state) {
    return state.selectGoods;
  }
};

// 异步操作 --方法存储在this.$store.dispatch()内
const actions = {
  settlement ({commit}, param) {
    commit('updateSelectGoods', param);
  }
};

// 同步操作 --方法存储在this.$store.commit()内
const mutations = {
  updateSelectGoods (state, payload) {
    state.selectGoods = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
