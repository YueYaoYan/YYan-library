import { createStore } from "vuex";
import { auth, db } from "@/firebase/init";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default createStore({
  state: {
    user: null,
    userData: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserData(state, user) {
      state.userData = user;
    },
  },
  actions: {
    async signup({ commit }, { email, password, role }) {
      const data = createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          const user = data.user;

          // update db to contain user role
          return setDoc(doc(db, "users", user.uid), {
            role: role,
          });
        });
        commit("setUser", data.user);
        await this.dispatch("fetchUserData", data.user); 
        alert("You have successfully Signed up!");
    },
    async login({ commit }, { email, password }) {
      const data = await signInWithEmailAndPassword(auth, email, password);
      commit("setUser", data.user);
      await this.dispatch("fetchUserData", data.user); // Fetch user data after login
      alert("You have successfully logged in!");
    },
    async logout({ commit }) {
      try {
        await signOut(auth);
        commit("setUser", null);
        commit("setUserData", null);
        alert("You have been logged out!");
      } catch (error) {
        console.log("logout error: ", error.message);
      }
    },
    async fetchUserData({ commit }, user) {
      try {
        const userDocRef = doc(db, "users", user.uid); // Assume you have a "users" collection
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          commit("setUserData", userDoc.data()); // Commit the user data to the Vuex store
          console.log("User data fetched:", userDoc.data());
        } else {
          console.log("No such user data!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.user != null,
    role: (state) => state.userData?.role,
  },
});
