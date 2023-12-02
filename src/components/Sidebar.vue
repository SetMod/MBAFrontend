<template>
        <div class="sidebar">
                <MegaMenu  :model="sideBarRoutes" orientation="vertical" />
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
        padding: 16px;
        background: #9e9e9e;
}
</style>