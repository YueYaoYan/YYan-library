<template>      
    <div class="container mt-5">
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <h1 class="tex-center">User Information Form / Credentials</h1>
            <form @submit.prevent="submitForm">
                <div class="row mb-3">
                    <div class="row mb-6">
                        <label for="username" class="form-label">Username:</label><br>
                        <input required type="text" class="form-control" id="username" @blur="() => validateName(true)" @input="() => validateName(false)" v-model="formData.username">
                        <div v-if="errors.username" class="text-danger">{{errors.username}}</div>
                    </div> 
                    <div class="row mb-6">
                        <label class="form-label" for="password">Password: </label>
                        <input required minlength="4" maxlength="10" type="password" class="form-control" id="password" model="formData.password">
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="row mb-6">
                        <div class="form-check">
                            <label clas="form-check-label" for="isAustralian">Australian Resident?</label>
                            <input type="checkbox" 
                            class="form-check-input" id="isAustralian" 
                            v-model="formData.isAustralian">
                        </div>
                    </div>
                    
                    <div class="row mb-6">
                        <label for="gender" class="form-label">Gender</label><br>
                        <select required class="form-select" id="gender" v-model="formData.gender">
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="reason" class="form-label">Reason For Joining:</label>
                    <textarea required minlength="10" class="form-control" id="reason" name="reason" rows="3" v-model="formData.reason"></textarea>
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-primary me-2">Submit</button>
                    <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
                    
                </div>
            </form>
        </div>
    </div>
    </div>
    <div class="row mt-5" v-if="submittedCards.length">
        <div class="d-flex flex-wrap justify-content-start">
           <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
              <div class="card-header">
                 User Information
              </div>
              <ul class="list-group list-group-flush">
                 <li class="list-group-item">Username: {{ card.username }}</li>
                 <li class="list-group-item">Password: {{ card.password }}</li>
                 <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
                 <li class="list-group-item">Gender: {{ card.gender }}</li>
                 <li class="list-group-item">Reason: {{ card.reason }}</li>
              </ul>
           </div>
        </div>
     </div>
</template>

<script setup>
import { ref } from 'vue';
  const formData = ref({
      username: '',
      password: '',
      isAustralian: false,
      reason: '',
      gender: ''
  });
  
  const errors = ref({
      username: null,
      password: null,
      isAustralian: null,
      reason: null,
      gender: null
  });

  const validateName = (blur) => {
    if (formData.value.username.length <3){
        if (blur) errors.value.username = "Name must be at least 3 characters";
    } else{
        errors.value.username = null;
    }
  }

  const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength){
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase){
        if (blur) errors.value.password = `Password must contain at least one uppercase letter.`;
    } else if (!hasLowercase){
        if (blur) errors.value.password = `Password must contain at least one lowercase letter.`;
    } else if (!hasNumber){
        if (blur) errors.value.password = `Password must contain at least one number.`;
    } else if (!hasSpecialChar){
        if (blur) errors.value.password = `Password must contain at least special character.`;
    } else{
        errors.value.password = null;
    }
  };
  
  const submittedCards = ref([]);
  
  const submitForm = () => {
    validateName(true);
    if (!errors.value.username){
        submittedCards.value.push({
            ...formData.value
        });
        clearForm();
    }
  };
</script>

<style scoped>
   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
</style>