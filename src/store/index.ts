import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    session: "",
    username: "",
    permission: -1,
    mail: "",
    tag: "",
    color: -1,
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      localStorage.setItem('username', user);
      state.username = user.username;
      state.permission = user.permission;
      state.mail = user.mail;
      state.tag = user.tag;
      state.color = user.color;
    },
    setSession(state, session) {
      localStorage.setItem('session', session);
      state.session = session;
    }
  },
  actions: {},
  modules: {},
});
