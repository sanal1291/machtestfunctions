<template>
  <b-card>
    <div>
      <b-button @click="adduser">Add</b-button>
    </div>
    <b-list-group>
      <b-list-group-item action v-for="(user, index) in users" :key="index">
        <div class="d-flex justify-content-between">
          <div>{{ user.email }}</div>
          <div>
            <b-button
              :to="{
                name: 'edituser',
                query: {
                  user: user.id,
                },
              }"
              >edit</b-button
            >
          </div>
        </div></b-list-group-item
      >
    </b-list-group>
  </b-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({ users: (state) => state.users }),
  },
  mounted() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    adduser() {
      this.$router.push({ name: "CreateUser" });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>