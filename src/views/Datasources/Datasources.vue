<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useDatasources from '../../hooks/useDatasources';
import DatasourcesTable from '../../components/Datasources/DatasourcesTable.vue';
import DatasourceCreateDialog from '../../components/Datasources/DatasourceCreateDialog.vue';

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

const { isDatasourcesLoading, organizationDatasourcesFull, getOrganizationsDatasourcesFull, } = useDatasources()

const refreshTable = async () => {
    if (props.orgId) {
        await getOrganizationsDatasourcesFull(Number(props.orgId))
    }
}
const showDatasourceCreateDialog = ref(false)
const openDatasourceCreateDialog = () => {
    showDatasourceCreateDialog.value = true
}
</script>

<template>
    <h1>
        Datasources
    </h1>
    <DatasourceCreateDialog v-model:show="showDatasourceCreateDialog" />
    <div>
        <Toolbar class="m-2">
            <template #start>
                <Button label="New" icon="pi pi-plus" class="mr-2" @click="openDatasourceCreateDialog" />
            </template>
        </Toolbar>
    </div>
    <DatasourcesTable :datasources="organizationDatasourcesFull" :is-loading="isDatasourcesLoading"
        @refresh-table="refreshTable" />
</template>
