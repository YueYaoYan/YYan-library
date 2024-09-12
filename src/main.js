import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { initializeApp } from "firebase/app";

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(store)
app.use(router)

app.mount('#app')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhNKE2xEM4TXaFkGP4WLvX6bRDtFkKvSE",
  authDomain: "week7-yaoyan.firebaseapp.com",
  projectId: "week7-yaoyan",
  storageBucket: "week7-yaoyan.appspot.com",
  messagingSenderId: "468651552332",
  appId: "1:468651552332:web:38487667f9d6228380cee9"
};

// Initialize Firebase
initializeApp(firebaseConfig);