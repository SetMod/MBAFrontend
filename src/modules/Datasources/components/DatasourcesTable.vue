<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PropType, ref } from "vue";
import useRoutes from "../../../hooks/useRoutes";
import { IDatasourcesFullResponse } from "../../../models/DatasourcesModel";
import { getDatasourceTypeValue, getDatasourceTypeSeverity } from '../utils'
import Organizations from "../../../models/OrganizationsModel";

const props = defineProps(
    {
        datasources: {
            type: Array as PropType<Array<IDatasourcesFullResponse>>,
            required: true
        },
        selectedOrganization: {
            type: Organizations,
            required: true
        },
        isLoading: {
            type: Boolean,
            required: true
        },
    }
)
const emit = defineEmits({
    refreshTable: () => true,
})


const {
    getOrganizationRoute,
    getUserRoute,
    getOrganizationDatasourceRoute
} = useRoutes()
const filters = ref({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
    <DataTable :value="props.datasources" removable-sort responsive-layout="scroll" :filters="filters" :paginator="true"
        :loading="props.isLoading" :rows="10"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]" current-page-report-template="Showing {first} to {last} of {totalRecords}">
        <template #header>
            <div class="table-header flex justify-content-between align-items-center">
                <h2>Datasources</h2>
                <div class="flex align-items-center">
                    <span class="mr-2 p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters.global.value" placeholder="Search..." />
                    </span>
                    <Button icon="pi pi-refresh" class="h-2rem" @click="() => emit('refreshTable')" />
                </div>
            </div>
        </template>
        <template #empty>
            <p>
                No datasources
            </p>
        </template>
        <Column field="id" header="ID" :sortable="true"></Column>
        <Column field="name" header="Name" :sortable="true">
            <template #body="slotProps">
                <router-link :to="getOrganizationDatasourceRoute(props.selectedOrganization.id, slotProps.data.id)">
                    {{ slotProps.data.name }}
                </router-link>
            </template>
        </Column>
        <Column field="type" header="Type" :sortable="true">
            <template #body="slotProps">
                <Badge :value="getDatasourceTypeValue(slotProps.data.type)"
                    :severity="getDatasourceTypeSeverity(slotProps.data.type)" />
            </template>
        </Column>
        <Column field="creator.user.username" header="Creator" :sortable="true">
            <template #body="slotProps">
                <router-link :to="getUserRoute(slotProps.data.creator.user_id)">
                    {{ slotProps.data.creator.user.username }}
                </router-link>
            </template>
        </Column>
        <Column field="creator.user.organization.name" header="Organization" :sortable="true">
            <template #body="slotProps">
                <router-link :to="getOrganizationRoute(slotProps.data.creator.organization_id)">
                    {{ slotProps.data.creator.organization.name }}
                </router-link>
            </template>
        </Column>
        <Column header="Dates" :sortable="true">
            <template #body="slotProps">
                <div>
                    Created: {{ new Date(slotProps.data.created_date).toLocaleDateString() }}
                </div>
                <div v-if="slotProps.data.updated_date">
                    Updated: {{ new Date(slotProps.data.updated_date).toLocaleDateString() }}
                </div>
                <div v-if="slotProps.data.soft_deleted">
                    Deleted: {{ new Date(slotProps.data.deleted_date).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <!-- <Column header="Actions">
            <template #body="slotProps">
                <div class="flex justify-content-around align-content-center">
                    <Button type="button" icon="pi pi-user-edit" class="mr-1 p-button-outlined p-button-info"
                        @click="() => emit('openEdit', slotProps.data)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
                        @click="() => emit('openDelete', slotProps.data)"></Button>
                </div>
            </template>
        </Column> -->
    </DataTable>
</template>

<style></style>