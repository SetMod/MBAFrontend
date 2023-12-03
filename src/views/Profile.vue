<script setup lang="ts">
import { onMounted } from "vue";
import useUsers from "../hooks/useUsers";
import ProfileFormVue from "../components/Profile/ProfileForm.vue";

const { user, getModelsFromLocalStorage } = useUsers()

onMounted(() => {
  getModelsFromLocalStorage()
})
</script>

<template>
  <section v-if="user" class="flex flex-wrap justify-content-center my-3">
    <!-- <section class="flex flex-wrap justify-content-center my-3"> -->
    <ProfileFormVue />
  </section>
</template>
