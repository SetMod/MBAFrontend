<script setup lang="ts">
import { PropType } from "vue"
import useRoutes from "../../../hooks/useRoutes"
import { IReportsFullResponse } from "../../../models/ReportsModel"
import { getReportTypeSeverity, getReportTypeValue } from "../utils"
import Reports from '../../../models/ReportsModel'

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
    submitEdit: (report: Reports) => {
        if (report instanceof Reports) return true
        console.error('Invalid params type for submitEdit event');
        return false
    },
    submitDelete: (report: Reports) => {
        if (report instanceof Reports) return true
        console.error('Invalid params type for submitDelete event');
        return false
    },
})

const submitEdit = (reportJson: IReportsFullResponse) => {
    emit('submitEdit', Reports.fromJSON(reportJson))
}
const submitDelete = (reportJson: IReportsFullResponse) => {
    emit('submitDelete', Reports.fromJSON(reportJson))
}

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
                    <Badge :value="getReportTypeValue(slotProps.data.type)"
                        :severity="getReportTypeSeverity(getReportTypeValue(slotProps.data.type))" />
                </template>
            </Column>
            <Column header="Dates" :sortable="true">
                <template #body="slotProps">
                    <div>
                        <b>Created:</b> {{ new Date(slotProps.data.created_date).toUTCString() }}
                    </div>
                    <div v-if="slotProps.data.updated_date">
                        <b>Updated:</b> {{ new Date(slotProps.data.updated_date).toUTCString() }}
                    </div>
                    <div v-if="slotProps.data.soft_deleted">
                        <b>Deleted:</b> {{ new Date(slotProps.data.deleted_date).toUTCString() }}
                    </div>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <div class="w-10rem flex gap-1">
                        <Button v-tooltip="{ value: 'Edit', showDelay: 1000, hideDelay: 300 }" icon="pi pi-pencil"
                            severity="warning" outlined @click="() => submitEdit(slotProps.data)"></Button>
                        <Button v-tooltip="{ value: 'Delete', showDelay: 1000, hideDelay: 300 }" icon="pi pi-times"
                            severity="danger" outlined @click="() => submitDelete(slotProps.data)"></Button>
                        <!-- <Button label="Toggle" :aria-haspopup="true" aria-controls="overlay_actions_menu" @click="toggle" />
                    <TieredMenu id="overlay_actions_menu" ref="menu" :model="items" popup /> -->
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
