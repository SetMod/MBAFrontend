<script setup lang="ts">
import useUsers from "../hooks/useUsers";
import useRoutes from "../hooks/useRoutes";

const { isLoggedIn } = useUsers()
const {  redirectLogin} = useRoutes()
// const getStarted = () => {
//   isLoggedIn.value ? redirectFiles() : redirectLogin()
// }
</script>


<template>
  <div class="mt-8">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Market Basket Analyze System</h1>
    <!-- <Button class="mt-5" @click="getStarted">Get started</Button> -->
  </div>
</template>

