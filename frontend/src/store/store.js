import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isNav: false
  },
  mutations: {
    changeTitle(state) {
      state.isNav = !state.isNav;
    }
  }
});
