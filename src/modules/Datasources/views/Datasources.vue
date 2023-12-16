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
    createFileDatasource
} = useDatasources()
const showDatasourceCreateDialog = ref(false)
const selectedFile = ref<File>()

const refreshTable = async () => {
    if (props.orgId) {
        await getOrganizationsDatasourcesFull(Number(props.orgId))
    }
}
const openDatasourceCreateDialog = () => {
    showDatasourceCreateDialog.value = true
}


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
    <Toolbar class="m-2">
        <template #start>
            <Button label="New" icon="pi pi-plus" class="mr-2" @click="openDatasourceCreateDialog" />
        </template>
    </Toolbar>
    <DatasourcesTable v-if="selectedOrganization" :datasources="organizationDatasourcesFull"
        :selected-organization="selectedOrganization" :is-loading="isDatasourcesLoading" @refresh-table="refreshTable" />
</template>
