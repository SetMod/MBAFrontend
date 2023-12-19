<script setup lang="ts">
import { ref, PropType, onMounted } from 'vue';
import Visualizations, { ChartType, ChartTypeOptions } from '../../../models/VisualizationsModel';
import useVisualizationCreateValidate from "../hooks/useVisualizationCreateValidate"
import { ChartData } from 'chart.js';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    chartData: {
        type: Object as PropType<ChartData>,
        required: true
    }
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.error('Invalid value type for update:show event!');
        return false
    },
    submitForm: (visualization: Visualizations) => {
        if (visualization instanceof Visualizations) return true
        console.error('Invalid param type for submitForm event');
        return false
    },
})

onMounted(() => {
    visualizationCreateState.value.chartData = props.chartData
})

const { visualizationCreateValidate, visualizationCreateState } = useVisualizationCreateValidate()
// const selectedChartType = ref<ChartType>('bar')
const closeDialog = () => {
    emit('update:show', false)
}
const submitForm = () => {
    emit('submitForm', visualizationCreateState.value)
    closeDialog()
}


</script>

<template>
    <Dialog header="New Visualization" :modal="true" class="p-fluid" :style="{ width: '50rem' }" :visible="props.show"
        @update:visible="closeDialog">
        <div class="text-left">
            <div class="field">
                <label class="block">Name:</label>
                <InputText v-model.trim="visualizationCreateValidate.name.$model" class="w-full" required="true" autofocus
                    :class="{ 'p-invalid': visualizationCreateValidate.name.$invalid }" />
                <small class="p-error ml-auto">
                    {{ visualizationCreateValidate.name.required.$invalid ? 'Name is required.' : '&nbsp;' }}
                </small>
                <small class="p-error ml-auto">
                    {{ visualizationCreateValidate.name.minLength.$invalid ? 'Name is to short.' : '' }}
                </small>
                <small class="p-error ml-auto">
                    {{ visualizationCreateValidate.name.maxLength.$invalid ? 'Name is to long.' : '' }}
                </small>
            </div>
            <div class="field">
                <label for="type" class="block">Type:</label>
                <Dropdown v-model="visualizationCreateState.chartType" :options="ChartTypeOptions" option-value="value"
                    option-label="name" placeholder="Select an type" :filter="true" filter-placeholder="Find type"
                    class="w-full" />
            </div>
        </div>
        <div class="field">
            <!-- <Chart v-if="analyzeData" class="p-card-content" :type="selectedChartType"
                                :data="analyzeData.chartData" :options="analyzeData.headers" /> -->
            <Chart class="p-card-content" :type="visualizationCreateState.chartType" :data="props.chartData" />
        </div>

        <template #footer>
            <div class="flex gap-3 justify-content-center">
                <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
                <Button label="Create" icon="pi pi-check" severity="success"
                    :disabled="visualizationCreateValidate.$invalid" @click="submitForm" />
            </div>
        </template>
    </Dialog>
    <!-- <Card>
        <template #title>New Visualization</template>
        <template #content>
            <div class="text-left">
                <div class="field">
                    <label class="block">Name:</label>
                    <InputText v-model.trim="visualizationCreateValidate.name.$model" class="w-full" required="true" />
                </div>
                <div class="field">
                    <label for="type" class="block">Type:</label>
                    <Dropdown v-model="selectedChartType" :options="ChartTypeOptions" option-value="value"
                        option-label="name" placeholder="Select an type" :filter="true" filter-placeholder="Find type"
                        class="w-full" />
                </div>
            </div>
            <div class="field">
                <Chart v-if="analyzeData" class="p-card-content" :type="selectedChartType"
                                :data="analyzeData.chartData" :options="analyzeData.headers" />
                <Chart class="p-card-content" :type="selectedChartType" :data="props.chartData" />
            </div>
        </template>
        <template #footer>
            <div class="flex gap-3 justify-content-center">
                <Button label="Clear" severity="secondary" @click="submitClear" />
                <Button label="Add" severity="success" @click="submitForm" />
            </div>
        </template>
    </Card> -->
</template>
