<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Container from './components/Container.vue'
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Suspense>
    <div>
      <Navbar />
      <div class="flex justify-content-between">
        <Sidebar />
        <Container>
          <router-view />
        </Container>
      </div>
      <Footer />
    </div>
  </Suspense>
</template>


<style>
@import "primeicons/primeicons.css";
@import "primeflex/primeflex.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
