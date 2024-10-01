<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            active-class="active"
            aria-current="page"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/addBook"
            class="nav-link"
            active-class="active"
            aria-current="page"
            >Add Book</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/countBookAPI"
            class="nav-link"
            active-class="active"
            aria-current="page"
            >Count Book API</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/weatherCheck"
            class="nav-link"
            active-class="active"
            aria-current="page"
            >Get Weather</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/getBookCount"
            class="nav-link"
            active-class="active"
            aria-current="page"
            >Book Count</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            v-if="!isAuthenticated"
            to="/FireLogin"
            class="nav-link"
            active-class="active"
            >Firebase Login</router-link
          >
          <button
            v-if="isAuthenticated"
            type="button"
            class="btn btn-secondary"
            @click="handleLogout"
          >
            Logout
          </button>
        </li>
        <li class="nav-item">
          <router-link
            v-if="!isAuthenticated"
            to="/FireRegister"
            class="nav-link"
            active-class="active"
            >Firebase Register</router-link
          >
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "@/store/store";

export default {
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated;
    },
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push({ name: "FireLogin" });
    },
  },
};
</script>
