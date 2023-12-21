<script setup lang="ts">
import Datasources from '../../../models/DatasourcesModel';
import { getDatasourceTypeValue, getDatasourceTypeSeverity } from "../utils";

const props = defineProps({
    datasource: {
        type: Datasources,
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
        <template #title>Datasource</template>
        <template #content>
            <ProgressSpinner v-if="props.isLoading" />
            <div v-else class="text-left px-5">
                <div class="field">
                    <b>Id: </b>
                    <span>
                        {{ props.datasource.id }}
                    </span>
                </div>
                <div class="field">
                    <b>Name: </b>
                    <span>
                        {{ props.datasource.name }}
                    </span>
                </div>
                <div class="field">
                    <b>Type: </b>
                    <span>
                        <Badge :value="props.datasource.type"
                            :severity="getDatasourceTypeSeverity(props.datasource.type)" />
                    </span>
                </div>
                <div v-if="props.datasource.fileName" class="field">
                    <b>File name: </b>
                    <span>
                        {{ props.datasource.fileName }}
                    </span>
                </div>
                <div v-if="props.datasource.fileSize" class="field">
                    <b>File size: </b>
                    <span>
                        {{ props.datasource.fileSize }}
                    </span>
                </div>
                <div class="field">
                    <b>Creator: </b>
                    <span>
                        {{ props.datasource.creatorId }}
                    </span>
                </div>
                <div class="field">
                    <b>Dates: </b>
                    <div>
                        <div>
                            Created: {{ new Date(props.datasource.createdDate).toUTCString() }}
                        </div>
                        <div v-if="props.datasource.updatedDate">
                            Updated: {{ new Date(props.datasource.updatedDate).toUTCString() }}
                        </div>
                        <div v-if="props.datasource.softDeleted && props.datasource.deletedDate">
                            Deleted: {{ new Date(props.datasource.deletedDate).toUTCString() }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>
