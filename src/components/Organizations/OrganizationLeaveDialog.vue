<script setup lang="ts">

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
})
const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value == 'boolean') return true
        console.error('Invalid value type for update:show event!');
        return false
    },
    submitDialog: () => true
})
const closeDialog = () => emit('update:show', false)
const submitDialog = () => {
    emit('submitDialog')
    closeDialog()
}
</script>

<template>
    <Dialog header="Confirmation" :style="{ width: '350px' }" :modal="true" :visible="props.show"
        @update:visible="closeDialog">
        <div class="confirmation-content flex align-content-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Leave organization?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="closeDialog" />
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="submitDialog" />
        </template>
    </Dialog>
</template>
