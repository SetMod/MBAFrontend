<template>
    <DataTable :value="organizations" removable-sort responsive-layout="scroll" :paginator="true" :rows="10"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]"
        current-page-report-template="Showing {first} to {last} of {totalRecords}">
        <template #header>
            <div class="table-header flex justify-content-between align-items-center">
                <h2>Organizations</h2>
                <Button icon="pi pi-refresh" class="h-2rem" @click="() => refreshTable()" />
            </div>
        </template>
        <Column field="organizationId" header="ID" :sortable="true"></Column>
        <Column field="organizationName" header="Name" :sortable="true"></Column>
        <Column field="organizationDescription" header="Description" :sortable="true"></Column>
        <Column field="organizationEmail" header="Email" :sortable="true"></Column>
        <Column field="organizationPhone" header="Phone"></Column>
        <Column field="organizationCreateDate" header="Created" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ new Date(slotProps.data.organizationCreateDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <Column field="organizationRoleName" header="Role"></Column>
        <Column header="Actions" header-style="width: 4rem; text-align: center" body-style="overflow: visible;">
            <template #body="slotProps">
                <div class="flex justify-content-around align-content-center">
                    <!-- <Button type="button" icon="pi pi-list"
                                class="mr-1 p-button-outlined p-button-info"></Button> -->
                    <Button v-tooltip="'Click to select organization'" class="mr-1"
                        :class="organization?.organizationId === slotProps.data.organizationId ? 'p-button-success' : 'p-button-outlined p-button-secondary'"
                        :icon="organization?.organizationId === slotProps.data.organizationId ? 'pi pi-minus-circle' : 'pi pi-plus-circle'"
                        @click="() => selectOrganization(slotProps.data)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
                        @click="() => openLeave(slotProps.data)"></Button>
                </div>
            </template>
        </Column>
        <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="() => props.refreshTable()" />
        </template>
        <template #paginatorend>
        </template>
    </DataTable>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import useOrganizations from "../../hooks/useOrganizations"
import Organizations from "../../models/OrganizationsModel"

export default defineComponent({
    props: {
        organizations: {
            type: Array as PropType<Array<Organizations>>,
            required: true
        },
        refreshTable: {
            type: Function,
            required: true
        },
        selectOrganization: {
            type: Function,
            required: true
        },
        openLeave: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const { organization } = useOrganizations()
        return {
            organization,
            props
        }
    }
})
</script>

<style>
</style>