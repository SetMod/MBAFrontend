<template>
    <Toolbar class="m-2">
        <template #start>
            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="() => openCreate()" />
        </template>

        <template #end>
            <!-- <FileUpload mode="basic" accept="image/*" :max-file-size="1000000" label="Import" choose-label="Import"
                class="mr-2 inline-block" /> -->
            <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="($event) => exportCSV($event)" />
        </template>
    </Toolbar>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        openCreate: {
            type: Function,
            required: true
        },
        exportCSV: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        return {
            props
        }
    }
})
</script>

<style>
</style>