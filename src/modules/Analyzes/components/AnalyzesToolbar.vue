<script setup lang="ts">
const emit = defineEmits({
    openCreate: () => true,
    exportCSV: (event: Event) => true,
})

</script>

<template>
    <Toolbar class="m-2">
        <template #start>
            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="() => emit('openCreate')" />
        </template>

        <template #end>
            <Button label="Export" icon="pi pi-upload" class="p-button-help"
                @click="($event) => emit('exportCSV', $event)" />
        </template>
    </Toolbar>
</template>
