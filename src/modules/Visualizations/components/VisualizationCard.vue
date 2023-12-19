<script setup lang="ts">
import Visualizations from "../../../models/VisualizationsModel";

const props = defineProps({
    visualization: {
        type: Visualizations,
        required: true
    }
})

</script>

<template>
    <div class="p-card">
        <div>
            <h3 class="text-left">
                {{ props.visualization.name }}
            </h3>
        </div>
        <div>
            <div class="text-left">
                <div>ID: {{ props.visualization.id }}</div>
                <div>Name:<b> {{ props.visualization.name }}</b></div>
                <div>Type:<b> {{ props.visualization.type }}</b></div>
                <div>Chart type:<b> {{ props.visualization.chartType }}</b></div>
                <Chart v-if="props.visualization.chartData" class="p-card-content" :type="props.visualization.chartType"
                    :data="props.visualization.chartData" />
                <Message severity="info">Chart data is empty</Message>
            </div>
        </div>
        <div>
            <div class="flex justify-content-center gap-2">
                <Button label="Edit" class="p-button p-button-rounded p-button-warning mr-1"
                    @click="() => openVisualizationEditDialog(props.visualization)" />
                <Button label="Delete" class="p-button p-button-rounded p-button-outlined p-button-danger"
                    @click="() => removeVisualization(index)" />
            </div>
        </div>
    </div>
</template>
