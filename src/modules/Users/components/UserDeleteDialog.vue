<script setup lang="ts">
import Users from "../../../models/UsersModel"

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    user: {
        type: Users,
        required: true
    }
})
const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.error('Invalid value type for update:show event!');
        return false
    },
    submitDialog: () => true
})
const closeDialog = () => emit('update:show', false)
</script>

<template>
    <Dialog header="User Delete Confirmation" :modal="true" :visible="props.show" @update:visible="closeDialog">
        <div class="confirmation-content flex align-content-center justify-content-between">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to delete user <b>{{ props.user.username }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" severity="success" autofocus @click="closeDialog" />
            <Button label="Yes" icon="pi pi-check" severity="danger" @click="() => emit('submitDialog')" />
        </template>
    </Dialog>
</template>
