import "bootstrap/dist/css/bootstrap.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { auth } from "./firebase/init";

let app;

// change listener
auth.onAuthStateChanged(async(user) => {
  if (user) {
    store.commit('setUser', user);
    await store.dispatch('fetchUserData', user);  
  } else {
    store.commit('setUser', null);
    store.commit('setUserData', null);
  }

  if (!app) {
    app = createApp(App);
    app.use(PrimeVue, { theme: { preset: Aura } });
    app.use(store);
    app.use(router);

    app.mount("#app");
  }
});
