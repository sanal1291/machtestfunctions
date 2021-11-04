<template>
  <div id="nav">
    <router-link to="/login" v-if="!isAuthenticated">Login</router-link> |
    <router-link to="/register" v-if="!isAuthenticated">Register</router-link>
    <span v-if="isAuthenticated">
      {{ user.email }}<a href="#" @click="logout">Logout</a>|</span
    >
    <router-link to="/" v-if="isAuthenticated">Home</router-link> |
    <router-link to="/admin" v-if="isAdmin">Admin</router-link>|
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "../../firebase";
export default {
  computed: {
    ...mapState({ userSnapshot: (state) => state.userSnapshot }),
    ...mapState({ user: (state) => state.user }),
    ...mapState({ isAuthenticated: (state) => state.isAuthenticated }),
    ...mapState({ isAdmin: (state) => state.isAdmin }),
  },
  methods: {
    async logout() {
      try {
        this.userSnapshot();
        await auth.signOut();
        this.$router.replace("/login");
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>