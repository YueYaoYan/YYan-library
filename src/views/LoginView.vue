<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">Login</h1>
                <form @submit.prevent="handleLogin">
                    <div class="row mb-3">
                        <label for="username" class="form-label">Username:</label><br />
                        <input
                        type="text"
                        class="form-control"
                        id="username"
                        v-model="username"
                        />
                    </div>
                    <div class="row mb-3">
                        <label for="password" class="form-label">Password:</label><br />
                        <input
                        type="password"
                        class="form-control"
                        v-model="password"
                        />
                    </div>
                    
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Login</button>
                    </div>
                </form>
            </div>
        </div>  
    </div>
  </template>
  
  <script> 
  import { mapActions } from "vuex";

  export default {
    data(){
      return {
        username: '',
        password: '',
      };
    },
    methods:{
      ...mapActions(['login']),
      async handleLogin(){
        const user = {username: this.username, password: this.password};
        await this.login(user);
        this.$router.push({name:'About'})
      }
    }
  };
  </script>
  
  <style>
  </style>