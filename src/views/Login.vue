<template>
  <b-form @submit.prevent="login" class="form">
    <div v-if="error">error: {{ error }}</div>
    <b-form-group
      id="input-group-1"
      label="Email address:"
      label-for="input-1"
      description="We'll never share your email with anyone else."
    >
      <b-form-input
        id="input-1"
        v-model="email"
        type="email"
        placeholder="Enter email"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-1"
      label="Password"
      label-for="input-1"
      description="We'll never share your email with anyone else."
    >
      <b-form-input
        type="password"
        id="text-password"
        aria-describedby="password-help-block"
        v-model="password"
      ></b-form-input>
      <b-form-text id="password-help-block">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </b-form-text>
    </b-form-group>
    <div>
      <b-button type="submit">login</b-button>
    </div>
  </b-form>
</template>

<script>
import { auth } from "../firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        let user = await auth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
        console.log(user);
        this.$router.replace("/");
      } catch (error) {
        this.error = error.message;
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  padding: 10px 100px;
  .form-child {
    padding: 5px;
  }
}
</style>