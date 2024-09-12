import { createRouter, createWebHistory } from 'vue-router'
import { ref } from "vue";
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import store from '@/store/store';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';

const isAuthenticated = ref(false); 

export function useAuthenticate() {
  const toggleAthentication = () => {
    if (isAuthenticated.value == false) {
      isAuthenticated.value = true;
    } else {
      isAuthenticated.value = false;
    }
  };

  return { isAuthenticated, toggleAthentication };
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
        // Perform logic before entering the About route
        if (store.state.isAuthenticated) {
          next();
        } else {
          alert("You are not authenticated");
          next({ name: 'Login' });
        }
      }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router