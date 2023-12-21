<script setup lang="ts">
import Analyzes from "../../../models/AnalyzesModel"

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    analyze: {
        type: Analyzes,
        required: true
    },
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.error('Invalid update:show event params');
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
    <Dialog :visible="props.show" :style="{ width: '450px' }" header="Confirm" :modal="true" @update:visible="closeDialog">
        <div class="confirmation-content flex align-content-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to delete "{{ props.analyze.name }}" analyze?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" severity="secondary" @click="closeDialog" />
            <Button label="Yes" icon="pi pi-check" severity="success" @click="submitDialog" />
        </template>
    </Dialog>
</template>
