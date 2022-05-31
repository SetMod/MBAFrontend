<template>
  <div class="h-screen pi-dec">
    <Toast />
    <Menubar :model="items">
      <template #end>
        <div v-if="user" class="flex align-items-center">
          <span class="mr-3">Hello {{ user?.userUsername || 'user' }}!</span>
          <Button class="p-button-outlined mr-3 pi pi-sign-out fw" @click="logOut" />
          <InputText placeholder="Search" type="text" />
        </div>
      </template>
    </Menubar>
    <router-view />
    <!-- <Suspense>
      <router-view />
    </Suspense> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { routes } from "./router/index"
import useUsers from "./hooks/useUsers";
import useRoles from "./hooks/useRoles";
import { useToast } from 'primevue/usetoast'
import { MenuItem } from "primevue/menuitem";
import Menubar from "primevue/menubar"
import InputText from "primevue/inputtext"
import Button from "primevue/button";
import Toast from "primevue/toast";

export default defineComponent({
  components: {
    InputText,
    Menubar,
    Toast,
    Button,
  },
  setup() {
    onMounted(() => {
    })
    const toast = useToast();
    const { getUserRole } = useRoles()
    const { user, isLoggedIn } = useUsers()

    const items = ref(new Array<MenuItem>(
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        to: '/',
      },
      {
        label: 'Files',
        icon: 'pi pi-fw pi-file-excel',
        to: '/files',
        visible: () => isLoggedIn.value
      },
      {
        label: 'Analyze',
        icon: 'pi pi-fw pi-check',
        to: '/analyze'
      },
      {
        label: 'Visualizations',
        icon: 'pi pi-fw pi-image',
        to: '/visualizations'
      },
      {
        label: 'Profile',
        to: '/profile',
        visible: () => isLoggedIn.value
      },
      {
        label: 'Admin',
        to: '/admin',
        visible: () => {
          if (isLoggedIn.value && getUserRole(user.value) === 'Admin') return true
          else return false
        }
      },
      {
        label: 'About',
        icon: 'pi pi-fw pi-info-circle',
        to: '/about'
      },
      {
        label: 'Sign In',
        icon: 'pi pi-fw pi-sign-in',
        to: '/signin',
        visible: () => !isLoggedIn.value
      },
      {
        label: 'Sign UP',
        icon: 'pi pi-fw pi-check-square',
        to: '/signup',
        visible: () => !isLoggedIn.value
      },
    ))
    // const items = routes.map((route => {
    //   return <MenuItem>{
    //     label: route.name,
    //     to: route.path,
    //   }
    // }))

    const logOut = () => {
      if (user.value) {
        user.value = undefined
        toast.add({ severity: 'info', summary: 'Logged out!', detail: 'You have logged out', life: 3000 });
      }
    }
    return { items, routes, user, logOut }
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
