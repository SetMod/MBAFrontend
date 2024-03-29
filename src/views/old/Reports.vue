<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import useReports from '../hooks/useReports';
import useUsers from '../hooks/useUsers';
import useOrganizations from '../hooks/useOrganizations';
import Reports from '../models/ReportsModel';
import ReportsToolbarVue from '../components/Reports/ReportsToolbar.vue';
import ReportsDataTableVue from '../components/Reports/ReportsDataTable.vue';
import ReportDeleteDialogVue from '../components/Reports/ReportDeleteDialog.vue'
import ReportEditDialogVue from '../components/Reports/ReportEditDialog.vue';
import ReportCreateDialogVue from '../components/Reports/ReportCreateDialog.vue';
import ReportViewDialogVue from '../components/Reports/ReportViewDialog.vue';
import useAnalyzes from '../hooks/useAnalyzes';
import useVisualizations from '../hooks/useVisualizations';

const toast = useToast();
const dt = ref();

const { user, isLoggedIn } = useUsers()
const { organization } = useOrganizations()
const { isReportsLoading, reports, createReport, updateReport, deleteReport } = useReports()
const { reportAnalyzes, getReportAnalyzes } = useAnalyzes()
const { reportVisualizations, getReportVisualizations } = useVisualizations()
const selectedReport = ref<Reports>();

const displayView = ref(false);
const displayCreate = ref(false);
const displayEdit = ref(false);
const displayDelete = ref(false);

onMounted(async () => {
    if (isLoggedIn.value && user.value) await getUserReports(user.value.id)
})

const refreshTable = async () => {
    if (isLoggedIn && user.value) await getUserReports(user.value.id)
}
const closeDialog = () => {
    displayCreate.value = false;
    displayView.value = false;
    displayEdit.value = false;
    displayDelete.value = false;
    selectedReport.value = undefined
};
const openView = (report: Reports) => {
    selectedReport.value = report
    displayView.value = true;
    reportAnalyzes.value = undefined
    reportVisualizations.value = undefined
    getReportAnalyzes(report.id)
    getReportVisualizations(report.id)
};
const openCreate = () => {
    displayCreate.value = true;
};
const openEdit = (report: Reports) => {
    selectedReport.value = report
    displayEdit.value = true;
    reportAnalyzes.value = undefined
    reportVisualizations.value = undefined
    getReportAnalyzes(report.id)
    getReportVisualizations(report.id)
};
const openDelete = (report: Reports) => {
    selectedReport.value = report;
    displayDelete.value = true;
};
const submitCreate = async (newReport: Reports) => {
    if (!user.value || !organization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select an organization in profile', life: 3000 })

    newReport.userId = user.value.id
    newReport.organizationId = organization.value.id
    const response = await createReport(newReport)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Create', detail: response, life: 3000 });
    toast.add({ severity: 'success', summary: 'Created', detail: 'Report Created', life: 3000 });

    refreshTable()
    closeDialog()
};
const submitEdit = async () => {
    if (!selectedReport.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select a report to edit', life: 3000 })

    const response = await updateReport(selectedReport.value)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
    toast.add({ severity: 'success', summary: 'Success', detail: 'Report updated', life: 1500 })

    closeDialog()
    refreshTable()
}
const submitDelete = async () => {
    if (!selectedReport.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select a report to delete', life: 3000 })
    const response = await deleteReport(selectedReport.value.id)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Delete', detail: response, life: 3000 });
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Report Deleted', life: 3000 });

    if (!user.value) return
    await getUserReports(user.value.id)
    closeDialog()
};
const exportCSV = (event: MouseEvent) => {
    dt.value.exportCSV();
};
</script>

<template>
    <ReportViewDialogVue v-if="selectedReport" :report="selectedReport" :display="displayView"
        :close-dialog="closeDialog" />
    <ReportCreateDialogVue :display="displayCreate" :close-dialog="closeDialog" :submit-dialog="submitCreate" />
    <ReportEditDialogVue v-if="selectedReport" :report="selectedReport" :display="displayEdit" :close-dialog="closeDialog"
        :submit-dialog="submitEdit" />
    <ReportDeleteDialogVue :display="displayDelete" :close-dialog="closeDialog" :submit-dialog="submitDelete" />
    <ReportsToolbarVue :open-create="openCreate" :export-c-s-v="exportCSV" />

    <div v-if="isReportsLoading" class="mt-7">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div v-else-if="!reports" class="flex justify-content-center align-items-center">
        <Message severity="info" class="mr-3">Reports not found</Message>
        <Button label="Refresh" icon="pi pi-refresh" class="h-2rem" @click="refreshTable" />
    </div>
    <ReportsDataTableVue v-else :reports="reports" :refresh-table="refreshTable" :open-delete="openDelete"
        :open-edit="openEdit" :open-view="openView" />
</template>