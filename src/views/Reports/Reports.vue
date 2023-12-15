<script setup lang="ts">
import { onMounted } from 'vue';
import useReports from '../../hooks/useReports';
import ReportsTable from '../../components/Reports/ReportsTable.vue';

const props = defineProps({
    orgId: {
        type: String,
        required: false,
        default: ''
    },
    userId: {
        type: String,
        required: false,
        default: ''
    },
})

onMounted(async () => {
    await refreshTable()
})

const {
    isReportsLoading,
    organizationReportsFull,
    getOrganizationsReportsFull,
} = useReports()

const refreshTable = async () => {
    if (props.orgId) {
        await getOrganizationsReportsFull(Number(props.orgId))
    }
}
</script>

<template>
    <h1>
        Reports
    </h1>
    <ReportsTable :reports="organizationReportsFull" :is-loading="isReportsLoading" @refresh-table="refreshTable" />
</template>
