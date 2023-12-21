<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { simpleCSVParser } from '../../../utils'
import { FilterMatchMode } from 'primevue/api';

const props = defineProps({
    analyzeContent: {
        type: [String, null] as PropType<string | null>,
        default: null
    },
    isLoading: {
        type: Boolean,
        required: true
    }
})

const csvData = computed(() => {
    if (props.analyzeContent) {
        return simpleCSVParser(props.analyzeContent)
    } else {
        return null
    }
})
const filters = ref({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
    <div v-if="csvData">
        <DataTable :value="csvData.parsedData" scrollable scroll-height="35rem" :loading="props.isLoading"
            :filters="filters">
            <template #header>
                <div class="text-left">
                    <span class="mr-2 p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText  v-model="filters.global.value" placeholder="Search..." />
                    </span>
                </div>
            </template>
            <Column v-for="(header, index) in csvData.headers" :key="index" :field="header" :header="header" sortable />
        </DataTable>
    </div>
    <div v-else>
        <pre>{{ props.analyzeContent }}</pre>
    </div>
</template>
