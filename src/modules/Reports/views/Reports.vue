<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import useReports from '../../../hooks/useReports';
import ReportsTable from '../components/ReportsTable.vue';
import ReportsToolbar from '../components/ReportsToolbar.vue';
import ReportEditDialog from '../components/ReportEditDialog.vue';
import Reports from '../../../models/ReportsModel';
import { useToast } from 'primevue/usetoast';
import ReportDeleteDialog from '../components/ReportDeleteDialog.vue';

const props = defineProps({
    orgId: {
        type: String,
        required: false,
        default: ''
    },
    userId: {
        type: String,
        required: false,
        default: ''
    },
})

onMounted(async () => {
    await refreshTable()
})

watch([props.orgId], async () => {
    await refreshTable()
})

const toast = useToast()
const {
    isReportsLoading,
    organizationReportsFull,
    reportsError,
    getOrganizationsReportsFull,
    updateReport,
    deleteReport,
} = useReports()
const selectedReport = ref<Reports>()
const showReportEditDialog = ref(false)
const showReportDeleteDialog = ref(false)

const refreshTable = async () => {
    if (props.orgId) {
        await getOrganizationsReportsFull(Number(props.orgId))
    }
}

const openReportEditDialog = (report: Reports) => { showReportEditDialog.value = true; selectedReport.value = report }
const openReportDeleteDialog = (report: Reports) => { showReportDeleteDialog.value = true; selectedReport.value = report }
const submitEdit = async () => {

    if (selectedReport.value) {
        await updateReport(selectedReport.value.id, selectedReport.value)
    }

    if (reportsError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: reportsError.value.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Updated', detail: `Report "${selectedReport.value?.name}" updated`, life: 3000 });
        await refreshTable()
    }
}

const submitDelete = async () => {
    if (selectedReport.value) {
        await deleteReport(selectedReport.value.id)
    }

    if (reportsError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Error', detail: reportsError.value.message, life: 3000 });
    } else {
        toast.add({ severity: 'success', summary: 'Deleted', detail: `Report "${selectedReport.value?.name}" deleted`, life: 3000 });
        await refreshTable()
    }
}
</script>

<template>
    <Toast />
    <h2>
        Reports
    </h2>
    <ReportEditDialog v-if="selectedReport && showReportEditDialog" v-model:show="showReportEditDialog"
        :report="selectedReport" @submit-dialog="submitEdit" />
    <ReportDeleteDialog v-if="selectedReport && showReportDeleteDialog" v-model:show="showReportDeleteDialog"
        :report="selectedReport" @submit-dialog="submitDelete" />
    <ReportsToolbar :org-id="Number(props.orgId)" />
    <ReportsTable :reports="organizationReportsFull" :is-loading="isReportsLoading" @refresh-table="refreshTable"
        @submit-edit="openReportEditDialog" @submit-delete="openReportDeleteDialog" />
</template>
