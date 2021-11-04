/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    userSnapshot: null,
  },
  mutations: {
    setUser(state, value) {
      if (value.user) {
        state.isAuthenticated = true;
        state.user = value.user;
      } else {
        state.user = null
        state.isAuthenticated = false
        state.isAdmin = false
      }
    },
    setAdmin(state) {
      state.isAdmin = true
    },
    setUsers(state, value) {
      state.users = value;
    }
  },
  actions: {
    getUsers({ state, commit }) {
      if (state.users.length === 0) {
        state.userSnapshot = db.collection('users').onSnapshot((snapshot) => {
          let users = []
          snapshot.forEach((doc) => {
            users.push({
              id: doc.id,
              ...doc.data()
            })
          })
          commit('setUsers', users)
        })
      }
    },
    fetchUser(context, value) {
      context.commit('setUser', value)
    },
    async fetchAdmin(context, value) {
      if (value.user) {
        db.collection("users").doc(value.user.uid).get().then(doc => {
          if (doc.exists) {
            let isAdmin = doc.get('isAdmin')
            if (isAdmin) {
              context.commit('setAdmin',)
              context.dispatch('getUsers')
            }
          }
        })
      }
    }
  },
  modules: {
  }
})
