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
        <Column field="organizationCreateDate" header="Created" :sortable="true"></Column>
        <Column header="Actions" header-style="width: 4rem; text-align: center" body-style="overflow: visible;">
            <template #body="slotProps">
                <div class="flex justify-content-around align-content-center">
                    <Button type="button" icon="pi pi-list" class="p-button-outlined p-button-info mr-1"></Button>
                    <Button type="button" icon="pi pi-pencil" class="p-button-outlined p-button-warning mr-1"
                        @click="() => openEdit(slotProps.data)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
                        @click="() => openDelete(slotProps.data)"></Button>
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
        openEdit: {
            type: Function,
            required: true
        },
        openDelete: {
            type: Function,
            required: true
        },
    },
    setup(props) {
        return {
            props,
        }
    }
})
</script>

<style>
</style>