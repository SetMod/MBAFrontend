<template>
  <div class="mt-8">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Market Basket Analyze System</h1>
    <Button class="mt-5" @click="getStarted">Get started</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useUsers from "../hooks/useUsers";
import useRedirect from "../hooks/useRedirect";

export default defineComponent({
  setup() {
    const { isLoggedIn } = useUsers()
    const { redirectSignIn, redirectFiles } = useRedirect()
    const getStarted = () => {
      isLoggedIn.value ? redirectFiles() : redirectSignIn()
    }
    return {
      getStarted
    }
  }
});
</script>
