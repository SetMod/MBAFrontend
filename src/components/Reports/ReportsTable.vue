<script setup lang="ts">
import { PropType } from "vue"
import useRoutes from "../../hooks/useRoutes"
import { IReportsFullResponse, ReportTypes } from "../../models/ReportsModel"

const props = defineProps(
    {
        reports: {
            type: Array as PropType<Array<IReportsFullResponse>>,
            required: true
        },
        isLoading: {
            type: Boolean,
            required: false
        },
    }
)
const emit = defineEmits({
    refreshTable: () => true,
})

const { getReportRoute, getUserRoute, getOrganizationRoute } = useRoutes()
</script>

<template>
    <div class="card">
        <DataTable :value="reports" removable-sort responsive-layout="scroll" :loading="props.isLoading" :paginator="true"
            :rows="10"
            paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rows-per-page-options="[10, 25, 50]"
            current-page-report-template="Showing {first} to {last} of {totalRecords}">
            <template #header>
                <div class="table-header flex justify-content-between align-items-center">
                    <h2>Reports</h2>
                    <Button icon="pi pi-refresh" class="h-2rem" @click="emit('refreshTable')" />
                </div>
            </template>
            <Column field="id" header="ID" :sortable="true"></Column>
            <Column field="name" header="Name" :sortable="true">
                <template #body="slotProps">
                    <router-link :to="getReportRoute(slotProps.data.creator.organization_id, slotProps.data.id)">
                        {{ slotProps.data.name }}
                    </router-link>
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
            <Column field="type" header="Type" :sortable="true">
                <template #body="slotProps">
                    <Badge :value="ReportTypes[slotProps.data.type]" />
                </template>
            </Column>
            <Column header="Dates" :sortable="true">
                <template #body="slotProps">
                    <div>
                        Created: {{ new Date(slotProps.data.createdDate).toLocaleDateString() }}
                    </div>
                    <div v-if="slotProps.data.updatedDate">
                        Updated: {{ new Date(slotProps.data.updatedDate).toLocaleDateString() }}
                    </div>
                    <div v-if="slotProps.data.softDeleted">
                        Deleted: {{ new Date(slotProps.data.deletedDate).toLocaleDateString() }}
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
