<script setup lang="ts">
import Analyzes from '../../../models/AnalyzesModel';
import { getAnalyzeStatus, getAnalyzeSeverity, getAlgorithmSeverity, getAlgorithmValue } from "../utils";

const props = defineProps({
    analyze: {
        type: Analyzes,
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
        <template #title>Analyze</template>
        <template #content>
            <ProgressSpinner v-if="props.isLoading" />
            <div v-else class="text-left px-5">
                <div class="field">
                    <b>Id: </b>
                    <span>
                        {{ props.analyze.id }}
                    </span>
                </div>
                <div class="field">
                    <b>Name: </b>
                    <span>
                        {{ props.analyze.name }}
                    </span>
                </div>
                <div class="field">
                    <b>Description:</b>
                    <div class="my-1">
                        {{ props.analyze.description }}
                    </div>
                </div>
                <div class="field">
                    <b>Algorithm: </b>
                    <span>
                        <Badge :value="getAlgorithmValue(props.analyze.algorithm)"
                            :severity="getAlgorithmSeverity(props.analyze.algorithm)" />
                    </span>
                </div>
                <div class="field">
                    <b>Status: </b>
                    <span>
                        <Badge :value="getAnalyzeStatus(props.analyze.status)"
                            :severity="getAnalyzeSeverity(props.analyze.status)" />
                    </span>
                </div>
                <div class="field">
                    <b>Creator: </b>
                    <span>
                        {{ props.analyze.creatorId }}
                    </span>
                </div>
                <div class="field">
                    <div><b>Prams:</b></div>
                    <div>Support: {{ props.analyze.support }}</div>
                    <div>Confidence: {{ props.analyze.confidence }}</div>
                    <div>Lift: {{ props.analyze.lift }}</div>
                    <div>Rules length: {{ props.analyze.rulesLength }}</div>
                </div>
                <div class="field">
                    <div>
                        <b>Started:</b>
                        {{
                            props.analyze.startedDate ?
                            new Date(props.analyze.startedDate).toLocaleDateString() : 'None'
                        }}
                    </div>
                    <div>
                        <b>Finished:</b>
                        {{
                            props.analyze.finishedDate ?
                            new Date(props.analyze.finishedDate).toLocaleDateString() : 'None'
                        }}
                    </div>
                </div>
                <div class="field">
                    <b>Dates: </b>
                    <div>
                        <div>
                            Created: {{ new Date(props.analyze.createdDate).toLocaleDateString() }}
                        </div>
                        <div v-if="props.analyze.updatedDate">
                            Updated: {{ new Date(props.analyze.updatedDate).toLocaleDateString() }}
                        </div>
                        <div v-if="props.analyze.softDeleted && props.analyze.deletedDate">
                            Deleted: {{ new Date(props.analyze.deletedDate).toLocaleDateString() }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>
