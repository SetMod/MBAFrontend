<script setup lang="ts">
import { PropType, computed } from "vue"
import Analyzes, { algorithmOptions } from "../../../models/AnalyzesModel"
import { IDatasourcesFullResponse } from "../../../models/DatasourcesModel"
import { getDatasourceTypeValue, getDatasourceTypeSeverity } from '../../Datasources/utils'
import useAnalyzeCreateValidate from "../hooks/useAnalyzeCreateValidate"
import OrganizationMembers from "../../../models/OrganizationMembersModel"

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    isDatasourcesLoading: {
        type: Boolean,
        default: false
    },
    currentMember: {
        type: OrganizationMembers,
        required: true,
    },
    datasources: {
        type: Array as PropType<IDatasourcesFullResponse[]>,
        required: true
    }
})

const emit = defineEmits({
    submitCreate: (analyze: Analyzes) => {
        if (analyze instanceof Analyzes) return true
        console.log('Validation error of submitCreate event params');
        return false
    },
    submitAnalyze: (analyze: Analyzes) => {
        if (analyze instanceof Analyzes) return true
        console.log('Validation error of submitAnalyze event params');
        return false
    }
})

const { analyzeValidate, analyzeCreateState } = useAnalyzeCreateValidate(props.currentMember)
const selectedDatasource = computed(() => {
    return props.datasources.find(ds => ds.id == analyzeCreateState.value.datasourceId)
})

const submitCreate = () => {
    emit('submitCreate', analyzeCreateState.value)

    // analyzeCreateState.value = new Analyzes()
}
</script>

<template>
    <div class="p-card m-1 w-full">
        <!-- <h2 class="p-card-title">Analyze</h2> -->
        <div>{{ analyzeCreateState }}</div>
        <div class="p-card-body  text-left">
            <div class="grid flex justify-content-center">
                <div class="col-4">
                    <div class="field gap-2">
                        <label for="name">Name:</label>
                        <InputText id="name" v-model.trim="analyzeValidate.name.$model" required="true" autofocus
                            class="w-full" :class="{ 'p-invalid': analyzeValidate.name.$invalid }" />
                        <small class="p-error">
                            {{ analyzeValidate.name.required.$invalid ? 'Name is required.' : '&nbsp;' }}
                        </small>
                        <small class="p-error">
                            {{ analyzeValidate.name.minLength.$invalid ? 'Name is to short.' : '' }}
                        </small>
                        <small class="p-error">
                            {{ analyzeValidate.name.maxLength.$invalid ? 'Name is to long.' : '' }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="name">Description:</label>
                        <Textarea id="name" v-model.trim="analyzeValidate.description.$model" required="true" autofocus
                            :auto-resize="true" rows="3" class="w-full"
                            :class="{ 'p-invalid': analyzeValidate.description.$invalid }" />
                        <small class="p-error">
                            {{ analyzeValidate.description.required.$invalid ? 'Description is required.' : '&nbsp;' }}
                        </small>
                        <small class="p-error">
                            {{ analyzeValidate.description.minLength.$invalid ? 'Description is to short.' : '' }}
                        </small>
                        <small class="p-error">
                            {{ analyzeValidate.description.maxLength.$invalid ? 'Description is to long.' : '' }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="File">Datasource:</label>
                        <Dropdown v-model="analyzeValidate.datasourceId.$model" :options="props.datasources"
                            option-label="name" option-value="id" placeholder="Select a datasource" :filter="true"
                            filter-placeholder="Find datasource" class="w-full"
                            :class="{ 'p-invalid': analyzeValidate.datasourceId.$invalid }"
                            :loading="props.isDatasourcesLoading">
                            <template #value="slotProps">
                                <div v-if="slotProps.value && selectedDatasource" class="flex align-items-center">
                                    <Badge class="w-fit mr-1" :value="getDatasourceTypeValue(selectedDatasource.type)"
                                        :severity="getDatasourceTypeSeverity(selectedDatasource.type)" />
                                    <div>{{ selectedDatasource?.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <Badge class="w-fit mr-1" :value="getDatasourceTypeValue(slotProps.option.type)"
                                        :severity="getDatasourceTypeSeverity(slotProps.option.type)" />
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                        <small class="p-error">
                            {{ analyzeValidate.datasourceId.required.$invalid ? 'Datasource is required.' : '&nbsp;' }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="File" class="flex align-items-center">Algorithm:</label>
                        <Dropdown v-model="analyzeValidate.algorithm.$model" :options="algorithmOptions"
                            option-label="value" option-value="value" placeholder="Select an algorithm" :filter="true"
                            filter-placeholder="Find algorithm" class="w-full"
                            :class="{ 'p-invalid': analyzeValidate.algorithm.$invalid }" />
                        <small class="p-error">
                            {{ analyzeValidate.algorithm.required.$invalid ? 'Algorithm is required.' : '&nbsp;' }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="File" class="flex align-items-center">
                            <b>Status:</b>
                        </label>
                        <Badge class="w-fit" :value="analyzeValidate.status.$model" severity="info" />
                    </div>
                </div>
                <div class="col-4">
                    <div class="field">
                        <label for="name">Support:</label>
                        <InputNumber id="name" v-model.number="analyzeValidate.support.$model" required="true" autofocus
                            class="w-full" :class="analyzeValidate.support.$invalid ? 'p-invalid' : ''" :min="0.01" :max="1"
                            :step="0.1" />
                        <small class="p-error">
                            {{ analyzeValidate.support.required.$invalid ? 'Support is required.' : '&nbsp;' }}
                        </small>
                        <small class="p-error">
                            {{
                                analyzeValidate.support.between.$invalid ?
                                analyzeValidate.support.between.$message.replace('The value', 'Support') : ''
                            }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="name">Lift:</label>
                        <InputNumber id="name" v-model.number="analyzeValidate.lift.$model" required="true" autofocus
                            class="w-full" :class="analyzeValidate.lift.$invalid ? 'p-invalid' : ''" :min="0.01" :max="1"
                            :step="0.1" />
                        <small class="p-error">
                            {{ analyzeValidate.lift.required.$invalid ? 'Lift is required.' : '&nbsp;' }}
                        </small>
                        <small class="p-error">
                            {{
                                analyzeValidate.lift.between.$invalid ?
                                analyzeValidate.lift.between.$message.replace('The value', 'Lift') : ''
                            }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="name">Confidence:</label>
                        <InputNumber id="name" v-model.number="analyzeValidate.confidence.$model" required="true" autofocus
                            class="w-full" :class="analyzeValidate.confidence.$invalid ? 'p-invalid' : ''" :min="0.01"
                            :max="1" :step="0.1" />
                        <small class="p-error">
                            {{ analyzeValidate.confidence.required.$invalid ? 'Confidence is required.' : '&nbsp;' }}
                        </small>
                        <small class="p-error">
                            {{
                                analyzeValidate.confidence.between.$invalid ?
                                analyzeValidate.confidence.between.$message.replace('The value', 'Confidence') : ''
                            }}
                        </small>
                    </div>
                    <div class="field">
                        <label for="name">Rules length:</label>
                        <InputNumber id="name" v-model.number="analyzeValidate.rulesLength.$model" required="true" autofocus
                            class="w-full" :class="analyzeValidate.rulesLength.$invalid ? 'p-invalid' : ''" :min="1"
                            :max="10" />
                        <small class="p-error">
                            {{ analyzeValidate.rulesLength.required.$invalid ? 'Rules length is required.' : '&nbsp;' }}
                        </small>
                        <small class="p-error">
                            {{
                                analyzeValidate.rulesLength.between.$invalid ?
                                analyzeValidate.rulesLength.between.$message.replace('The value', 'Rules length') : ''
                            }}
                        </small>
                    </div>
                </div>
            </div>

            <div class="field flex justify-content-center">
                <i v-if="props.isLoading" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                <Button label="Create" severity="success" :disabled="analyzeValidate.$invalid" @click="submitCreate" />
                <Button class="ml-5" label="Analyze" severity="info" :disabled="analyzeValidate.$invalid"
                    @click="submitCreate" />
            </div>
        </div>
    </div>
</template>
