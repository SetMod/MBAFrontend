<script setup lang="ts">
import useRoutes from '../../../hooks/useRoutes';

const props = defineProps({
    orgId: {
        type: Number,
        required: true
    }
})

const emit = defineEmits({
    openCreate: () => true,
    exportCSV: (event: MouseEvent) => {
        if (event instanceof MouseEvent) return true
        console.error('Invalid param type for exportCSV event');
        return false
    }
})

const { getReportCreateRoute } = useRoutes()
</script>

<template>
    <Toolbar class="m-2">
        <template #start>
            <!-- <Button label="New" icon="pi pi-plus" severity="success" @click="() => emit('openCreate')" /> -->
            <router-link :to="getReportCreateRoute(props.orgId)">
                <Button label="New" icon="pi pi-plus" severity="success" />
            </router-link>
        </template>

        <!-- <template #end>
            <Button label="Export" icon="pi pi-upload" severity="help" @click="(event) => emit('exportCSV', event)" />
        </template> -->
    </Toolbar>
</template>
