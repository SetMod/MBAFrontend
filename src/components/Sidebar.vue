<template>
        <div class="sidebar">
                <Menubar :model="sideBarRoutes">
                </Menubar>
                <Sidebar v-model:visible="visible">
                </Sidebar>
                <Button icon="pi pi-arrow-right" @click="visible = true" />
        </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useRoutes from '../hooks/useRoutes';

const visible = ref(false)
const { sideBarRoutes } = useRoutes()
</script>

<style>
.sidebar {
        widows: 100px;
        padding: 16px;
        background: #9e9e9e;
}
</style>