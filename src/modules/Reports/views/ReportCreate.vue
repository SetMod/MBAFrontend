<script setup lang="ts">
import Reports from '../../../models/ReportsModel';
import useRoutes from '../../../hooks/useRoutes';
import useAnalyzes from '../../../hooks/useAnalyzes';
import { computed, onMounted, ref, watch, } from 'vue';
import useMembers from '../../../hooks/useMembers';
import useReports from '../../../hooks/useReports';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { simpleCSVParser, associationRulesToChartData } from '../../../utils';
import useVisualizations from '../../../hooks/useVisualizations';
import ReportCreateForm from '../components/ReportCreateForm.vue';
import Visualizations from '../../../models/VisualizationsModel';
import VisualizationCreateDialog from '../../Visualizations/components/VisualizationCreateDialog.vue';
import VisualizationEditDialog from '../../Visualizations/components/VisualizationEditDialog.vue';
import VisualizationDataView from '../../Visualizations/components/VisualizationDataView.vue';

const props = defineProps({
    orgId: {
        type: String,
        required: true
    }
})

onMounted(async () => {
    await getAnalyzesByFields({ status: 'FINISHED' }, true)
    if (currentMember.value) {
        newReport.value.creatorId = currentMember.value.id
    }
})

const toast = useToast()
const router = useRouter()
const { getOrganizationReportsRoute } = useRoutes()
const { currentMember } = useMembers()
const {
    isAnalyzesLoading,
    analyzes,
    analyzePreview,
    getAnalyzesByFields,
    previewAnalyze,
} = useAnalyzes()
const {
    reportsError,
    newReport: createdReport,
    createReport
} = useReports()
const {
    createVisualizations,
} = useVisualizations()
const newReport = ref(new Reports())
const newReportVisualization = ref<Visualizations[]>([])
const MAX_REPORT_VISUALIZATION_NUMBER = 10
const selectedAnalyze = computed(() => {
    return analyzes.value.find(analyze => analyze.id == newReport.value.analyzeId)
})
const analyzeData = computed(() => {
    if (analyzePreview.value) {
        const res = simpleCSVParser(analyzePreview.value, undefined, undefined)
        // return res
        return associationRulesToChartData(res.chartData)
    } else {
        return null
    }
})

watch(selectedAnalyze, async () => {
    if (selectedAnalyze.value) {
        await previewAnalyze(selectedAnalyze.value.id)
    }
})

const submitCancel = async () => {
    router.push(getOrganizationReportsRoute(Number(props.orgId)))
}

const submitCreate = async () => {
    if (currentMember.value) {
        newReport.value.creatorId = currentMember.value.id
        await createReport(newReport.value)

        if (createdReport.value) {
            newReportVisualization.value.map((v) => {
                if (createdReport.value) {
                    v.reportId = createdReport.value.id
                }
            })
            await createVisualizations(newReportVisualization.value)
        }
    }

    if (reportsError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to create', detail: reportsError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Created', detail: 'Report created', life: 1500 });
        router.push(getOrganizationReportsRoute(Number(props.orgId)))
    }
}

const showVisualizationCreateDialog = ref(false)
const openVisualizationCreateDialog = () => {
    if (!analyzeData.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select analyze first', life: 3000 })
        return
    }
    showVisualizationCreateDialog.value = true
}
const showVisualizationEditDialog = ref(false)
const selectedVisualization = ref<Visualizations>()
const openVisualizationEditDialog = (visualization: Visualizations) => {
    showVisualizationEditDialog.value = true
    selectedVisualization.value = visualization
}

const addNewVisualization = (visualization: Visualizations) => {
    newReportVisualization.value.push(visualization)
}
const removeVisualization = (index: number) => {
    newReportVisualization.value.splice(index, 1)
}
</script>

<template>
    <Toast />
    <ReportCreateForm :report="newReport" :analyzes="analyzes" :org-id="Number(props.orgId)"
        :is-analyzes-loading="isAnalyzesLoading" @submit-create="submitCreate" @submit-cancel="submitCancel" />
    <VisualizationCreateDialog v-if="showVisualizationCreateDialog && analyzeData"
        v-model:show="showVisualizationCreateDialog" :chart-data="analyzeData" @submit-form="addNewVisualization" />
    <VisualizationEditDialog v-if="selectedVisualization && showVisualizationEditDialog"
        v-model:show="showVisualizationEditDialog" :visualization="selectedVisualization" />
    <Toolbar>
        <template #start>
            <div>
                <Button label="Add visualization"
                    :disabled="newReportVisualization.length >= MAX_REPORT_VISUALIZATION_NUMBER"
                    @click="openVisualizationCreateDialog" />
            </div>
            <span class="ml-5">{{ newReportVisualization.length }} / {{ MAX_REPORT_VISUALIZATION_NUMBER }}</span>
        </template>
    </Toolbar>
    <VisualizationDataView :visualizations="newReportVisualization" @submit-edit="openVisualizationEditDialog"
        @submit-delete="removeVisualization" />
    <div>
        <!-- <pre>{{ analyzeData?.chartData }}</pre> -->
        <!-- <pre>{{ analyzeData }}</pre> -->
    </div>
    <!-- <ReportsVisualizationsDataView :edit="true" :report="newReport" /> -->
    <!-- <ReportsAnalyzesDataView :edit="true" :report="reportCreateState" /> -->
</template>
