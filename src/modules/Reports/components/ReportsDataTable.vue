<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PropType, ref } from "vue"
import useOrganizations from "../../../hooks/useOrganizations";
import useUsers from "../../../hooks/useUsers";
import Reports from "../../../models/ReportsModel"

const props = defineProps({
    reports: {
        type: Array as PropType<Array<Reports>>,
        required: true
    },
    refreshTable: {
        type: Function,
        required: true
    },
    openView: {
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
})

const { users } = useUsers()
const { userOrganizations } = useOrganizations()
const filters = ref({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
});

</script>

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
        <Column field="reportCreateDate" header="Create date" :sortable="true" style="min-width:16rem">
            <template #body="slotProps">
                <div>
                    {{ new Date(slotProps.data.reportCreateDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <!-- <Column field="reportData" header="Description" :sortable="true" style="min-width:16rem"></Column> -->
        <Column field="userId" header="User" :sortable="true" style="min-width:16rem">
            <template #body="slotProps">
                <div>
                    {{ users?.find((usr) => usr.userId ==
                        slotProps.data.userId)?.userFirstName || slotProps.data.userId
                    }}
                </div>
            </template>
        </Column>
        <Column field="organizationId" header="Organization" :sortable="true" style="min-width:16rem">
            <template #body="slotProps">
                <div>
                    {{ userOrganizations?.find((org) => org.organizationId ==
                        slotProps.data.organizationId)?.organizationName || slotProps.data.organizationId
                    }}
                </div>
            </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
                <Button icon="pi pi-eye" class="p-button-rounded p-button-info mr-2"
                    @click="() => openView(slotProps.data)" />
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                    @click="() => openEdit(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                    @click="() => openDelete(slotProps.data)" />
            </template>
        </Column>
    </DataTable>
</template>
