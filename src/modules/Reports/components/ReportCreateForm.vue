<script setup lang="ts">
import { getAnalyzeSeverity, } from '../../Analyzes/utils';
import useReportCreateValidate from '../hooks/useReportCreateValidate';
import Reports, { reportTypeOptions } from '../../../models/ReportsModel';
import Analyzes from '../../../models/AnalyzesModel';
import { PropType, computed } from 'vue';

const props = defineProps({
    report: {
        type: Reports,
        required: true
    },
    isAnalyzesLoading: {
        type: Boolean,
        required: true
    },
    analyzes: {
        type: Array as PropType<Analyzes[]>,
        required: true
    }
})

const emit = defineEmits({
    submitCreate: () => true,
    submitCancel: () => true
})

const submitCancel = () => {
    emit('submitCancel')
}
const submitCreate = () => {
    emit('submitCreate')
}

const { reportCreateValidate, reportCreateState } = useReportCreateValidate(props.report)
const selectedAnalyze = computed(() => {
    return props.analyzes.find(analyze => analyze.id == reportCreateState.analyzeId)
})
</script>

<template>
    <Card class="h-fit">
        <template #title>
            New Report
        </template>
        <template #content>
            <div class="text-left grid ">
                <div class="col field">
                    <label for="name">Name:</label>
                    <InputText id="name" v-model.trim="reportCreateValidate.name.$model" required="true" autofocus
                        class="w-full" :class="{ 'p-invalid': reportCreateValidate.name.$invalid }" />
                    <small class="p-error">
                        {{ reportCreateValidate.name.required.$invalid ? 'Name is required.' : '' }}
                    </small>
                    <small class="p-error">
                        {{ reportCreateValidate.name.minLength.$invalid ? 'Name is to short.' : '' }}
                    </small>
                    <small class="p-error">
                        {{ reportCreateValidate.name.maxLength.$invalid ? 'Name is to long.' : '' }}
                    </small>
                </div>
                <div class="col field">
                    <label for="File" class="flex align-items-center">Type:</label>
                    <Dropdown v-model="reportCreateValidate.type.$model" :options="reportTypeOptions" option-label="value"
                        option-value="value" placeholder="Select an type" :filter="true" filter-placeholder="Find type"
                        class="w-full" :class="{ 'p-invalid': reportCreateValidate.type.$invalid }" />
                    <small class="p-error">
                        {{ reportCreateValidate.type.required.$invalid ? 'Type is required.' : '&nbsp;' }}
                    </small>
                </div>
                <div class="col field">
                    <label for="File">Analyze:</label>
                    <Dropdown v-model="reportCreateValidate.analyzeId.$model" :options="props.analyzes" option-value="id"
                        placeholder="Select an analyze" :filter="true" filter-placeholder="Find analyze" class="w-full"
                        :class="{ 'p-invalid': reportCreateValidate.analyzeId.$invalid }"
                        :loading="props.isAnalyzesLoading">
                        <template #value="slotProps">
                            <div v-if="slotProps.value && selectedAnalyze" class="flex align-items-center">
                                <Badge class="w-fit mr-1" :value="selectedAnalyze.status"
                                    :severity="getAnalyzeSeverity(selectedAnalyze.status)" />
                                <div>{{ selectedAnalyze.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex align-items-center">
                                <Badge class="w-fit mr-1" :value="slotProps.option.status"
                                    :severity="getAnalyzeSeverity(slotProps.option.status)" />
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Dropdown>
                    <small class="p-error">
                        {{ reportCreateValidate.analyzeId.required.$invalid ? 'Analyze is required.' : '&nbsp;' }}
                    </small>
                </div>
            </div>
        </template>

        <template #footer>
            <div>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="submitCancel" />
                <Button label="Create" icon="pi pi-check" :disabled="reportCreateValidate.$invalid" @click="submitCreate" />
            </div>
        </template>
    </Card>
</template>