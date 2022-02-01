import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        specialist: "Dickerson",
        title: "Macdonald",
        descritpion: "Lorem ipsum",
        status: "Active",
        attachments: "none",
      },
      {
        id: 2,
        specialist: "Nonenon",
        title: "Macdonald",
        descritpion: "Lorem ipsum",
        status: "Active",
        attachments: "none",
      },
      {
        id: 3,
        specialist: "mamamija",
        title: "Macdonald",
        descritpion: "Lorem ipsum",
        status: "Active",
        attachments: "none",
      },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    getTaskById: (state) => (id) => {
      return state.tasks.find((task) => task.id == id);
    },
  },
});
