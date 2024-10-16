<template>
    
    <div class="container mt-5">
        <div class="row">
            <div class="about">
                <h1 class="text-center">User Home</h1>
                <p class="text-center">Welcome back to User Home.</p>
            </div>
        </div>  
    </div>
  </template>
  
  <script setup>
  import { auth } from '@/firebase/init';
  
    console.log(auth.currentUser)
  </script>
  
  <style>
  </style>