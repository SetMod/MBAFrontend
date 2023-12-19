<script setup lang="ts">
import { onMounted, watch } from 'vue';
import useAnalyzes from '../../../hooks/useAnalyzes';
import AnalyzeCard from '../components/AnalyzeCard.vue';
import AnalyzePreviewTable from '../components/AnalyzePreviewTable.vue';

const props = defineProps({
    orgId: {
        type: String,
        required: true
    },
    analyzeId: {
        type: String,
        required: true
    },
})

onMounted(async () => {
    await getAnalyzeById(Number(props.analyzeId))
    await previewAnalyze(Number(props.analyzeId))
})

watch([props.analyzeId], async () => {
    await getAnalyzeById(Number(props.analyzeId))
})

const {
    isAnalyzesLoading,
    analyze,
    analyzePreview,
    getAnalyzeById,
    previewAnalyze,
} = useAnalyzes()
</script>

<template>
    <div>
        <AnalyzeCard v-if="analyze" :analyze="analyze" :is-loading="isAnalyzesLoading" />
        <AnalyzePreviewTable v-if="analyzePreview || isAnalyzesLoading" :analyze-content="analyzePreview"
            :is-loading="isAnalyzesLoading" />
        <Message v-else severity="info">Can't load analyze data</Message>
    </div>
</template>
