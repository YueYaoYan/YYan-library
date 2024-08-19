import { createRouter, createWebHistory } from 'vue-router'
import { ref } from "vue";
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'

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
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
        // Perform logic before entering the About route
        if (isAuthenticated.value) {
          next();
        } else {
          alert("You are not authenticated");
          next({ name: 'Home' });
        }
      }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router