import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import UserEdit from '../components/UserEdit'
import UserCreate from '../components/UserCreate'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAdmin: true
    }
  },
  {
    path: '/admin/edituser',
    name: "edituser",
    component: UserEdit,
    meta: {
      requiresAdmin: true,
    }
  },
  {
    path: '/admin/createuser',
    name: "CreateUser",
    component: UserCreate,
    meta: {
      requiresAdmin: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const requiresAdmin = to.matched.some(x => x.meta.requiresAdmin)
  if (requiresAuth && !store.state.isAuthenticated) {
    next({ name: "Login" })
    console.log("requires auth");
  }
  if (requiresAdmin && !store.state.isAdmin) {
    next({ name: "Home" })
    console.log("requires admin");
  }
  else {
    next();
  }
})


export default router
