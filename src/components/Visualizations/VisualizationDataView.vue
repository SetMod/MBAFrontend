<template>
    <DataView :value="userVisualizations" data-key="id" :layout="layout">
        <template #header>
            <div class="grid grid-nogutter">
                <div class="col-6 text-left">
                    <DataViewLayoutOptions v-model="layout"></DataViewLayoutOptions>
                </div>
            </div>
        </template>
        <template #list="slotProps">
            <div class="p-card w-full p-2 m-1">
                <div class="p-card-body">{{ slotProps.data }}</div>
                <!-- <div class="p-card-title text-center">{{ slotProps.data.name }}</div> -->
                <!-- <div>Name: <b>{{ slotProps.data.name }}</b></div> -->
                <!-- <div class="p-card-body">
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
                            <Button label="Edit" class="p-button p-button-rounded p-button-warning mr-1"
                                @click="() => submitEdit(slotProps.data)" />
                            <Button label="Delete" class="p-button p-button-rounded p-button-outlined p-button-danger"
                                @click="() => openDelete(slotProps.data)" />
                        </div>
                    </div> -->
            </div>
        </template>
        <template #grid="slotProps">
            <div class="p-card p-2 m-1">
                <div class="p-card-body">{{ slotProps.data }}</div>
            </div>
        </template>
    </DataView>
    <!-- <section>
        <div class="p-card">
            <div class="p-card-title text-left">
                <h4 class="m-3">Visualizations</h4>
            </div>
            <div class="p-card-body">
                <div class="grid">
                    <Chart class="col-6" type="line" :data="basicData" :options="basicOptions" />
                    <Chart class="col-6" type="bar" :data="basicData" :options="basicOptions" />
                </div>
            </div>
        </div>
    </section> -->
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import useVisualizations from "../../hooks/useVisualizations";

export default defineComponent({
    setup() {
        const { userVisualizations } = useVisualizations()
        const layout = ref('list');
        const basicData = ref({
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#FFA726',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        });

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

        return {
            layout,
            basicData,
            basicOptions,
            userVisualizations
        }
    },
});
</script>

<style>
</style>