<script setup lang="ts">
import Visualizations, { ChartTypeOptions } from '../../../models/VisualizationsModel';
import useVisualizationEditValidate from "../hooks/useVisualizationEditValidate"

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    visualization: {
        type: Visualizations,
        required: true
    }
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.error('Invalid value type for update:show event!');
        return false
    },
    submitDialog: () => true
})

const { visualizationEditValidate, visualizationEditState } = useVisualizationEditValidate(props.visualization)

const closeDialog = () => {
    emit('update:show', false)
}
const submitForm = () => {
    emit('submitDialog')
    closeDialog()
}
</script>

<template>
    <Dialog header="Visualization" :modal="true" class="p-fluid" :style="{ width: '50rem' }" :visible="props.show"
        @update:visible="closeDialog">
        <div class="text-left">
            <div class="field">
                <label class="block">Name:</label>
                <InputText v-model.trim="visualizationEditValidate.name.$model" class="w-full" required="true" autofocus
                    :class="{ 'p-invalid': visualizationEditValidate.name.$invalid }" />
                <small class="p-error ml-auto">
                    {{ visualizationEditValidate.name.required.$invalid ? 'Name is required.' : '&nbsp;' }}
                </small>
                <small class="p-error ml-auto">
                    {{ visualizationEditValidate.name.minLength.$invalid ? 'Name is to short.' : '' }}
                </small>
                <small class="p-error ml-auto">
                    {{ visualizationEditValidate.name.maxLength.$invalid ? 'Name is to long.' : '' }}
                </small>
            </div>
            <div class="field">
                <label for="type" class="block">Type:</label>
                <Dropdown v-model="visualizationEditState.chartType" :options="ChartTypeOptions" option-value="value"
                    option-label="name" placeholder="Select an type" :filter="true" filter-placeholder="Find type"
                    class="w-full" />
            </div>
        </div>
        <div class="field">
            <!-- <Chart v-if="analyzeData" class="p-card-content" :type="selectedChartType"
                                :data="analyzeData.chartData" :options="analyzeData.headers" /> -->
            <Chart v-if="visualizationEditState.chartData" class="p-card-content" :type="visualizationEditState.chartType"
                :data="visualizationEditState.chartData" />
            <Message v-else>Can't load chart</Message>
        </div>

        <template #footer>
            <div class="flex gap-3 justify-content-center">
                <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
                <Button label="Create" icon="pi pi-check" severity="success" :disabled="visualizationEditValidate.$invalid"
                    @click="submitForm" />
            </div>
        </template>
    </Dialog>
</template>
