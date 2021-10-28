import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    menus: {
      services: [
        { name: "Compute", id: 1 },
        { name: "DB", id: 2 },
        { name: "Network", id: 3 },
        { name: "Storage", id: 4 },
        { name: "Access Key", id: 5 }
      ],
      policies: [
        { name: "Network ACL", id: 1 },
        { name: "Security Group", id: 2 }
      ]
    }
  }
});
