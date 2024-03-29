<script setup lang="ts">
import Reports from "../../../models/ReportsModel"
import useReportEditValidate from "../hooks/useReportEditValidate"
import VisualizationDataView from "../../Visualizations/components/VisualizationDataView.vue"
import useVisualizations from "../../../hooks/useVisualizations"
import useAnalyzes from "../../../hooks/useAnalyzes"
import { simpleCSVParser, associationRulesToChartData } from "../../../utils"
import { onMounted } from "vue"

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    report: {
        type: Reports,
        required: true
    },
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.error('Invalid update:show event params');
        return false
    },
    submitDialog: () => true
})

const closeDialog = () => emit('update:show', false)
const submitDialog = () => {
    emit('submitDialog')
    closeDialog()
}

onMounted(async () => {
    await getReportVisualizations(props.report.id)
    if (props.report.analyzeId) {
        await previewAnalyze(props.report.analyzeId)
    }
    if (analyzePreview.value) {
        const res = simpleCSVParser(analyzePreview.value, undefined, undefined)
        reportVisualizations.value.map((v) => {
            v.chartData = associationRulesToChartData(res.chartData)
        })
    }
})

const { isVisualizationsLoading, visualizationsError, reportVisualizations, getReportVisualizations } = useVisualizations()
const { isAnalyzesLoading, analyzesError, analyzePreview, previewAnalyze, } = useAnalyzes()
const { reportValidate } = useReportEditValidate(props.report)
</script>

<template>
    <Dialog class="p-fluid" :visible="props.show" :style="{ width: '100rem' }" header="Report Details" :modal="true"
        @update:visible="closeDialog">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="reportValidate.name.$model" required="true" autofocus
                :class="{ 'p-invalid': reportValidate.name.$invalid }" />
            <small v-if="reportValidate.name.required.$invalid" class="p-error">Name is required.</small>
            <small v-else-if="reportValidate.name.minLength.$invalid" class="p-error">Name is to
                short.</small>
            <small v-else-if="reportValidate.name.maxLength.$invalid" class="p-error">Name is to
                long.</small>
        </div>
        <!-- <div class="field">
            <label for="description">Data</label>
            <Editor v-model="reportValidate.reportData.$model" editor-style="height: 320px"
                :class="{ 'p-invalid': reportValidate.reportData.$invalid }" />
            <small v-if="reportValidate.reportData.required.$invalid" class="p-error">Data is required.</small>
            <small v-else-if="reportValidate.reportData.minLength.$invalid" class="p-error">Data is to
                short.</small>
            <small v-else-if="reportValidate.reportData.maxLength.$invalid" class="p-error">Data is to
                long.</small>
        </div> -->
        <div class="field">
            <h3 class="mt-6">Visualizations:</h3>
            <VisualizationDataView :visualizations="reportVisualizations" />
            <!-- <h3 class="mt-6">Analyzes:</h3>
            <ReportsAnalyzesDataViewVue :edit="true" :report="report" /> -->
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button p-button-secondary" @click="closeDialog" />
            <Button label="Save" icon="pi pi-check" class="p-button p-button-success" @click="submitDialog" />
        </template>
    </Dialog>
</template>
