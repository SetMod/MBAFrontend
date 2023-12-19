<script setup lang="ts">
import { PropType } from 'vue';
import AnalyzePreviewTable from './AnalyzePreviewTable.vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    analyzeContent: {
        type: [String, null] as PropType<string | null>,
        default: null
    },
    isLoading: Boolean
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value == 'boolean') return true
        console.error('Invalid value type for update:show event!');
        return false
    }
})

const closeDialog = () => emit('update:show', false)
</script>

<template>
    <Dialog header="Analyze preview" class="p-fluid" :style="{ width: '80%' }" :modal="true" :visible="props.show"
        @update:visible="closeDialog">
        <div class="field">
            <AnalyzePreviewTable :analyze-content="props.analyzeContent" :is-loading="props.isLoading" />
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
        </template>
    </Dialog>
</template>
