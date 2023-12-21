<script setup lang="ts">
import { PropType } from "vue"
import Organizations from "../../../models/OrganizationsModel"

const props = defineProps({
    showNewDialog: {
        type: Boolean,
        required: true
    },
    organizations: {
        type: Array as PropType<Organizations[]>,
        required: true
    },
    selectedOrganization: {
        type: [Organizations, null] as PropType<Organizations | null>,
        required: true,
    },
    isLoading: {
        type: Boolean,
        required: true
    },
})

const emit = defineEmits({
    'update:showNewDialog': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.error('Invalid value type for update:showNewDialog event!');
        return false
    },
    'update:selectedOrganization': (value: Organizations) => {
        if (value instanceof Organizations) return true
        console.error('Invalid value type for submit-join event!');
        return false
    },
    submitJoin: () => true,
})

const openCreateDialog = () => emit('update:showNewDialog', true)
</script>

<template>
    <Toolbar class="m-2">
        <template #start>
            <Button label="New" icon="pi pi-plus" class="mr-2" @click="openCreateDialog" />
            <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger"
                :disabled="!selectedReports || !selectedReports.length" @click="confirmDeleteSelected" /> -->
        </template>

        <template #end>
            <Dropdown :model-value="props.selectedOrganization" :filter="true" :options="props.organizations"
                option-label="name" placeholder="Select an organization" :show-clear="true" :loading="props.isLoading"
                class="mr-2" @update:model-value="(org: Organizations) => emit('update:selectedOrganization', org)" />
            <Button label="Join" icon="pi pi-plus-circle" class="p-button-help" @click="emit('submitJoin')" />
        </template>
    </Toolbar>
</template>
