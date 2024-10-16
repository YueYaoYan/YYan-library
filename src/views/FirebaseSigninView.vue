<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async signin() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push("/");
      } catch (error) {
        console.log("login error: ", error.message);
      }
    },
  },
};
</script>
