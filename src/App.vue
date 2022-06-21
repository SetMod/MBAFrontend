<template>
  <div class="h-screen pi-dec">
    <Toast />
    <Menubar :model="items">
      <template #end>
        <div v-if="isLoggedIn" class="flex align-items-center">
          <span class="mr-3">Hello {{ user?.userUsername || 'user' }}!</span>
          <Button class="p-button-outlined mr-3 pi pi-sign-out fw" @click="logOutWithToast" />
          <InputText placeholder="Search" type="text" />
        </div>
      </template>
    </Menubar>
    <Suspense>
      <router-view />
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { routes } from "./router/index"
import useUsers from "./hooks/useUsers";
import useRoles from "./hooks/useRoles";
import { useToast } from 'primevue/usetoast'

import Menubar from "primevue/menubar"
import InputText from "primevue/inputtext"
import Button from "primevue/button";
import Toast from "primevue/toast";
import useNavBar from "./hooks/useNavBar";
import useFiles from "./hooks/useFiles";
import useOrganizations from "./hooks/useOrganizations";
import useRedirect from "./hooks/useRedirect";

export default defineComponent({
  components: {
    InputText,
    Menubar,
    Toast,
    Button,
  },
  setup() {
    onMounted(() => {
      // if (isLoggedIn.value) await getRoles()
    })
    const toast = useToast();
    const { items } = useNavBar()
    const { resetRoles } = useRoles()
    const { user, isLoggedIn, resetUsers } = useUsers()
    const { resetFiles } = useFiles()
    const { resetOrganizations } = useOrganizations()
    const { redirectSignIn } = useRedirect()

    const logOutWithToast = () => {
      resetUsers()
      resetRoles()
      resetFiles()
      resetOrganizations()
      toast.add({ severity: 'info', summary: 'Logged out!', detail: 'You have logged out', life: 3000 });
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
