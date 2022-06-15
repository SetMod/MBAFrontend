<template>
  <section v-if="user" class="flex flex-wrap justify-content-center my-3">
    <Profile />
    <Organizations :user="true" />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import useUsers from "../hooks/useUsers";
import Organizations from "../components/Organizations.vue";
import Profile from "../components/Profile.vue";

export default defineComponent({
  components: {
    Profile,
    Organizations
  },
  setup() {
    onMounted(async () => {
    })
    const { user } = useUsers()
    return {
      user,
    }
  }
});
</script>


<style>
</style>