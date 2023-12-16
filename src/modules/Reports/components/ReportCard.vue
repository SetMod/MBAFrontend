<script setup lang="ts">
import Reports from '../../../models/ReportsModel';
import { getReportTypeValue, getReportTypeSeverity } from "../utils";

const props = defineProps({
    report: {
        type: Reports,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <Card class="h-full">
        <template #title>Report</template>
        <template #content>
            <ProgressSpinner v-if="props.isLoading" />
            <div v-else class="text-left px-5">
                <div class="field">
                    <b>Id: </b>
                    <span>
                        {{ props.report.id }}
                    </span>
                </div>
                <div class="field">
                    <b>Name: </b>
                    <span>
                        {{ props.report.name }}
                    </span>
                </div>
                <div class="field">
                    <b>Type: </b>
                    <span>
                        <Badge :value="getReportTypeValue(props.report.type)"
                            :severity="getReportTypeSeverity(props.report.type)" />
                    </span>
                </div>
                <div class="field">
                    <b>Creator: </b>
                    <span>
                        {{ props.report.creatorId }}
                    </span>
                </div>
                <div class="field">
                    <b>Dates: </b>
                    <div>
                        <div>
                            Created: {{ new Date(props.report.createdDate).toLocaleDateString() }}
                        </div>
                        <div v-if="props.report.updatedDate">
                            Updated: {{ new Date(props.report.updatedDate).toLocaleDateString() }}
                        </div>
                        <div v-if="props.report.softDeleted && props.report.deletedDate">
                            Deleted: {{ new Date(props.report.deletedDate).toLocaleDateString() }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>
