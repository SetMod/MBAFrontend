<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import useRoutes from "../hooks/useRoutes"
import useUsers from "../hooks/useUsers";
import { computed } from "vue";
import { MenuItem } from "primevue/menuitem";

const confirm = useConfirm()
const toast = useToast()

const { isLoggedIn, currentUser, logout, isAdmin } = useUsers()
const {
  // navBarItems,
  getHomeRoute,
  getAdminRoute,
  getUserOrganizationsRoute,
  breadCrumbItems,
  redirectHome,
  getAboutRoute,
  getLoginRoute,
  getRegisterRoute,
  getProfileRoute
} = useRoutes()

const navBarItems = computed<Array<MenuItem>>(() => {
  return Array<MenuItem>(
    {
      label: 'Home', route: getHomeRoute(), icon: 'pi pi-fw pi-home',
    },
    {
      label: 'Admin', route: getAdminRoute(), icon: 'pi pi-fw pi-shield',
      visible: () => isLoggedIn.value && isAdmin.value
    },
    {
      label: 'My Organizations', route: getUserOrganizationsRoute(currentUser.value?.id), icon: 'pi pi-fw pi-building',
      visible: () => isLoggedIn.value
    },
  )
})

const logOutUser = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Logout',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-text p-button-text',
    acceptClass: 'p-button-danger p-button-text',
    accept: () => {
      logout()
      redirectHome()
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have successfully logged out!', life: 3000 });
    },
  });
};

</script>
<template>
  <Toast />
  <ConfirmDialog />
  <nav>
    <Menubar :model="navBarItems">
      <template #item="{ item }">
        <router-link :to="item.route">
          <Button :label="`${item.label}`" severity="secondary" :icon="item.icon" text class="p-2 m-0" />
        </router-link>
      </template>
      <template #end>
        <div class="flex align-items-center justify-content-around">
          <router-link :to="getAboutRoute()" class="mr-3">
            <Button label="About" severity="secondary" icon="pi pi-info-circle" text class="p-2 m-0" />
          </router-link>
          <div v-if="!isLoggedIn" class="flex align-items-center justify-content-around">
            <div class="flex align-items-center justify-content-around">
              <router-link :to="getLoginRoute()">
                <Button label="Login" severity="secondary" icon="pi pi-sign-in" text class="p-2 m-0" />
              </router-link>
              <router-link :to="getRegisterRoute()">
                <Button label="Register" severity="secondary" icon="pi pi-check-square" text class="p-2 m-0" />
              </router-link>
            </div>
          </div>
          <div v-else class="flex align-items-center justify-content-around">
            <router-link v-if="currentUser?.username" :to="getProfileRoute()" class="">
              <Button outlined class="p-1 pr-3" severity="secondary">
                <div class="p-button-icon p-button-icon-left pi pi-fw pi-user" />
                <div>
                  <div class="font-bold">{{ currentUser.username }}</div>
                  <div class="text-sm">{{ currentUser.role }}</div>
                </div>
              </Button>
            </router-link>
            <div class="p-2">|</div>
            <Button label="Logout" outlined icon="pi pi-sign-out" @click="logOutUser" />
          </div>
        </div>
      </template>
    </Menubar>
  </nav>
  <Breadcrumb :home="breadCrumbItems[0]" :model="breadCrumbItems" />
</template>

