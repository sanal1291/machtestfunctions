/* eslint-disable no-unused-vars */
<template>
  <b-card>
    <div class="d-flex">Create user</div>
    <b-form @submit.prevent="submit" id="myform">
      <div v-if="error">error: {{ error }}</div>
      <b-form-group id="input-group-0" label="Username:" label-for="input-0">
        <b-form-input
          id="input-0"
          v-model="user.email"
          type="email"
          placeholder="email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Username:" label-for="input--1">
        <b-form-input
          id="input--1"
          type="password"
          v-model="user.password"
          placeholder="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="user.username"
          placeholder="username"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Address:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="user.address"
          placeholder="address"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Roles:">
        <b-form-checkbox
          id="checkbox-1"
          v-model="user.isAdmin"
          name="checkbox-1"
          :value="true"
          :unchecked-value="false"
        >
          isAdmin
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-2"
          v-model="user.isStaff"
          name="checkbox-1"
          :value="true"
          :unchecked-value="false"
        >
          isStaff
        </b-form-checkbox>
        <b-form-checkbox
          id="checkbox-3"
          v-model="user.isCustomer"
          name="checkbox-1"
          :value="true"
          :unchecked-value="false"
        >
          isCustomer
        </b-form-checkbox>
      </b-form-group>
    </b-form>
    <b-button type="submit" form="myform"> save</b-button>
  </b-card>
</template>

<script>
import { mapState } from "vuex";
import { functions } from "../firebase";
export default {
  computed: {
    ...mapState({ users: (state) => state.users }),
  },
  data() {
    return {
      user: {
        id: null,
        email: null,
        password: null,
        username: null,
        address: null,
        active: false,
        created: null,
        isAdmin: false,
        isStaff: false,
        isCustomer: false,
      },
      error: null,
    };
  },
  mounted() {},
  methods: {
    async submit() {
      try {
        let register = functions.httpsCallable("register");
        let res = await register(this.user);
        console.log(res.data);

        if (res.data.success) {
          this.$router.go(-1);
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
</style>