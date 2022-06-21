<template>
    <div>
        <div class="card">
            <Toolbar class="m-2">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                </template>

                <template #end>
                    <FileUpload mode="basic" accept="image/*" :max-file-size="1000000" label="Import"
                        choose-label="Import" class="mr-2 inline-block" />
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)" />
                </template>
            </Toolbar>
            <div v-if="isReportsLoading" class="mt-7">
                <div v-if="isReportsLoading">
                    <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                </div>
                <div v-else-if="!reports" class="flex justify-content-center align-items-center">
                    <Message severity="info" class="mr-3">Reports not found</Message>
                    <Button label="Refresh" icon="pi pi-refresh" class="h-2rem" @click="refresh" />
                </div>
            </div>
            <div v-else>
                <DataTable ref="dt" :value="reports" :paginator="true" :rows="10" :filters="filters"
                    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rows-per-page-options="[5, 10, 25]"
                    current-page-report-template="Showing {first} to {last} of {totalRecords} reports"
                    responsive-layout="scroll">
                    <template #header>
                        <div class="flex justify-content-between align-content-center">
                            <h3 class="">Manage reports</h3>
                            <div class="flex align-items-center">
                                <span class="mr-2 p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters.global.value" placeholder="Search..." />
                                </span>
                                <Button icon="pi pi-refresh" class="h-2rem" @click="refresh" />
                            </div>
                        </div>
                    </template>
                    <Column field="reportId" header="ID" :sortable="true" style="min-width:12rem"></Column>
                    <Column field="reportName" header="Name" :sortable="true" style="min-width:16rem"></Column>
                    <!-- <Column field="reportData" header="Description" :sortable="true" style="min-width:16rem"></Column> -->
                    <Column field="userId" header="User" :sortable="true" style="min-width:16rem"></Column>
                    <Column field="organizationId" header="Organization" :sortable="true" style="min-width:16rem">
                    </Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="openEdit(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                                @click="openDelete(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <Dialog v-model:visible="displayEditDialog" :style="{ width: '100rem' }" header="Report Details" :modal="true"
            class="p-fluid">
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="v$.reportName.$model" required="true" autofocus
                    :class="{ 'p-invalid': submitted && v$.reportName.$invalid }" />
                <small v-if="submitted && !v$.reportName.required" class="p-error">Name is required.</small>
                <small v-else-if="submitted && v$.reportName.minLength.$invalid" class="p-error">Name is to
                    short.</small>
                <small v-else-if="submitted && v$.reportName.maxLength.$invalid" class="p-error">Name is to
                    long.</small>
            </div>
            <div class="field">
                <label for="description">Data</label>
                <!-- <Textarea id="description" v-model="v$.reportData.$model" required="true" rows="3" cols="20"
                    :class="{ 'p-invalid': submitted && v$.reportData.$invalid }" /> -->
                <Editor v-model="v$.reportData.$model" editor-style="height: 320px"
                    :class="{ 'p-invalid': submitted && v$.reportData.$invalid }" />
                <!-- <Textarea id="description" v-model="v$.reportData.$model" required="true" rows="3" cols="20"
                    :class="{ 'p-invalid': submitted && v$.reportData.$invalid }" /> -->
                <small v-if="submitted && !v$.reportData.required" class="p-error">Data is required.</small>
                <small v-else-if="submitted && v$.reportData.minLength.$invalid" class="p-error">Data is to
                    short.</small>
                <small v-else-if="submitted && v$.reportData.maxLength.$invalid" class="p-error">Data is to
                    long.</small>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="submitCreate" />
            </template>
        </Dialog>

        <Dialog v-model:visible="displayDeleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content flex align-content-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span>Are you sure you want to proceed?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="hideDeleteDialog" />
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="submitDelete" />
            </template>
        </Dialog>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, reactive } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { maxLength, minLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useReports from '../hooks/useReports';
import useUsers from '../hooks/useUsers';
import useOrganizations from '../hooks/useOrganizations';
import Reports from '../models/ReportsModel';

export default defineComponent({
    setup() {
        onMounted(async () => {
            if (isLoggedIn.value && user.value) await getUserReports(user.value.userId)
        })

        const toast = useToast();
        const dt = ref();
        const { isLoggedIn, user } = useUsers()
        const { organization } = useOrganizations()
        const { userReports: reports, report, isReportsLoading, createReport, updateReport, deleteReport, getUserReports } = useReports()
        const displayEditDialog = ref(false);
        const displayDeleteDialog = ref(false);
        const selectedReport = ref<Reports>();
        const submitted = ref(false);
        const filters = ref({
            global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
        });
        const state = reactive<Reports>({
            reportId: 0,
            reportName: '',
            reportData: '',
            reportCreateDate: new Date(),
            userId: 0,
            organizationId: 0
        })
        const rules = {
            reportName: { required, minLength: minLength(2), maxLength: maxLength(200) },
            reportData: { required, minLength: minLength(10), maxLength: maxLength(2000) },
        }
        const v$ = useVuelidate(rules, state)


        const refresh = async () => {
            if (isLoggedIn && user.value) await getUserReports(user.value.userId)
            // await getOrganizationsRoles()
        }
        const openNew = () => {
            submitted.value = false;
            displayEditDialog.value = true;
        };
        const openEdit = (report: Reports) => {
            state.reportId = report.reportId
            state.reportName = report.reportName
            state.reportData = report.reportData
            state.reportCreateDate = report.reportCreateDate
            state.userId = report.userId
            state.organizationId = report.organizationId
            displayEditDialog.value = true;
        };
        const openDelete = (report: Reports) => {
            selectedReport.value = report;
            displayDeleteDialog.value = true;
        };
        const hideDialog = () => {
            displayEditDialog.value = false;
            submitted.value = false;
        };
        const hideDeleteDialog = () => {
            displayDeleteDialog.value = false;
        };
        const submitCreate = async () => {
            submitted.value = true;

            if (v$.value.$invalid) return
            console.log(user.value);
            console.log(organization.value);

            if (!user.value) return
            // if (!organization.value) return

            const report = new Reports()
            report.reportName = state.reportName
            report.reportData = state.reportData
            report.userId = user.value.userId
            report.organizationId = organization.value?.organizationId || 1
            const response = await createReport(report)
            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Create', detail: response, life: 3000 });
            toast.add({ severity: 'success', summary: 'Created', detail: 'Report Created', life: 3000 });

            await getUserReports(user.value.userId)
            hideDialog()
        };
        const submitDelete = async () => {
            if (!selectedReport.value) return
            const response = await deleteReport(selectedReport.value.reportId)
            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Delete', detail: response, life: 3000 });
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Report Deleted', life: 3000 });

            if (!user.value) return
            await getUserReports(user.value.userId)
            hideDialog()
        };
        const exportCSV = (event: MouseEvent) => {
            console.log(event);
            dt.value.exportCSV();
        };

        return {
            dt,
            v$,
            reports,
            displayEditDialog,
            displayDeleteDialog,
            report,
            filters,
            submitted,
            isReportsLoading,
            openNew,
            hideDeleteDialog,
            hideDialog,
            submitCreate,
            openEdit,
            openDelete,
            submitDelete,
            exportCSV,
            refresh
        }
    }
})
</script>