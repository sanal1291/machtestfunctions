/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './firebase'
import './plugins'
import { auth, db } from './firebase'
Vue.config.productionTip = false

let app;
auth.onAuthStateChanged(async (user) => {
  store.dispatch('fetchUser', { user: user })
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  store.dispatch('fetchAdmin', { user: user })
})

