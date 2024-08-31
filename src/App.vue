<script setup>
import BHeader from './components/BHeader.vue';
</script>

<template>
    <header>
      <BHeader/>
    </header>

    <main class="main-box">
      <router-view></router-view>
    </main>
</template>

<style scoped>
</style>
