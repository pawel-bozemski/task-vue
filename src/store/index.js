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
            text: "Lorem Ipsum",
          },
          {
            author: "Spiderman",
            text: "Lorem Ipsum",
          },
          {
            author: "Spiderman",
            text: "Lorem Ipsum",
          },
          {
            author: "Spiderman",
            text: "Lorem Ipsum",
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
      });
    },
    EDIT_TASK(state, payload) {
      const task = state.objects.find((item) => item.id === payload.id);
      task.specialist = payload.specialist;
      task.title = payload.title;
      task.descritpion = payload.descritpion;
      task.status = payload.status;
      task.attachments = payload.attachment;
    },
    REMOVE_TASK(state, payload) {
      state.tasks.filter((item) => item.id !== payload.id);
    },
    ADD_COMMENT(state, payload) {
      const task = state.objects.find((item) => item.id === payload.id);
      task.comments.push({
        author: payload.author,
        text: payload.text,
      });
    },
    REMOVE_COMMENT(state, payload) {
      const task = state.objects.find((item) => item.id === payload.id);
      task.comments.filter((item) => item.author !== payload.author);
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
