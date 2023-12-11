<script setup lang="ts">
import { PropType, ref } from "vue"
import Organizations from "../../models/OrganizationsModel"

const organization = ref<Organizations>()
const props = defineProps({
    showNewDialog: {
        type: Boolean,
        required: true
    },
    organizations: {
        type: Array as PropType<Organizations[]>,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    },
})
const emit = defineEmits({
    'update:show-new-dialog': (value: boolean) => {
        if (typeof value === 'boolean') {
            return true
        }
        console.error('Invalid value type for update:show-new-dialog event!');
        return false
    },
    selectOrganization: (value: Organizations) => {
        if (value instanceof Organizations) {
            return true
        }
        console.error('Invalid value type for submit-join event!');
        return false
    },
    submitJoin: (value: Organizations | undefined) => {
        if (value instanceof Organizations) {
            return true
        }
        console.error('Invalid value type for submit-join event!');
        return false
    },
})
const openCreateDialog = () => emit('update:show-new-dialog', true)
</script>

<template>
    <Toolbar class="m-2">
        <template #start>
            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openCreateDialog" />
            <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger"
                :disabled="!selectedReports || !selectedReports.length" @click="confirmDeleteSelected" /> -->
        </template>

        <template #end>
            <!-- <Dropdown v-model="props.selectedOrganization" class="mr-2" :options="props.organizations.map(org => org.name)" -->
            <Dropdown class="mr-2" :options="props.organizations" option-label="name" :filter="true"
                placeholder="Select an organization" :show-clear="true" :loading="props.isLoading"
                :model-value="organization"
                @update:model-value="(organization: Organizations) => emit('selectOrganization', organization)" />
            <Button label="Join" icon="pi pi-plus-circle" class="p-button-help" @click="emit('submitJoin', organization)" />
        </template>
    </Toolbar>
</template>
