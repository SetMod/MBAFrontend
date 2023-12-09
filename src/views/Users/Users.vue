<script setup lang="ts">
import { onMounted } from 'vue';
import useUsers from '../../hooks/useUsers';
import UsersDataTable from '../../components/Users/UsersDataTable.vue';

const { users, getUsers } = useUsers()

onMounted(async () => {
    await getUsers()
})
</script>

<template>
    <h1>
        Users
    </h1>
    <div v-if="users">
        <UsersDataTable :users="users" />
    </div>
</template>
