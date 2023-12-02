<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
import Container from './components/Container.vue'
</script>

<template>
  <Navbar />
  <div class="flex justify-content-center min-w-screen h-screen">
    <Sidebar />
    <Container>
      <Suspense>
        <router-view />
      </Suspense>
    </Container>
  </div>
  <Footer />
</template>


<style>
@import "primevue/resources/themes/saga-blue/theme.css ";
@import "primevue/resources/primevue.min.css";
@import "primeicons/primeicons.css";
@import "primeflex/primeflex.css";

* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color: #42b983;
}
</style>
