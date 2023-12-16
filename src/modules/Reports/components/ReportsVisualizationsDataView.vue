<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import { useToast } from "primevue/usetoast";
import useVisualizations from "../../../hooks/useVisualizations";
import Reports from "../../../models/ReportsModel";
import Visualizations from "../../../models/VisualizationsModel";

const props = defineProps({
    edit: {
        type: Boolean,
        default: false
    },
    report: {
        type: Reports,
        required: true
    }
})
const { reportVisualizations, isVisualizationsLoading, deleteVisualization, getReportVisualizations } = useVisualizations()
const layout = ref('list')
const selectedVisualization = ref<Visualizations>()
const displayDelete = ref(false)
const toast = useToast()
const basicOptions = ref(
    {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    }
);

const closeDialog = () => {
    displayDelete.value = false
}
const openDelete = (visualization: Visualizations) => {
    displayDelete.value = true
    selectedVisualization.value = visualization
    console.log(selectedVisualization.value);

}
const submitEdit = async () => { }
const submitDelete = async () => {
    if (!selectedVisualization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select visualization to delete', life: 3000 })
    const response = await deleteVisualization(selectedVisualization.value.id)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed', detail: response, life: 3000 });
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Visualization Deleted', life: 3000 });

    closeDialog()
    getReportVisualizations(props.report.id)
}
</script>

<template>
    <Toast />
    <div v-if="isVisualizationsLoading" class="mt-7">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div v-else-if="!reportVisualizations">
        <Message severity="info" class="mr-3">Visualizations not found</Message>
    </div>
    <DataView v-else class="field flex flex-column" :value="reportVisualizations" data-key="id" :layout="layout">
        <template #header>
            <div class="grid grid-nogutter">
                <div class="col-6 text-left">
                    <DataViewLayoutOptions v-model="layout"></DataViewLayoutOptions>
                </div>
            </div>
        </template>
        <template #empty>
            <div>No visualizations</div>
        </template>
        <template #list="slotProps">
            <div class="p-card w-full p-2 m-1">
                <div class="p-card-title">{{ slotProps.data.name }}</div>
                <div class="p-card-body">
                    <Chart v-if="slotProps.data.visualizationData" class="p-card-content" type="line"
                        :data="slotProps.data.visualizationData" :options="basicOptions" />
                    <div v-else>No visualization data</div>
                    <div class="flex justify-content-between mt-2">
                        <div>{{ new Date(slotProps.data.visualizationCreateDate).toLocaleDateString() }}</div>
                        <small>ID: {{ slotProps.data.id }}</small>
                    </div>
                </div>
                <div class="p-card-footer">
                    <div v-if="props.edit" class="flex justify-content-around">
                        <!-- <Button label="Edit" class="p-button p-button-rounded p-button-warning mr-1"
                                @click="() => submitEdit(slotProps.data)" /> -->
                        <Button label="Delete" class="p-button p-button-rounded p-button-outlined p-button-danger"
                            @click="() => openDelete(slotProps.data)" />
                    </div>
                </div>
            </div>
        </template>
        <template #grid="slotProps">
            <div class="col-6">
                <div class="p-card p-2 m-1">
                    <div class="p-card-title">{{ slotProps.data.name }}</div>
                    <div class="p-card-body">
                        <Chart v-if="slotProps.data.visualizationData" class="p-card-content" type="line"
                            :data="slotProps.data.visualizationData" :options="basicOptions" />
                        <div v-else class="my-8">No visualization data</div>
                        <div class="flex justify-content-between mt-2">
                            <div>{{ new Date(slotProps.data.visualizationCreateDate).toLocaleDateString() }}</div>
                            <small>ID: {{ slotProps.data.id }}</small>
                        </div>
                    </div>
                    <div class="p-card-footer">
                        <div v-if="props.edit" class="flex justify-content-around">
                            <!-- <Button label="Edit" class="p-button p-button-rounded p-button-warning mr-1"
                                @click="() => submitEdit(slotProps.data)" /> -->
                            <Button label="Delete" class="p-button p-button-rounded p-button-outlined p-button-danger"
                                @click="() => openDelete(slotProps.data)" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
    <Dialog v-model:visible="displayDelete" :style="{ width: '450px' }" header="Confirm" :modal="true">
        <div class="confirmation-content flex align-content-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to delete analyze <b>{{ selectedVisualization?.name }}</b>?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button p-button-info" @click="() => closeDialog()" />
            <Button label="Yes" icon="pi pi-check" class="p-button p-button-danger" @click="() => submitDelete()" />
        </template>
    </Dialog>
</template>
