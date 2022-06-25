<template>
  <section v-if="user" class="flex flex-wrap justify-content-center my-3">
    <ProfileFormVue />
    <div class="w-7">
      <OrganizationsVue :user-organizations="true" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import useUsers from "../hooks/useUsers";
import ProfileFormVue from "../components/Profile/ProfileForm.vue";
import OrganizationsVue from "../components/Organizations/Organizations.vue";

export default defineComponent({
  components: {
    ProfileFormVue,
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