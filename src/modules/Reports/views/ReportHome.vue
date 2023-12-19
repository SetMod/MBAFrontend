<script setup lang="ts">
import { onMounted } from 'vue';
import useReports from '../../../hooks/useReports';
import ReportCard from '../components/ReportCard.vue';
import useVisualizations from '../../../hooks/useVisualizations';
import useAnalyzes from '../../../hooks/useAnalyzes';
import VisualizationDataView from "../../Visualizations/components/VisualizationDataView.vue"
import { simpleCSVParser, associationRulesToChartData } from '../../../utils';

const props = defineProps({
    orgId: {
        type: String,
        required: true
    },
    reportId: {
        type: String,
        required: true
    }
})

onMounted(async () => {
    if (props.reportId) {
        await getReportById(Number(props.reportId))
        await getReportVisualizations(Number(props.reportId))
    }
    if (report.value && report.value.analyzeId) {
        await previewAnalyze(report.value.analyzeId)
    }
    if (analyzePreview.value) {
        const res = simpleCSVParser(analyzePreview.value, undefined, undefined)
        reportVisualizations.value.map((v) => {
            v.chartData = associationRulesToChartData(res.chartData)
        })
    }
})

const { isReportsLoading, report, getReportById } = useReports()
const { isVisualizationsLoading, visualizationsError, reportVisualizations, getReportVisualizations } = useVisualizations()
const { isAnalyzesLoading, analyzesError, analyzePreview, previewAnalyze, } = useAnalyzes()
</script>

<template>
    <Toast />
    <ReportCard v-if="report" :report="report" :is-loading="isReportsLoading" />
    <VisualizationDataView :visualizations="reportVisualizations" :show-actions="false" />
</template>
