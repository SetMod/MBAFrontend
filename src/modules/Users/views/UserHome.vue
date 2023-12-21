<script setup lang="ts">
import { onMounted } from 'vue';
import UserCard from '../components/UserCard.vue';
import useUsers from '../../../hooks/useUsers';

const props = defineProps({
    userId: {
        type: String,
        required: true,
    }
})

onMounted(async () => {
    if (props.userId) {
        await getUserById(Number(props.userId))
    }
})

const { isUsersLoading, user, getUserById } = useUsers()
</script>

<template>
    <div>
        <UserCard v-if="user" :user="user" :is-loading="isUsersLoading" />
    </div>
</template>
