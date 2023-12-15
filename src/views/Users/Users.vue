<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useUsers from '../../hooks/useUsers';
import UsersDataTable from '../../components/Users/UsersDataTable.vue';
import UserEditDialog from "../../components/Users/UserEditDialog.vue";
import UserDeleteDialog from "../../components/Users/UserDeleteDialog.vue";
import Users from '../../models/UsersModel';
import { useToast } from 'primevue/usetoast';

onMounted(async () => {
    await refreshUsersTable()
})

const toast = useToast()
const {
    users,
    usersError,
    isUsersLoading,
    getUsers,
    updateUser,
    deleteUser,
} = useUsers()
const showUsersEdit = ref(false)
const showUsersDelete = ref(false)
const selectedUser = ref<Users>()

const refreshUsersTable = async () => {
    await getUsers()
}
const openUsersEdit = (user: Users) => {
    showUsersEdit.value = true
    selectedUser.value = user
}
const openUsersDelete = (user: Users) => {
    showUsersDelete.value = true
    selectedUser.value = user
}
const submitUsersEdit = async () => {
    if (!selectedUser.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select user to update', life: 3000 })
        return
    }

    const res = await updateUser(selectedUser.value.id, selectedUser.value)

    if (usersError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to update', detail: usersError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Deleted', detail: 'User updated', life: 1500 });
        await refreshUsersTable()
    }
}
const submitUsersDelete = async () => {
    if (!selectedUser.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select user to delete', life: 3000 })
        return
    }

    const res = await deleteUser(selectedUser.value.id)

    if (usersError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to delete', detail: usersError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted', life: 1500 });
        await refreshUsersTable()
    }
}
</script>

<template>
    <Toast />
    <h1>Users</h1>
    <div v-if="users">
        <UserEditDialog v-if="selectedUser" v-model:show="showUsersEdit" :user="selectedUser"
            @submit-dialog="submitUsersEdit" />
        <UserDeleteDialog v-if="selectedUser" v-model:show="showUsersDelete" :user="selectedUser"
            @submit-dialog="submitUsersDelete" />
        <UsersDataTable :users="users" :is-loading="isUsersLoading" @open-edit="openUsersEdit"
            @open-delete="openUsersDelete" @refresh-table="refreshUsersTable" />
    </div>
</template>
