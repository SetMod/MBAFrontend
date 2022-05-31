<template>
    <div>
        <h4 class="m-3 text-left">Admin</h4>
        <hr>
        <Users />
        <Organizations />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Users from '../components/Users.vue'
import Organizations from "../components/Organizations.vue";

export default defineComponent({
    components: {
        Users,
        Organizations
    },
    setup() {
    }
})
</script>

<style>
</style>