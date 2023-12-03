<script setup lang="ts">
import { computed } from "vue";
import Users from "../../models/UsersModel"

const props = defineProps(
    {
        display: {
            type: Boolean,
            required: true
        },
        user: {
            type: Users,
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
const visible = computed(() => {
    return props.display
})
</script>

<template>
    <Dialog v-model:visible="visible" header="User Delete Confirmation" :style="{ width: '350px' }" :modal="true">
        <div class="confirmation-content flex align-content-center justify-content-between">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to delete user <b>{{ props.user.username }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text p-button-success" autofocus
                @click="() => props.closeDialog()" />
            <Button label="Yes" icon="pi pi-check" class="p-button-text p-button-danger"
                @click="() => props.submitDialog()" />
        </template>
    </Dialog>
</template>
