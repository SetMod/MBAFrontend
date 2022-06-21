<template>
    <Dialog v-model:visible="props.display" :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="confirmation-content flex align-content-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to delete report?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="() => closeDialog()" />
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="() => submitDialog()" />
        </template>
    </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
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