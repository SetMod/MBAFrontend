<script setup lang="ts">

const emit = defineEmits({
    openCreate: () => true,
    exportCSV: (event: MouseEvent) => {
        if (event instanceof MouseEvent) return true
        console.error('Invalid param type for exportCSV event');
        return false
    }
})
</script>

<template>
    <Toolbar class="m-2">
        <template #start>
            <Button label="New" icon="pi pi-plus" severity="success" @click="() => emit('openCreate')" />
        </template>

        <template #end>
            <Button label="Export" icon="pi pi-upload" severity="help" @click="(event) => emit('exportCSV', event)" />
        </template>
    </Toolbar>
</template>
