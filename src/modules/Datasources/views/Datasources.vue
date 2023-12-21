<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Datasources, { DatasourceTypes } from '../../../models/DatasourcesModel';
import useMembers from '../../../hooks/useMembers';
import useDatasources from '../../../hooks/useDatasources';
import useOrganizations from '../../../hooks/useOrganizations';
import DatasourcesTable from '../components/DatasourcesTable.vue';
import DatasourceCreateDialog from '../components/DatasourceCreateDialog.vue';
import FileDatasourceUpload from '../components/FileDatasourceUpload.vue';
import DBDatasourceConnect from '../components/DBDatasourceConnect.vue';
import { getDatasourceTypeValue } from '../utils';
import DatasourceEditDialog from '../components/DatasourceEditDialog.vue';
import DatasourceDeleteDialog from '../components/DatasourceDeleteDialog.vue';

const props = defineProps({
    orgId: {
        type: String,
        required: false,
        default: ''
    },
})

onMounted(async () => {
    await refreshTable()
})

const toast = useToast()
const { currentMember } = useMembers()
const { selectedOrganization } = useOrganizations()
const {
    isDatasourcesLoading,
    datasourcesError,
    organizationDatasourcesFull,
    getOrganizationsDatasourcesFull,
    createFileDatasource,
    updateDatasource,
    downloadFileDatasource,
    deleteDatasource,
} = useDatasources()

const showDatasourceCreateDialog = ref(false)
const showDatasourceEditDialog = ref(false)
const showDatasourceDeleteDialog = ref(false)
const selectedDatasource = ref<Datasources>()
const selectedFile = ref<File>()

const refreshTable = async () => {
    if (props.orgId) {
        await getOrganizationsDatasourcesFull(Number(props.orgId))
    }
}
const openDatasourceCreateDialog = () => showDatasourceCreateDialog.value = true

// const submitCreateDialog = async (event: any, newDatasource: Datasources) => {
const submitCreateDialog = async (newDatasource: Datasources) => {
    if (!currentMember.value) {
        toast.add({ severity: 'error', summary: 'Error', detail: "Current member is empty", life: 3000 })
        return
    }

    newDatasource.creatorId = currentMember.value.id
    if (newDatasource.type == DatasourceTypes.FILE) {
        if (!(selectedFile.value instanceof File)) {
            toast.add({ severity: 'error', summary: 'Error', detail: "Select file", life: 3000 })
            return
        }

        const form = new FormData();
        form.append('file', selectedFile.value)
        newDatasource.fileName = selectedFile.value.name
        newDatasource.fileSize = selectedFile.value.size

        const res = await createFileDatasource(newDatasource, form)
    } else if (newDatasource.type == DatasourceTypes.DB) {
        toast.add({ severity: 'success', summary: 'Created', detail: 'Created DB datasource', life: 3000 })
    }

    if (datasourcesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: datasourcesError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Created', detail: 'Datasource created', life: 3000 });
        await refreshTable()
    }
}

const submitDownload = async (datasource: Datasources) => {
    if (getDatasourceTypeValue(datasource.type) != DatasourceTypes.FILE) {
        toast.add({ severity: 'error', summary: 'Error', detail: "Invalid datasource type", life: 3000 })
        return
    }

    await downloadFileDatasource(datasource.id)

    if (datasourcesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: datasourcesError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Downloading', detail: `Downloading file for "${datasource.name}" datasource"`, life: 3000 });
    }
}

const openDatasourceEditDialog = (datasource: Datasources) => {
    showDatasourceEditDialog.value = true;
    selectedDatasource.value = datasource
}
const submitEdit = async () => {
    if (selectedDatasource.value) {
        await updateDatasource(selectedDatasource.value.id, selectedDatasource.value)
    }

    if (datasourcesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: datasourcesError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Downloading', detail: `Downloading file for "${selectedDatasource.value?.name}" datasource"`, life: 3000 });
        await refreshTable()
    }
}

const openDatasourceDeleteDialog = (datasource: Datasources) => {
    showDatasourceDeleteDialog.value = true;
    selectedDatasource.value = datasource
}
const submitDelete = async () => {
    if (selectedDatasource.value) {
        await deleteDatasource(selectedDatasource.value.id)
    }

    if (datasourcesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to delete', detail: datasourcesError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Deleted', detail: `Datasource "${selectedDatasource.value?.name}" deleted`, life: 1500 });
        await refreshTable()
    }
}

const testDBConnection = async (event: any, newDatasource: Datasources) => {
    toast.add({ severity: 'info', summary: 'Testing connection', detail: 'Testing connection', life: 3000 })
}
</script>

<template>
    <Toast />
    <h2>
        Datasources
    </h2>
    <DatasourceCreateDialog v-if="showDatasourceCreateDialog" v-slot="slotProps" v-model:show="showDatasourceCreateDialog"
        @submit-dialog="submitCreateDialog">
        <FileDatasourceUpload v-if="slotProps.newDatasource.type == DatasourceTypes.FILE"
            v-model:selected-file="selectedFile" />
        <DBDatasourceConnect v-else-if="slotProps.newDatasource.type == DatasourceTypes.DB"
            :datasource="slotProps.newDatasource" @test-connection="testDBConnection" />
    </DatasourceCreateDialog>
    <DatasourceEditDialog v-if="selectedDatasource && showDatasourceEditDialog" v-model:show="showDatasourceEditDialog"
        :datasource="selectedDatasource" @submit-dialog="submitEdit" />
    <DatasourceDeleteDialog v-if="selectedDatasource && showDatasourceDeleteDialog"
        v-model:show="showDatasourceDeleteDialog" :datasource="selectedDatasource" @submit-dialog="submitDelete" />
    <Toolbar class="m-2">
        <template #start>
            <Button label="New" icon="pi pi-plus" class="mr-2" @click="openDatasourceCreateDialog" />
        </template>
    </Toolbar>
    <DatasourcesTable v-if="selectedOrganization" :datasources="organizationDatasourcesFull"
        :selected-organization="selectedOrganization" :is-loading="isDatasourcesLoading" @refresh-table="refreshTable"
        @submit-download="submitDownload" @submit-edit="openDatasourceEditDialog"
        @submit-delete="openDatasourceDeleteDialog" />
</template>
