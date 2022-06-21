<template>
    <DataTable ref="dt" :value="reports" :paginator="true" :rows="10" :filters="filters"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[5, 10, 25]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} reports" responsive-layout="scroll">
        <template #header>
            <div class="flex justify-content-between align-content-center">
                <h3 class="">Manage reports</h3>
                <div class="flex align-items-center">
                    <span class="mr-2 p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters.global.value" placeholder="Search..." />
                    </span>
                    <Button icon="pi pi-refresh" class="h-2rem" @click="() => refreshTable()" />
                </div>
            </div>
        </template>
        <Column field="reportId" header="ID" :sortable="true" style="min-width:12rem"></Column>
        <Column field="reportName" header="Name" :sortable="true" style="min-width:16rem"></Column>
        <!-- <Column field="reportData" header="Description" :sortable="true" style="min-width:16rem"></Column> -->
        <Column field="userId" header="User" :sortable="true" style="min-width:16rem"></Column>
        <Column field="organizationId" header="Organization" :sortable="true" style="min-width:16rem">
        </Column>
        <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                    @click="() => openEdit(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                    @click="() => openDelete(slotProps.data)" />
            </template>
        </Column>
    </DataTable>
</template>

<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import { defineComponent, PropType, ref } from "vue"
import Reports from "../../models/ReportsModel"

export default defineComponent({
    props: {
        reports: {
            type: Array as PropType<Array<Reports>>,
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
        }
    },
    setup(props) {
        const filters = ref({
            global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
        });
        return {
            filters,
            props
        }
    }
})
</script>

<style>
</style>