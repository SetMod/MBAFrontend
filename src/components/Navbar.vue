<script setup lang="ts">
import useRoutes from "../hooks/useRoutes"
import useUsers from "../hooks/useUsers";
const { isLoggedIn, currentUser, logout } = useUsers()
const { navBarRoutes, breadCrumbRoutes, redirectHome } = useRoutes()

const logOutUser = () => {
  logout()
  redirectHome()
  // logout().finally(() => {
  //   redirectHome()
  // })
}

</script>
<template>
  <Menubar :model="navBarRoutes">
    <template #end>
      <div v-if="isLoggedIn" class="flex align-items-center">
        <span class="mr-3">Hello {{ currentUser?.username || 'user' }}!</span>
        <Button class="p-button-outlined mr-3 pi pi-sign-out fw" @click="logOutUser" />
      </div>
    </template>
  </Menubar>
  <Breadcrumb :home="breadCrumbRoutes[0]" :model="breadCrumbRoutes" />
</template>

