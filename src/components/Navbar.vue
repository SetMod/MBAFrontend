<script setup lang="ts">
import useRoutes from "../hooks/useRoutes"

const { navBarRoutes } = useRoutes()
</script>

<template>
  <Menubar :model="navBarRoutes">
    <!-- <template #end>
        <div v-if="isLoggedIn" class="flex align-items-center">
          <span class="mr-3">Hello {{ user?.userUsername || 'user' }}!</span>
          <Button class="p-button-outlined mr-3 pi pi-sign-out fw" @click="logOutWithToast" />
        </div>
      </template> -->
  </Menubar>
</template>

