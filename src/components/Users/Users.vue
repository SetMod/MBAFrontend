
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import useUsers from "../../hooks/useUsers";
import Users, { Roles } from "../../models/UsersModel";
import UserDeleteDialogVue from "./UserDeleteDialog.vue";
import UserEditDialogVue from "./UserEditDialog.vue";
import UsersDataTableVue from "./UsersDataTable.vue";

onMounted(() => {
  refreshTable()
})

const { users, isUsersLoading, deleteUser, getUsers, updateUser } = useUsers()
const toast = useToast()
const selectedUser = ref<Users>()

const displayEdit = ref(false)
const displayDelete = ref(false)
const refreshTable = () => {
  getUsers()
}
const openEdit = (user: Users) => {
  displayEdit.value = true
  selectedUser.value = user
}
const openDelete = (user: Users) => {
  displayDelete.value = true
  selectedUser.value = user
}
const closeDialog = () => {
  displayEdit.value = false
  displayDelete.value = false
  selectedUser.value = undefined
}
const submitEdit = async (selectedRole: Roles) => {
  if (!selectedUser.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select a user to edit', life: 3000 })
  if (!selectedRole) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select a user role', life: 3000 })

  selectedUser.value.role = selectedRole

  const response = await updateUser(selectedUser.value)
  if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
  toast.add({ severity: 'success', summary: 'Success', detail: 'User updated', life: 1500 })

  closeDialog()
  refreshTable()
}
const submitDelete = async () => {
  if (!selectedUser.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select user to delete', life: 3000 })

  const response = await deleteUser(selectedUser.value.id)
  if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
  toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted', life: 1500 })

  closeDialog()
  refreshTable()
}
</script>

<template>
  <Toast />
  <UserEditDialogVue v-if="selectedUser" :display="displayEdit" :user="selectedUser" :close-dialog="closeDialog"
    :submit-dialog="submitEdit" />
  <UserDeleteDialogVue v-if="selectedUser" :user="selectedUser" :display="displayDelete" :close-dialog="closeDialog"
    :submit-dialog="submitDelete" />

  <div v-if="isUsersLoading">
    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
  </div>
  <div v-else-if="!users || !roles" class="mt-8">
    <Message severity="info">Users not found</Message>
    <Button v-tooltip="'Refresh users'" icon="pi pi-refresh" class="p-button-rounded" @click="refreshTable" />
  </div>
  <UsersDataTableVue v-else :users="users" :roles="roles" :open-edit="openEdit" :open-delete="openDelete"
    :refresh-table="refreshTable" />
  <hr />
</template>


<style></style>