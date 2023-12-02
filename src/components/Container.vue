<script setup lang="ts">
import useRoutes from "../hooks/useRoutes"

const { breadCrumbRoutes } = useRoutes()
</script>

<template>
    <div class="w-screen">
      <Breadcrumb :home="breadCrumbRoutes[0]" :model="breadCrumbRoutes" />
        <slot />
    </div>
</template>