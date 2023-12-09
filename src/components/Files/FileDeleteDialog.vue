<script setup lang="ts">
const props = defineProps(
    {
        display: {
            type: Boolean,
            required: true

        },
        closeDialog: {
            type: Function,
            required: true
        },
        submitDialog: {
            type: Function,
            required: true
        }
    }
) 
</script>


<template>
    <Dialog v-model:visible="props.display" header="Confirmation" :style="{ width: '350px' }" :modal="true">
        <div class="confirmation-content flex align-content-center justify-content-between">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to delete file?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text p-button-success" autofocus
                @click="() => props.closeDialog()" />
            <Button label="Yes" icon="pi pi-check" class="p-button-text p-button-danger"
                @click="() => props.submitDialog()" />
        </template>
    </Dialog>
</template>
