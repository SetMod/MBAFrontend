<template>
  <div v-if="isUsersLoading"><i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></div>
  <div v-else-if="!users" class="mt-8">
    <Message severity="info">Users not found</Message>
    <div class="flex justify-content-end">
      <Button label="Refresh" icon="pi pi-refresh" class="h-2rem" @click="refresh" />
    </div>
  </div>
  <div v-else>
    <DataTable :value="users" removable-sort responsive-layout="scroll" :paginator="true" :rows="10"
      paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rows-per-page-options="[10, 25, 50]" current-page-report-template="Showing {first} to {last} of {totalRecords}">
      <template #header>
        <div class="table-header flex justify-content-between align-items-center">
          <h2>Users</h2>
          <Button icon="pi pi-refresh" class="h-2rem" @click="refresh" />
        </div>
      </template>
      <Column field="userId" header="ID" :sortable="true"></Column>
      <Column field="userFirstName" header="FirstName" :sortable="true"></Column>
      <Column field="userSecondName" header="SecondName" :sortable="true"></Column>
      <Column field="userEmail" header="Email" :sortable="true"></Column>
      <Column field="userPhone" header="Phone"></Column>
      <Column field="userUsername" header="Username" :sortable="true"></Column>
      <Column field="userPassword" header="Password"></Column>
      <Column field="userCreateDate" header="CreateDate" :sortable="true"></Column>
      <Column header="Role">
        <template #body="slotProps">
          <span>{{
              roles
                ? roles.find((role) => role.roleId == slotProps.data.roleId)?.roleName
                : slotProps.data.roleId
          }}</span>
        </template>
      </Column>
      <Column header="Actions" header-style="width: 4rem; text-align: center" body-style="overflow: visible;">
        <template #body="slotProps">
          <div class="flex justify-content-around align-content-center">
            <Button type="button" icon="pi pi-user-edit" class="mr-1 p-button-outlined p-button-info"></Button>
            <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
              @click="() => deleteUser(slotProps.data.userId)"></Button>
          </div>
        </template>
      </Column>
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="refresh" />
      </template>
      <template #paginatorend>
      </template>
    </DataTable>
  </div>
  <hr />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-dom";
import useRoles from "../hooks/useRoles";
import useUsers from "../hooks/useUsers";
import Button from "primevue/button";
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Message from "primevue/message";
export default defineComponent({
  components: {
    Button,
    Message,
    DataTable,
    Column
  },
  setup() {
    onMounted(async () => {
      await getUsers()
    })
    const { users, isUsersLoading, deleteUser: deleteUserById, getUsers } = useUsers()
    const { roles, getRoles } = useRoles()
    const refresh = async () => {
      await getUsers()
      await getRoles()
    }
    const deleteUser = async (userId: number) => {
      const result = confirm('Delete user?')
      if (result == false) return
      await deleteUserById(userId)
      await getUsers()
    }
    return {
      isUsersLoading,
      users,
      roles,
      deleteUser,
      refresh,
    };
  },
});
</script>

<style>
</style>