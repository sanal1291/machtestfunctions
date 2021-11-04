<template>
  <b-form @submit.prevent="register" class="form">
    <h5>Register</h5>
    <div v-if="error">{{ error.error }}</div>
    <b-form-group id="input-group-1" label="Username:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="username"
        placeholder="username"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-3" label="Address:" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="address"
        placeholder="Address"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-2"
      label="Email address:"
      label-for="input-2"
      description="We'll never share your email with anyone else."
    >
      <b-form-input
        id="input-2"
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
      <b-button type="submit">Register</b-button>
    </div>
  </b-form>
</template>

<script>
import { auth, functions } from "../firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      username: "asdasd",
      address: "asdasd",
      error: null,
    };
  },
  methods: {
    async register() {
      try {
        let register = functions.httpsCallable("register");
        let res = await register({
          email: this.email,
          password: this.password,
          username: this.username,
          address: this.address,
        });
        console.log(res.data);

        if (res.data.success) {
          await auth.signInWithEmailAndPassword(this.email, this.password);
        } else {
          this.error = res.data;
        }
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