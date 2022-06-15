<template>
    <div>
        <div class="card">
            <Toolbar class="m-2">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger"
                        :disabled="!selectedReports || !selectedReports.length" @click="confirmDeleteSelected" />
                </template>

                <template #end>
                    <FileUpload mode="basic" accept="image/*" :max-file-size="1000000" label="Import"
                        choose-label="Import" class="mr-2 inline-block" />
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedReports" :value="reports" data-key="id" :paginator="true"
                :rows="10" :filters="filters"
                paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rows-per-page-options="[5, 10, 25]"
                current-page-report-template="Showing {first} to {last} of {totalRecords} reports"
                responsive-layout="scroll">
                <template #header>
                    <div class="flex justify-content-between align-content-center">
                        <h3 class="">Manage reports</h3>
                        <span class="ml-1 p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters.global.value" placeholder="Search..." />
                        </span>
                    </div>
                </template>

                <Column selection-mode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="reportId" header="ID" :sortable="true" style="min-width:12rem"></Column>
                <Column field="reportName" header="Name" :sortable="true" style="min-width:16rem"></Column>
                <Column field="reportData" header="Description" :sortable="true" style="min-width:16rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                            @click="editReport(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                            @click="confirmDeleteReport(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="reportDialog" :style="{ width: '450px' }" header="Report Details" :modal="true"
            class="p-fluid">
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="report.reportName" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !report.reportName }" />
                <small v-if="submitted && !report.reportName" class="p-error">Name is required.</small>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Textarea id="description" v-model="report.reportData" required="true" rows="3" cols="20" />
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveReport" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteReportDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="report">Are you sure you want to delete <b>{{ report.reportName }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteReportDialog = false" />
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteReport" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteReportsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="report">Are you sure you want to delete the selected reports?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteReportsDialog = false" />
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedReports" />
            </template>
        </Dialog>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog'
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import FileUpload from 'primevue/fileupload';
import Textarea from 'primevue/textarea'
import Column from 'primevue/column';
import Reports from '../models/ReportsModel';

export default defineComponent({
    components: {
        Dialog,
        Column,
        Toolbar,
        InputText,
        Button,
        Textarea,
        DataTable,
        FileUpload,
    },
    setup() {
        onMounted(() => {
        })

        const toast = useToast();
        const dt = ref();
        const reports = ref<Reports[]>([]);
        const report = ref<Reports>(new Reports());
        const reportDialog = ref(false);
        const deleteReportDialog = ref(false);
        const deleteReportsDialog = ref(false);
        const selectedReports = ref();
        const filters = ref({
            global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
        });
        const submitted = ref(false);

        const openNew = () => {
            report.value = new Reports()
            submitted.value = false;
            reportDialog.value = true;
        };
        const hideDialog = () => {
            reportDialog.value = false;
            submitted.value = false;
        };
        const saveReport = () => {
            submitted.value = true;

            if (report.value.reportName.trim()) {
                reports.value.push(report.value);
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Report Created', life: 3000 });

                reportDialog.value = false;
                report.value = new Reports()
            }
        };
        const editReport = (repo: Reports) => {
            report.value = repo
            reportDialog.value = true;
        };
        const confirmDeleteReport = (repo: Reports) => {
            report.value = repo;
            deleteReportDialog.value = true;
        };
        const deleteReport = () => {
            reports.value = reports.value.filter(val => val.reportId !== report.value.reportId);
            deleteReportDialog.value = false;
            report.value = new Reports()
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Report Deleted', life: 3000 });
        };
        const exportCSV = (event: MouseEvent) => {
            console.log(event);
            dt.value.exportCSV();
        };
        const confirmDeleteSelected = () => {
            deleteReportsDialog.value = true;
        };
        const deleteSelectedReports = () => {
            reports.value = reports.value.filter(val => !selectedReports.value.includes(val));
            deleteReportsDialog.value = false;
            selectedReports.value = null;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Report Deleted', life: 3000 });
        };

        return {
            dt, reports, reportDialog, deleteReportDialog, deleteReportsDialog, report,
            selectedReports, filters, submitted, openNew, hideDialog, saveReport, editReport,
            confirmDeleteReport, deleteReport, exportCSV, confirmDeleteSelected, deleteSelectedReports
        }
    }
})
</script>