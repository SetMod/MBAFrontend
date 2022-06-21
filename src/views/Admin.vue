<template>
    <div>
        <h4 class="m-3 text-left">Admin</h4>
        <hr>
        <UsersVue />
        <OrganizationsVue />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UsersVue from "../components/Users/Users.vue";
import OrganizationsVue from "../components/Organizations/Organizations.vue";
export default defineComponent({
    components: {
        UsersVue,
        OrganizationsVue
    },
    setup() {
    }
})
</script>

<style>
</style>