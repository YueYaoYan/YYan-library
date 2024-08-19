<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Form from './components/Form.vue';
import JSON from './components/JSON.vue'
import BHeader from './components/BHeader.vue';
</script>

<template>
    <header>
      <BHeader/>
    </header>

    <main class="main-box">
      <!-- <JSON /> -->
      <!-- <Form /> -->
      <router-view></router-view>
    </main>
</template>

<style scoped>
</style>
