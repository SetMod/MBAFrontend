<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { ref } from "vue"
import useAnalyzes from "../../../hooks/useAnalyzes"
import Analyzes from "../../../models/AnalyzesModel";
import Reports from "../../../models/ReportsModel";

const props = defineProps({
    edit: {
        type: Boolean,
        default: false
    },
    report: {
        type: Reports,
        required: true
    },
})
const { reportAnalyzes, isAnalyzesLoading, deleteAnalyze, downloadAnalyze, getReportAnalyzes } = useAnalyzes()
const layout = ref('list');
const selectedAnalyze = ref<Analyzes>()
const displayDelete = ref(false)
const toast = useToast()
const closeDialog = () => {
    displayDelete.value = false
}
const openDelete = (analyze: Analyzes) => {
    displayDelete.value = true
    selectedAnalyze.value = analyze
}
const submitEdit = async () => { }
const submitDelete = async () => {
    if (!selectedAnalyze.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select analyze to delete', life: 3000 })

    const response = await deleteAnalyze(selectedAnalyze.value.id)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed', detail: response, life: 3000 });
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Report Deleted', life: 3000 });

    closeDialog()
    getReportAnalyzes(props.report.id)
}
const submitDownload = async (id: number) => {
    const response = await downloadAnalyze(id)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
    toast.add({ severity: 'success', summary: 'Success', detail: 'Analyze downloaded', life: 1500 })
}
</script>


<template>
    <Toast />
    <div v-if="isAnalyzesLoading" class="mt-7">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div v-else-if="!reportAnalyzes">
        <Message severity="info" class="mr-3">Analyzes not found</Message>
    </div>
    <div v-else class="field flex flex-column">
        <DataView :value="reportAnalyzes" data-key="id" :layout="layout">
            <template #header>
                <div class="grid grid-nogutter">
                    <div class="col-6 text-left">
                        <DataViewLayoutOptions v-model="layout"></DataViewLayoutOptions>
                    </div>
                </div>
            </template>
            <template #list="slotProps">
                <div class="p-card w-full p-2 m-1">
                    <div class="p-card-title text-center">{{ slotProps.data.name }}</div>
                    <!-- <div>Name: <b>{{ slotProps.data.name }}</b></div> -->
                    <div class="p-card-body">
                        <small>ID: {{ slotProps.data.id }}</small>
                        <div class="p-card-content">
                            <div>Support: <b>{{ slotProps.data.support }}</b></div>
                            <div>Lift: <b>{{ slotProps.data.lift }}</b></div>
                            <div>Confidence: <b>{{ slotProps.data.confidence }}</b></div>
                            <div>Rules Length: <b>{{ slotProps.data.rulesLength }}</b></div>
                        </div>
                        <div class="p-card-content">
                            <div>
                                Description: <b>{{ slotProps.data.description }}</b>
                            </div>
                            <div>
                                Create Date: <b>{{ new Date(slotProps.data.analyzeCreateDate).toLocaleDateString()
                                }}</b>
                            </div>
                        </div>
                    </div>
                    <div class="p-card-footer">
                        <div v-if="!props.edit">
                            <Button label="Download" class="p-button p-button-info"
                                @click="() => submitDownload(slotProps.data.id)" />
                        </div>
                        <div v-else class="flex justify-content-around">
                            <!-- <Button label="Edit" class="p-button p-button-rounded p-button-warning mr-1"
                                @click="() => submitEdit(slotProps.data)" /> -->
                            <Button label="Delete" class="p-button p-button-rounded p-button-outlined p-button-danger"
                                @click="() => openDelete(slotProps.data)" />
                        </div>
                    </div>
                </div>
            </template>
            <template #grid="slotProps">
                <div class="p-card p-2 m-1">
                    <div class="p-card-title text-center">{{ slotProps.data.name }}</div>
                    <!-- <div>Name: <b>{{ slotProps.data.name }}</b></div> -->
                    <div class="p-card-body">
                        <small>ID: {{ slotProps.data.id }}</small>
                        <div class="p-card-content">
                            <div>Support: <b>{{ slotProps.data.support }}</b></div>
                            <div>Lift: <b>{{ slotProps.data.lift }}</b></div>
                            <div>Confidence: <b>{{ slotProps.data.confidence }}</b></div>
                            <div>Rules Length: <b>{{ slotProps.data.rulesLength }}</b></div>
                        </div>
                        <div class="p-card-content">
                            <div>
                                Description: <b>{{ slotProps.data.description }}</b>
                            </div>
                            <div>
                                Create Date: <b>{{ new Date(slotProps.data.analyzeCreateDate).toLocaleDateString()
                                }}</b>
                            </div>
                        </div>
                    </div>
                    <div class="p-card-footer">
                        <div v-if="!props.edit">
                            <Button label="Download" class="p-button p-button-info"
                                @click="() => submitDownload(slotProps.data.id)" />
                        </div>
                        <div v-else class="flex justify-content-around">
                            <!-- <Button label="Edit" class="p-button p-button-rounded p-button-warning mr-1"
                                @click="() => submitEdit(slotProps.data)" /> -->
                            <Button label="Delete" class="p-button p-button-rounded p-button-outlined p-button-danger"
                                @click="() => openDelete(slotProps.data)" />
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>

    <Dialog v-model:visible="displayDelete" :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="confirmation-content flex align-content-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to delete analyze <b>{{ selectedAnalyze?.name }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button p-button-info" @click="() => closeDialog()" />
            <Button label="Yes" icon="pi pi-check" class="p-button p-button-danger" @click="() => submitDelete()" />
        </template>
    </Dialog>
</template>
