<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PropType, ref } from "vue";
import useRoutes from "../../../hooks/useRoutes";
import Datasources, { DatasourceTypes, IDatasourcesFullResponse } from "../../../models/DatasourcesModel";
import { getDatasourceTypeValue, getDatasourceTypeSeverity } from '../utils'
import Organizations from "../../../models/OrganizationsModel";
import TieredMenu from "primevue/tieredmenu";

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
    submitDownload: (datasource: Datasources) => {
        if (datasource instanceof Datasources) return true
        console.error('Invalid params type for submitDownload event');
        return false
    },
    submitDelete: (datasource: Datasources) => {
        if (datasource instanceof Datasources) return true
        console.error('Invalid params type for submitDelete event');
        return false
    },
    submitEdit: (datasource: Datasources) => {
        if (datasource instanceof Datasources) return true
        console.error('Invalid params type for submitEdit event');
        return false
    },
})

const submitDownload = (datasourceJson: IDatasourcesFullResponse) => {
    emit('submitDownload', Datasources.fromJSON(datasourceJson))
}
const submitEdit = (datasourceJson: IDatasourcesFullResponse) => {
    emit('submitEdit', Datasources.fromJSON(datasourceJson))
}
const submitDelete = (datasourceJson: IDatasourcesFullResponse) => {
    emit('submitDelete', Datasources.fromJSON(datasourceJson))
}

const previewFileDatasource = () => {
    console.log('Previewing file');
}

const filters = ref({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
});
const {
    getOrganizationRoute,
    getUserRoute,
    getOrganizationDatasourceRoute
} = useRoutes()

// const menu = ref<TieredMenu>();
// const toggle = (event: any) => {
//     if (menu.value) {
//         menu.value.toggle(event);
//     }
// };
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
        <Column header="Details" :sortable="true">
            <template #body="slotProps">
                <div v-if="getDatasourceTypeValue(slotProps.data.type) == DatasourceTypes.FILE">
                    <div class="field">
                        <b>File name: </b>
                        <span>
                            {{ slotProps.data.file_name }}
                        </span>
                    </div>
                    <div class="field">
                        <b>File size: </b>
                        <span>
                            {{ Math.round(slotProps.data.file_size / 1024 / 1024) }}Mb
                        </span>
                    </div>
                </div>
                <div v-if="getDatasourceTypeValue(slotProps.data.type) == DatasourceTypes.DB">
                    <div v-if="slotProps.data.connection_string" class="field">
                        <b>Connection string: </b>
                        <span>
                            {{ slotProps.data.connection_string }}
                        </span>
                    </div>
                </div>
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
                    <Button v-if="slotProps.data.file_path"
                        v-tooltip="{ value: 'Download', showDelay: 1000, hideDelay: 300 }" icon="pi pi-download"
                        security="info" outlined @click="() => submitDownload(slotProps.data)"></Button>
                    <Button v-tooltip="{ value: 'Preview', showDelay: 1000, hideDelay: 300 }" icon="pi pi-info-circle"
                        @click="previewFileDatasource"></Button>
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
</template>

<style></style>