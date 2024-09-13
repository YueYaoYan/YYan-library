<template>
    
    <div class="container mt-5">
        <div class="row">
            <div class="about">
                <h1 class="text-center">Admin Home</h1>
                <p class="text-center">Welcome back to Admin Home.</p>
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