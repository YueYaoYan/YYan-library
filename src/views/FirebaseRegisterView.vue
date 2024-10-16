<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      id="isAdmin"
      v-model="isAdmin"
    />
    <label class="form-check-label" for="volunteerCheck">
      isAdmin
    </label>
  </div>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      isAdmin: false
    };
  },
  methods: {
    ...mapActions(["signup"]),
    async register() {
      const role = this.isAdmin? "Admin":"User";
      try {
        await this.signup({ email: this.email, password: this.password, role: role});
        this.$router.push("/");
      } catch (error) {
        console.log("login error: ", error.message);
      }
    },
  },
};
</script>
