<script setup lang="ts">
import { PropType } from 'vue';
import { MenuItem } from 'primevue/menuitem';

const props = defineProps({
        routes: {
                type: Array as PropType<Array<MenuItem>>,
                // type: Array<MenuItem>,
                required: true
        }
})
</script>

<template>
        <div class="p-2 bg-black-alpha-10">
                <!-- <MegaMenu :model="props.routes" orientation="vertical" /> -->
                <PanelMenu :model="props.routes" multiple class="w-full md:w-20rem" />
        </div>
</template>

<style>
.sidebar {
        padding: 16px;
        background: #9e9e9e;
}
</style>