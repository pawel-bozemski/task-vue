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
        comments: [
          {
            author: "Spiderman",
            text: "Lorem Ipsuma",
          },
          {
            author: "Spiderman",
            text: "Lorem",
          },
          {
            author: "Spiderman",
            text: "Lorem ssss",
          },
          {
            author: "Spiderman",
            text: "Lorem ddadaa",
          },
        ],
      },
      {
        id: 2,
        specialist: "Nonenon",
        title: "Macdonald",
        descritpion: "Lorem ipsum",
        status: "Active",
        attachments: "none",
        comments: [
          {
            author: "Superman",
            text: "Lorem Ipsum",
          },
        ],
      },
      {
        id: 3,
        specialist: "mamamija",
        title: "Macdonald",
        descritpion: "Lorem ipsum",
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
      task.attachments = payload.attachment;
    },
    REMOVE_TASK(state, payload) {
      const i = state.tasks.map((item) => item.id).indexOf(payload.id);
      state.tasks.splice(i, 1);
    },
    ADD_COMMENT(state, payload) {
      const task = state.tasks.find((item) => item.id === payload.id);
      console.log(task.comments)
      console.log(payload)
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
