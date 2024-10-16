import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import AdminHomeView from "@/views/AdminHomeView.vue";
import UserHomeView from "@/views/UserHomeView.vue";
import store from "@/store/store";
import FirebaseSigninView from "@/views/FirebaseSigninView.vue";
import FirebaseRegisterView from "@/views/FirebaseRegisterView.vue";
import AddBookView from "@/views/AddBookView.vue";
import GetBookCountView from "@/views/GetBookCountView.vue";
import WeatherView from "@/views/WeatherView.vue";
import CountBookAPI from "@/views/CountBookAPI.vue";
import GetAllBookAPI from "@/views/GetAllBookAPI.vue";

const routes = [
  {
    path: "/addBook",
    name: "AddBook",
    component: AddBookView,
  },
  {
    path: "/getBookCount",
    name: "GetBookCount",
    component: GetBookCountView,
  },
  {
    path: "/countBookAPI",
    name: "CountBookAPI",
    component: CountBookAPI,
  },
  {
    path: "/getAllBookAPI",
    name: "GetAllBookAPI",
    component: GetAllBookAPI,
  },
  {
    path: "/weatherCheck",
    name: "WeatherCheck",
    component: WeatherView,
  },
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        if (store.getters.role == "Admin") {
          next({ name: "AdminHome" });
        } else if (store.getters.role == "User") {
          next({ name: "UserHome" });
        } else {
          next();
        }
      } else {
        next();
      }
    },
  },
  {
    path: "/admin",
    name: "AdminHome",
    component: AdminHomeView,
    meta: { requiresAuth: true, role: "Admin" },
  },
  {
    path: "/user",
    name: "UserHome",
    component: UserHomeView,
    meta: { requiresAuth: true, role: "User" },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/FireLogin",
    name: "FireLogin",
    component: FirebaseSigninView,
    meta: { requiresAuth: false },
  },
  {
    path: "/FireRegister",
    name: "FireRegister",
    component: FirebaseRegisterView,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Perform logic before entering the About route
  if (to.meta.requiresAuth){
    if (store.getters.isAuthenticated) {
      next();
    }else{
      alert("You are not authenticated");
      next({ name: 'FireLogin' });
    }
  } else {
    next();
  }
});

export default router;
