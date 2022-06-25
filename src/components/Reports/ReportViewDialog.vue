<template>
    <Dialog v-model:visible="props.display" :style="{ width: '100rem' }" header="Report Details" :modal="true"
        class="p-fluid">
        <div class="field">
            <label for="name" class="mr-2">Name:</label>
            <InputText id="name" class="text-black-alpha-90" :value="props.report.reportName" disabled />
        </div>
        <div class="field flex flex-column">
            <label for="description">Data:</label>
            <Editor v-model="props.report.reportData" readonly>
                <template #toolbar>
                    <div></div>
                </template>
            </Editor>
        </div>
        <div class="field">
            <label for="description">Create date</label>
            <div>{{ new Date(report.reportCreateDate).toLocaleDateString() }}</div>
        </div>
        <div class="field">
            <h3 class="mt-6">Visualizations:</h3>
            <ReportsVisualizationsDataViewVue :report="report" />
            <h3 class="mt-6">Analyzes:</h3>
            <ReportsAnalyzesDataViewVue :report="report" />
        </div>
        <template #footer>
            <Button label="Close" icon="pi pi-times" class="p-button-text" @click="() => closeDialog()" />
        </template>
    </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import Reports from "../../models/ReportsModel"
import ReportsAnalyzesDataViewVue from './ReportsAnalyzesDataView.vue'
import ReportsVisualizationsDataViewVue from "./ReportsVisualizationsDataView.vue"

export default defineComponent({
    components: {
        ReportsAnalyzesDataViewVue,
        ReportsVisualizationsDataViewVue
    },
    props: {
        display: {
            type: Boolean,
            required: true
        },
        report: {
            type: Reports,
            required: true
        },
        closeDialog: {
            type: Function,
            required: true
        },
    },
    setup(props) {
        const layout = ref('list');
        return {
            layout,
            props,
        }
    }
})
</script>

<style>
</style>