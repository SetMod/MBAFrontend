<template>
  <div v-if="isUsersLoading"><i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></div>
  <div v-else-if="!users">
    <h5>Users not found</h5>
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
      <Column field="roleId" header="Actions"></Column>
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="refresh" />
      </template>
      <template #paginatorend>
      </template>
    </DataTable>
  </div>
  <!-- <table v-else>
    <thead>
      <th>ID</th>
      <th>FirstName</th>
      <th>SecondName</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Username</th>
      <th>Password</th>
      <th>CreateDate</th>
      <th>Role</th>
      <th>Actions</th>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="user.userId || index">
        <td>{{ user.userId }}</td>
        <td>{{ user.userFirstName }}</td>
        <td>{{ user.userSecondName }}</td>
        <td>{{ user.userEmail }}</td>
        <td>{{ user.userPhone }}</td>
        <td>{{ user.userUsername }}</td>
        <td>{{ user.userPassword }}</td>
        <td>{{ user.userCreateDate }}</td>
        <td>
          {{
              roles
                ? roles.find((role) => role.roleId == user.roleId)?.roleName
                : user.roleId
          }}
        </td>
        <td>
          <button>Edit</button>
          <button @click="() => (user.userId ? deleteUser(user.userId) : '')">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table> -->
  <hr />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-dom";
import useRoles from "../hooks/useRoles";
import useUsers from "../hooks/useUsers";
import Button from "primevue/button";
import DataTable from "primevue/datatable"
import Column from "primevue/column"

export default defineComponent({
  components: {
    Button,
    DataTable,
    Column
  },
  setup() {
    // const roles = ref<Roles[]>();
    // const users = ref<Users[]>();
    // onMounted(async () => {
    //   const { roles: globalRoles, users: globalUsers } = await useUsers();
    //   users.value = globalUsers.value ? globalUsers.value : new Array();
    //   roles.value = globalRoles.value ? globalRoles.value : new Array();
    // });
    onMounted(() => {
      getUsers()
      getRoles()
    })
    const { users, isUsersLoading, deleteUser, getUsers } = useUsers()
    const { roles, getRoles } = useRoles()
    const refresh = () => {
      getUsers()
      getRoles()
    }
    return {
      isUsersLoading,
      users,
      deleteUser,
      refresh,
      roles,
    };
  },
});
</script>

<style>
</style>