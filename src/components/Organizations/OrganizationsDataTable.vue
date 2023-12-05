<script setup lang="ts">
import { PropType } from "vue"
import Organizations from "../../models/OrganizationsModel"

const props = defineProps(
    {
        organizations: {
            type: Array as PropType<Array<Organizations>>,
            required: true
        },
        refreshTable: {
            type: Function,
            required: false,
            default: () => { }
        },
        openEdit: {
            type: Function,
            required: false,
            default: () => { }
        },
        openDelete: {
            type: Function,
            required: false,
            default: () => { }
        },
    }
)
</script>

<template>
    <DataTable :value="organizations" removable-sort responsive-layout="scroll" :paginator="true" :rows="10"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]" current-page-report-template="Showing {first} to {last} of {totalRecords}">
        <template #header>
            <div class="table-header flex justify-content-between align-items-center">
                <h2>Organizations</h2>
                <Button icon="pi pi-refresh" class="h-2rem" @click="() => refreshTable()" />
            </div>
        </template>
        <Column field="id" header="ID" :sortable="true"></Column>
        <Column field="name" header="Name" :sortable="true">
            <template #body="slotProps">
                <router-link :to="`/organization/${slotProps.data.id}/`">{{ slotProps.data.name }}</router-link>
            </template>
        </Column>
        <Column field="description" header="Description" :sortable="true"></Column>
        <Column field="email" header="Email" :sortable="true"></Column>
        <Column field="phone" header="Phone"></Column>
        <Column field="createdDate" header="Created Date" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ new Date(slotProps.data.createdDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <Column field="updatedDate" header="Updated Date" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ new Date(slotProps.data.updatedDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <Column field="deletedDate" header="Create Date" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ new Date(slotProps.data.updatedDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <Column field="softDeleted" header="Soft Deleted" :sortable="true"></Column>
        <Column header="Actions" header-style="width: 4rem; text-align: center" body-style="overflow: visible;">
            <template #body="slotProps">
                <div class="flex justify-content-around align-content-center">
                    <Button type="button" icon="pi pi-user-edit" class="mr-1 p-button-outlined p-button-info"
                        @click="() => props.openEdit(slotProps.data)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
                        @click="() => props.openDelete(slotProps.data)"></Button>
                </div>
            </template>
        </Column>
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
            <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="() => refreshTable()" />
        </template>
        <template #paginatorend>
        </template>
    </DataTable>
</template>
