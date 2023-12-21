<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Analyzes from '../../../models/AnalyzesModel';
import useAnalyzes from '../../../hooks/useAnalyzes';
import useDatasources from '../../../hooks/useDatasources';
import AnalyzeCreateForm from '../components/AnalyzeCreateForm.vue';
import AnalyzesTable from '../components/AnalyzesTable.vue';
import useMembers from '../../../hooks/useMembers';
import AnalyzeEditDialog from '../components/AnalyzeEditDialog.vue';
import AnalyzePreviewDialog from '../components/AnalyzePreviewDialog.vue';
import AnalyzePreviewTable from '../components/AnalyzePreviewTable.vue';
import AnalyzeDeleteDialog from '../components/AnalyzeDeleteDialog.vue';

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
    analyzePreview,
    getOrganizationAnalyzesFull,
    createAnalyze,
    startAnalyze,
    downloadAnalyze,
    updateAnalyze,
    previewAnalyze,
    deleteAnalyze,
} = useAnalyzes()
const {
    currentMember
} = useMembers()
const {
    organizationDatasourcesFull,
    isDatasourcesLoading,
    getOrganizationsDatasourcesFull
} = useDatasources()
const selectedAnalyze = ref<Analyzes>()
const showAnalyzePreviewDialog = ref(false)
const showAnalyzeEditDialog = ref(false)
const showAnalyzeDeleteDialog = ref(false)

const refreshTable = async () => {
    if (props.orgId) {
        await getOrganizationAnalyzesFull(Number(props.orgId))
        await getOrganizationsDatasourcesFull(Number(props.orgId))
    }
}

const submitCreate = async (analyze: Analyzes) => {
    if (currentMember.value) {
        analyze.creatorId = currentMember.value.id
        await createAnalyze(analyze)
    }

    if (analyzesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: analyzesError.value.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Analyze success', life: 3000 });
        await refreshTable()
    }
}

const submitPreview = async (analyze: Analyzes) => {
    selectedAnalyze.value = analyze
    showAnalyzePreviewDialog.value = true;

    await previewAnalyze(analyze.id)

    if (analyzesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: analyzesError.value.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Analyze preview', life: 3000 });
    }
}

const submitAnalyze = async (analyze: Analyzes) => {
    await startAnalyze(analyze.id)

    if (analyzesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: analyzesError.value.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Started analyze', life: 3000 });
        await refreshTable()
    }
}

const submitDownload = async (analyze: Analyzes) => {
    await downloadAnalyze(analyze.id)

    if (analyzesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: analyzesError.value.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Downloading', detail: 'Downloading analyze', life: 3000 });
        await refreshTable()
    }
}


const openAnalyzeEditDialog = (analyze: Analyzes) => { showAnalyzeEditDialog.value = true; selectedAnalyze.value = analyze }
const submitEdit = async () => {

    if (selectedAnalyze.value) {
        await updateAnalyze(selectedAnalyze.value.id, selectedAnalyze.value)
    }

    if (analyzesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: analyzesError.value.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Updated', detail: `Analyze "${selectedAnalyze.value?.name}" updated`, life: 3000 });
        await refreshTable()
    }
}

const openAnalyzeDeleteDialog = (analyze: Analyzes) => { showAnalyzeDeleteDialog.value = true; selectedAnalyze.value = analyze }
const submitDelete = async () => {

    if (selectedAnalyze.value) {
        await deleteAnalyze(selectedAnalyze.value.id)
    }

    if (analyzesError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: analyzesError.value.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Deleted', detail: `Analyze "${selectedAnalyze.value?.name}" deleted`, life: 3000 });
        await refreshTable()
    }
}
</script>

<template>
    <Toast />
    <h2>
        Analyzes
    </h2>
    <AnalyzeCreateForm v-if="currentMember" :datasources="organizationDatasourcesFull" :is-loading="isAnalyzesLoading"
        :is-datasources-loading="isDatasourcesLoading" @submit-create="submitCreate" />
    <AnalyzeEditDialog v-if="selectedAnalyze && showAnalyzeEditDialog" v-model:show="showAnalyzeEditDialog"
        :analyze="selectedAnalyze" @submit-dialog="submitEdit" />
    <AnalyzeDeleteDialog v-if="selectedAnalyze && showAnalyzeDeleteDialog" v-model:show="showAnalyzeDeleteDialog"
        :analyze="selectedAnalyze" @submit-dialog="submitDelete" />
    <AnalyzePreviewDialog v-model:show="showAnalyzePreviewDialog" :analyze-content="analyzePreview"
        :is-loading="isAnalyzesLoading" />
    <!-- <div>
            <AssociationRulesDataTableVue :association-rules="associationRules || []" />
        </div> -->
    <AnalyzesTable :analyzes="organizationAnalyzesFull" :is-loading="isAnalyzesLoading" @refresh-table="refreshTable"
        @submit-analyze="submitAnalyze" @submit-edit="openAnalyzeEditDialog" @submit-download="submitDownload"
        @submit-delete="openAnalyzeDeleteDialog" @submit-preview="submitPreview" />
</template>
