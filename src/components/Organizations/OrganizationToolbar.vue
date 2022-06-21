<template>
    <Toolbar class="m-2">
        <template #start>
            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="() => openCreate()" />
            <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger"
                        :disabled="!selectedReports || !selectedReports.length" @click="confirmDeleteSelected" /> -->
        </template>

        <template #end>
            <Dropdown v-model="selectedOrganization" class="mr-2" :options="organizations"
                option-label="organizationName" :filter="true" placeholder="Select an organization" :show-clear="true"
                :loading="isOrganizationsLoading" />
            <Button label="Join" icon="pi pi-plus-circle" class="p-button-help"
                @click="() => submitJoin(selectedOrganization)" />
        </template>
    </Toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import useOrganizations from "../../hooks/useOrganizations"
import Organizations from "../../models/OrganizationsModel"

export default defineComponent({
    props: {
        refreshTable: {
            type: Function,
            required: true
        },
        openCreate: {
            type: Function,
            required: true
        },
        submitJoin: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const { organizations, isOrganizationsLoading } = useOrganizations()
        const selectedOrganization = ref<Organizations>()
        return {
            organizations,
            selectedOrganization,
            isOrganizationsLoading,
            props,
        }
    }
})
</script>

<style>
</style>