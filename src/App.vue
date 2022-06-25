<template>
  <div class="h-screen">
    <Toast />
    <Menubar :model="items">
      <template #end>
        <div v-if="isLoggedIn" class="flex align-items-center">
          <span class="mr-3">Hello {{ user?.userUsername || 'user' }}!</span>
          <Button class="p-button-outlined mr-3 pi pi-sign-out fw" @click="logOutWithToast" />
          <!-- <InputText placeholder="Search" type="text" /> -->
        </div>
      </template>
    </Menubar>
    <Suspense>
      <router-view />
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { routes } from "./router/index"
import useUsers from "./hooks/useUsers";
import useRoles from "./hooks/useRoles";
import { useToast } from 'primevue/usetoast'
import useNavBar from "./hooks/useNavBar";
import useFiles from "./hooks/useFiles";
import useOrganizations from "./hooks/useOrganizations";
import useRedirect from "./hooks/useRedirect";
import useReports from "./hooks/useReports";
import useAnalyzes from "./hooks/useAnalyzes";
import useOrganizationRoles from "./hooks/useOrganizationRoles";
import useVisualizations from "./hooks/useVisualizations";

export default defineComponent({
  setup() {
    const toast = useToast();
    const { items } = useNavBar()
    const { resetRoles } = useRoles()
    const { resetFiles } = useFiles()
    const { resetReports } = useReports()
    const { resetAnalyzes } = useAnalyzes()
    const { resetVisualizations } = useVisualizations()
    const { redirectSignIn } = useRedirect()
    const { resetOrganizations } = useOrganizations()
    const { user, isLoggedIn, resetUsers } = useUsers()
    const { resetOrganizationRoles } = useOrganizationRoles()

    const logOutWithToast = () => {
      resetRoles()
      resetOrganizationRoles()
      resetUsers()
      resetOrganizations()
      resetFiles()
      resetReports()
      resetAnalyzes()
      resetVisualizations()
      toast.add({ severity: 'info', summary: 'Logged out', detail: 'logged out', life: 3000 });
      redirectSignIn()
    }

    return {
      items,
      routes,
      user,
      isLoggedIn,
      logOutWithToast
    }
  },
});
</script>

<style>
@import "primevue/resources/themes/saga-blue/theme.css ";
@import "primevue/resources/primevue.min.css";
@import "primeicons/primeicons.css";
@import "primeflex/primeflex.css";

* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  font-weight: bold;
  color: #42b983;
}
</style>
