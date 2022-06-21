<template>
  <section v-if="user" class="flex flex-wrap justify-content-center my-3">
    <Profile />
    <div class="w-7">
      <OrganizationsVue :user-organizations="true" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import useUsers from "../hooks/useUsers";
import Profile from "../components/Profile.vue";
import OrganizationsVue from "../components/Organizations/Organizations.vue";
export default defineComponent({
  components: {
    Profile,
    OrganizationsVue
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