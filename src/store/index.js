import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        specialist: "Peter Parker",
        title: "Train web swingning",
        descritpion: "You need to swing faster!",
        status: "Pending",
        attachments: "none",
        comments: [
          {
            author: "Kingpin",
            text: "No need to do that",
          },
          {
            author: "MJ",
            text: "Let's go on a trip!",
          },
        ],
      },
      {
        id: 2,
        specialist: "Batman",
        title: "New batarangs",
        descritpion: "We need to develop remote controlled batarangs",
        status: "Done",
        attachments: "none",
        comments: [
          {
            author: "Mr Fox",
            text: "It is done Mr Wayne",
          },
        ],
      },
      {
        id: 3,
        specialist: "Darth Vader",
        title: "Dinner with son",
        descritpion: "Some catching up to do, dinner in Mos Eisley",
        status: "Active",
        attachments: "none",
        comments: [],
      },
    ],
  },
  mutations: {
    ADD_TASK(state, payload) {
      state.tasks.push({
        id: payload.id,
        specialist: payload.specialist,
        title: payload.title,
        descritpion: payload.descritpion,
        status: payload.status,
        attachments: payload.attachment,
        comments: payload.comments,
      });
    },
    EDIT_TASK(state, payload) {
      const task = state.tasks.find((item) => item.id === payload.id);
      task.specialist = payload.specialist;
      task.title = payload.title;
      task.descritpion = payload.descritpion;
      task.status = payload.status;
      task.attachments = payload.attachments;
    },
    REMOVE_TASK(state, payload) {
      const i = state.tasks.map((item) => item.id).indexOf(payload.id);
      state.tasks.splice(i, 1);
    },
    ADD_COMMENT(state, payload) {
      const task = state.tasks.find((item) => item.id === payload.id);
      task.comments.push({
        author: payload.author,
        text: payload.text,
      });
    },
    REMOVE_COMMENT(state, payload) {
      const i = state.tasks.filter((item) => item.id == payload.id);
      const comments = i[0].comments.filter(
        (item) => item.text != payload.text
      );
      i[0].comments = comments;
    },
  },
  actions: {
    addTask({ commit }, payload) {
      commit(`ADD_TASK`, payload);
    },
    editTask({ commit }, payload) {
      commit(`EDIT_TASK`, payload);
    },
    removeTask({ commit }, payload) {
      commit(`REMOVE_TASK`, payload);
    },
    addComment({ commit }, payload) {
      commit(`ADD_COMMENT`, payload);
    },
    removeComment({ commit }, payload) {
      commit(`REMOVE_COMMENT`, payload);
    },
  },
  getters: {
    getTaskById: (state) => (id) => {
      return state.tasks.find((task) => task.id == id);
    },
  },
});
