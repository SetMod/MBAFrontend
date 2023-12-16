<script setup lang="ts">
import { onMounted, watch } from 'vue';
import useAnalyzes from '../../../hooks/useAnalyzes';
import AnalyzeCard from '../components/AnalyzeCard.vue';

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
})

watch([props.analyzeId], async () => {
    await getAnalyzeById(Number(props.analyzeId))
})

const { isAnalyzesLoading, analyze, getAnalyzeById } = useAnalyzes()
</script>

<template>
    <AnalyzeCard v-if="analyze" :analyze="analyze" :is-loading="isAnalyzesLoading" />
</template>
