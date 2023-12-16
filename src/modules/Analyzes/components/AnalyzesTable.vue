<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PropType, ref } from "vue";
import useRoutes from "../../../hooks/useRoutes";
import { IAnalyzesFullResponse } from "../../../models/AnalyzesModel";
import { getAlgorithmValue, getAlgorithmSeverity, getAnalyzeStatus, getAnalyzeSeverity } from "../utils"

const props = defineProps(
    {
        analyzes: {
            type: Array as PropType<Array<IAnalyzesFullResponse>>,
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
    getOrganizationDatasourceRoute,
    getOrganizationAnalyzeRoute
} = useRoutes()
const filters = ref({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
    <DataTable :value="props.analyzes" removable-sort responsive-layout="scroll" :filters="filters" :paginator="true"
        :loading="props.isLoading" :rows="10"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]" current-page-report-template="Showing {first} to {last} of {totalRecords}">
        <template #header>
            <div class="table-header flex justify-content-between align-items-center">
                <h2>Analyzes</h2>
                <div class="flex align-items-center">
                    <span class="mr-2 p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters.global.value" placeholder="Search..." />
                    </span>
                    <Button icon="pi pi-refresh" class="h-2rem" @click="() => emit('refreshTable')" />
                </div>
            </div>
        </template>
        <Column field="id" header="ID" :sortable="true"></Column>
        <Column field="name" header="Name" :sortable="true">
            <template #body="slotProps">
                <router-link :to="getOrganizationAnalyzeRoute(slotProps.data.creator.organization_id, slotProps.data.id)">
                    {{ slotProps.data.name }}
                </router-link>
            </template>
        </Column>
        <Column field="description" header="Description" :sortable="true"></Column>
        <Column field="algorithm" header="Algorithm" :sortable="true">
            <template #body="slotProps">
                <Badge :value="getAlgorithmValue(slotProps.data.algorithm)"
                    :severity="getAlgorithmSeverity(slotProps.data.algorithm)" />
            </template>
        </Column>
        <Column field="status" header="Status" :sortable="true">
            <template #body="slotProps">
                <Badge :value="getAnalyzeStatus(slotProps.data.status)"
                    :severity="getAnalyzeSeverity(slotProps.data.status)" class="h-full" />
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
        <Column field="datasource.name" header="Datasource" :sortable="true">
            <template #body="slotProps">
                <router-link
                    :to="getOrganizationDatasourceRoute(slotProps.data.datasource.creator.organization_id, slotProps.data.datasource_id)">
                    {{ slotProps.data.datasource.name }}
                </router-link>
            </template>
        </Column>
        <Column header="Parameters" :sortable="true">
            <template #body="slotProps">
                <div>
                    <div><b>Support:</b> {{ slotProps.data.support }}</div>
                    <div><b>Confidence:</b> {{ slotProps.data.confidence }}</div>
                    <div><b>Lift:</b> {{ slotProps.data.lift }}</div>
                    <div><b>Rules length:</b> {{ slotProps.data.rules_length }}</div>
                </div>
            </template>
        </Column>
        <Column header="Execution" :sortable="true">
            <template #body="slotProps">
                <div>
                    <b>Started:</b>
                    {{
                        slotProps.data.started_date ?
                        new Date(slotProps.data.started_date).toLocaleDateString() : 'None'
                    }}
                </div>
                <div>
                    <b>Finished:</b>
                    {{
                        slotProps.data.finished_date ?
                        new Date(slotProps.data.finished_date).toLocaleDateString() : 'None'
                    }}
                </div>
            </template>
        </Column>
        <Column header="Dates" :sortable="true">
            <template #body="slotProps">
                <div>
                    <b>Created:</b> {{ new Date(slotProps.data.created_date).toLocaleDateString() }}
                </div>
                <div v-if="slotProps.data.updated_date">
                    <b>Updated:</b> {{ new Date(slotProps.data.updated_date).toLocaleDateString() }}
                </div>
                <div v-if="slotProps.data.soft_deleted">
                    <b>Deleted:</b> {{ new Date(slotProps.data.deleted_date).toLocaleDateString() }}
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
