<template>
  <div class="mt-8">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Market Basket Analyze System</h1>
    <Button class="mt-5" @click="getStarted">Get started</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button"
import { useRouter } from 'vue-router'
import useUsers from "../hooks/useUsers";

export default defineComponent({
  name: "Home",
  components: {
    Button
  },
  setup() {
    const { user } = useUsers()
    const router = useRouter()
    const getStarted = () => {
      if (!user.value) {
        router.push({
          path: '/signin',
        })
      } else {
        router.push({
          path: '/files',
        })
      }
    }
    return {
      getStarted
    }
  }
});
</script>
