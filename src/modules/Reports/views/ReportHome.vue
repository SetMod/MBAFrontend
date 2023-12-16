<script setup lang="ts">
import { onMounted, watch } from 'vue';
import useReports from '../../../hooks/useReports';
import ReportCard from '../components/ReportCard.vue';


const props = defineProps({
    orgId: {
        type: String,
        required: true
    },
    reportId: {
        type: String,
        required: true
    }
})

onMounted(async () => {
    if (props.reportId) {
        await getReportById(Number(props.reportId))
    }
})

watch([props.reportId], async () => {
    if (props.reportId) {
        await getReportById(Number(props.reportId))
    }
})

const { isReportsLoading, report, getReportById } = useReports()

</script>

<template>
    <ReportCard v-if="report" :report="report" :is-loading="isReportsLoading" />
</template>
