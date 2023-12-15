<script setup lang="ts">
import { onMounted } from 'vue';
import useAnalyzes from '../../hooks/useAnalyzes';
import AnalyzesTable from '../../components/Analyzes/AnalyzesTable.vue';
import AnalyzeCreateForm from '../../components/Analyzes/AnalyzeCreateForm.vue';
import Analyzes from '../../models/AnalyzesModel';
import Datasources from '../../models/DatasourcesModel';
import Reports from '../../models/ReportsModel';
import { useToast } from 'primevue/usetoast';
import useDatasources from '../../hooks/useDatasources';

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

const toast = useToast();
const {
    isAnalyzesLoading,
    analyzesError,
    organizationAnalyzesFull,
    getOrganizationAnalyzesFull,
    createAnalyze
} = useAnalyzes()
const {
    organizationDatasourcesFull,
    isDatasourcesLoading,
    getOrganizationsDatasourcesFull
} = useDatasources()
const refreshTable = async () => {
    if (props.orgId) {
        await getOrganizationAnalyzesFull(Number(props.orgId))
        await getOrganizationsDatasourcesFull(Number(props.orgId))
    }
}

const submitAnalyze = async (analyze: Analyzes) => {
    const res = await createAnalyze(analyze)

    if (analyzesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: analyzesError.value.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Analyze success', life: 3000 });
    }
}
</script>

<template>
    <Toast />
    <h2>
        Analyzes
    </h2>
    <div>
        <AnalyzeCreateForm :datasources="organizationDatasourcesFull" :submit="submitAnalyze"
            :is-loading="isAnalyzesLoading" :is-datasources-loading="isDatasourcesLoading" />
        <!-- <div>
            <AssociationRulesDataTableVue :association-rules="associationRules || []" />
        </div> -->
    </div>
    <AnalyzesTable :analyzes="organizationAnalyzesFull" :is-loading="isAnalyzesLoading" @refresh-table="refreshTable" />
</template>
