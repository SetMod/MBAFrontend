<script setup lang="ts">
import { ref } from "@vue/runtime-core";
import Visualizations from "../../../models/VisualizationsModel";
import { PropType } from "vue";

const props = defineProps({
    visualizations: {
        type: Array as PropType<Visualizations[]>,
        required: true
    },
    showActions: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits({
    submitDelete: (id: number) => {
        if (typeof id === 'number') return true
        console.error('Invalid param type of submitDelete event');
        return false
    },
    submitEdit: (visualization: Visualizations) => {
        if (visualization instanceof Visualizations) return true
        console.error('Invalid param type of submitEdit event');
        return false
    },
})

const submitDelete = (id: number) => {
    emit('submitDelete', id)
}
const submitEdit = (visualization: Visualizations) => {
    emit('submitEdit', visualization)
}

const visualizationsViewLayout = ref<"list" | "grid" | undefined>('list');
</script>

<template>
    <DataView :value="props.visualizations" data-key="id" :layout="visualizationsViewLayout">
        <template #header>
            <div class="grid grid-nogutter">
                <div class="col-6 text-left">
                    <DataViewLayoutOptions v-model="visualizationsViewLayout"></DataViewLayoutOptions>
                </div>
            </div>
        </template>
        <template #list="slotProps">
            <div v-if="slotProps.items instanceof Array">
                <div v-for="(visualization, index) in slotProps.items" :key="index">
                    <div class="p-card p-3 mb-2">
                        <div>
                            <h3 class="text-left">
                                {{ visualization.name }}
                            </h3>
                        </div>
                        <div>
                            <div class="text-left">
                                <div>ID: {{ visualization.id }}</div>
                                <div>Name: <b>{{ visualization.name }}</b></div>
                                <div>Type: <b>{{ visualization.type }}</b></div>
                                <div>Chart type: <b>{{ visualization.chartType }}</b></div>
                                <Chart class="p-card-content" :type="visualization.chartType"
                                    :data="visualization.chartData" />
                            </div>
                        </div>
                        <div v-if="props.showActions">
                            <div class="flex justify-content-center gap-2">
                                <Button label="Edit" class="p-button p-button-rounded p-button-warning mr-1"
                                    @click="() => submitEdit(visualization)" />
                                <Button label="Delete" class="p-button p-button-rounded p-button-outlined p-button-danger"
                                    @click="() => submitDelete(index)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #grid="slotProps">
            <div v-if="slotProps.items instanceof Array">
                <div class="grid">
                    <div v-for="(visualization, index) in slotProps.items" :key="index"
                        class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-6">
                        <div class="p-card p-3">
                            <div>
                                <h3 class="text-left">
                                    {{ visualization.name }}
                                </h3>
                            </div>
                            <div>
                                <div class="text-left">
                                    <div>ID: {{ visualization.id }}</div>
                                    <div>Name: <b>{{ visualization.name }}</b></div>
                                    <Chart class="p-card-content" :type="visualization.chartType"
                                        :data="visualization.chartData" />
                                </div>
                            </div>
                            <div v-if="props.showActions">
                                <div class="flex justify-content-center gap-2">
                                    <Button label="Edit" class="p-button p-button-rounded p-button-warning mr-1"
                                        @click="() => submitEdit(visualization)" />
                                    <Button label="Delete"
                                        class="p-button p-button-rounded p-button-outlined p-button-danger"
                                        @click="() => submitDelete(index)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </DataView>
</template>
