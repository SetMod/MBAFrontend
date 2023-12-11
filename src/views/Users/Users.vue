<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useUsers from '../../hooks/useUsers';
import UsersDataTable from '../../components/Users/UsersDataTable.vue';
import UserEditDialog from "../../components/Users/UserEditDialog.vue";
import UserDeleteDialog from "../../components/Users/UserDeleteDialog.vue";
const { users,  getUsers } = useUsers()

onMounted(async () => {
    await refreshUsersTable()
})

const showUsersEdit = ref(false)
const showUsersDelete = ref(false)

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
const submitUsersEdit = () => {

}
const submitUsersDelete = () => {

}
</script>

<template>
    <h1>
        Users
    </h1>
    <div v-if="users">
        <UserEditDialog v-model:show="showUsersEdit" @submit-dialog="submitUsersEdit" />
        <UserDeleteDialog v-model:show="showUsersDelete" @submit-dialog="submitUsersDelete" />
        <UsersDataTable :users="users" @open-edit="openUsersEdit" @open-delete="openUsersDelete"
            @refresh-table="refreshUsersTable" />
    </div>
</template>
