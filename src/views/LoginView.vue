<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">Login</h1>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <label for="username" class="form-label">Username:</label><br />
                        <input
                        type="text"
                        class="form-control"
                        id="username"
                        @blur="() => validateName(true)"
                        @input="() => validateName(false)"
                        v-model="formData.username"
                        />
                        <div v-if="errors.username" class="text-danger">
                        {{ errors.username }}
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="password" class="form-label">Password:</label><br />
                        <input
                        type="password"
                        class="form-control"
                        id="password"
                        @blur="() => validatePassword(true)"
                        @input="() => validatePassword(false)"
                        v-model="formData.password"
                        />
                        <div v-if="errors.password" class="text-danger">
                        {{ errors.password }}
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="clearForm">
                        Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>  
    </div>
  </template>
  
  <script setup> 
  import { ref } from "vue";
  import {useRouter} from "vue-router";
  import { useAuthenticate } from "@/router";

  const router = useRouter();

  const { isAuthenticated } = useAuthenticate();

  const formData = ref({
    username: "",
    password: ""
  });
  
  const errors = ref({
    username: null,
    password: null
  });

  const clearForm = () => {
    formData.value = {
      username: "",
      password: ""
    }
}
  
  const submitForm = () => {
    validateName(true);
    validatePassword(true);
    
    if (
      !errors.value.username &&
      !errors.value.password
    ) {
        isAuthenticated.value = true;
        router.replace({ path: '/about' })
    }
  }

  const validateName = (blur) => {
    if (formData.value.username.length < 3) {
      if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
      errors.value.username = null;
    }
  };
  
  const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (password.length < minLength) {
      if (blur)
        errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
      if (blur)
        errors.value.password = `Password must contain at least one uppercase letter.`;
    } else if (!hasLowercase) {
      if (blur)
        errors.value.password = `Password must contain at least one lowercase letter.`;
    } else if (!hasNumber) {
      if (blur)
        errors.value.password = `Password must contain at least one number.`;
    } else if (!hasSpecialChar) {
      if (blur)
        errors.value.password = `Password must contain at least special character.`;
    } else {
      errors.value.password = null;
    }
  };
  </script>
  
  <style>
  </style>