<script setup lang="ts">
import { onMounted, watch } from 'vue';
import FileDatasourceCard from '../components/FileDatasourceCard.vue';
import useDatasources from '../../../hooks/useDatasources';

const props = defineProps({
    orgId: {
        type: String,
        required: true
    },
    datasourceId: {
        type: String,
        required: true
    },
})

onMounted(async () => {
    await getDatasourceById(Number(props.datasourceId))
})

watch([props.datasourceId], async () => {
    await getDatasourceById(Number(props.datasourceId))
})

const { isDatasourcesLoading, datasource, getDatasourceById } = useDatasources()
</script>

<template>
    <FileDatasourceCard v-if="datasource" :datasource="datasource" :is-loading="isDatasourcesLoading" />
</template>
