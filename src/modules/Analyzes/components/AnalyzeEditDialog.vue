<script setup lang="ts">
import Analyzes, { algorithmOptions } from "../../../models/AnalyzesModel";
import useAnalyzeEditValidate from "../hooks/useAnalyzeEditValidate";
import { getAnalyzeSeverity } from "../utils";

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    analyze: {
        type: Analyzes,
        required: true
    }
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value == 'boolean') return true
        console.error('Invalid value type for update:show event!');
        return false
    },
    submitDialog: () => true
})

const closeDialog = () => emit('update:show', false)
const submitDialog = () => {
    emit('submitDialog')
    closeDialog()
}

const { analyzeEditValidate } = useAnalyzeEditValidate(props.analyze)
</script>

<template>
    <Dialog header="Analyze" class="p-fluid w-29rem" :modal="true" :visible="props.show" @update:visible="closeDialog">
        <div class="field gap-2">
            <label for="name">Name:</label>
            <InputText id="name" v-model.trim="analyzeEditValidate.name.$model" required="true" autofocus class="w-full"
                :class="{ 'p-invalid': analyzeEditValidate.name.$invalid }" />
            <small class="p-error">
                {{ analyzeEditValidate.name.required.$invalid ? 'Name is required.' : '&nbsp;' }}
            </small>
            <small class="p-error">
                {{ analyzeEditValidate.name.minLength.$invalid ? 'Name is to short.' : '' }}
            </small>
            <small class="p-error">
                {{ analyzeEditValidate.name.maxLength.$invalid ? 'Name is to long.' : '' }}
            </small>
        </div>
        <div class="field">
            <label for="name">Description:</label>
            <Textarea id="name" v-model.trim="analyzeEditValidate.description.$model" required="true" autofocus
                :auto-resize="true" rows="3" class="w-full"
                :class="{ 'p-invalid': analyzeEditValidate.description.$invalid }" />
            <small class="p-error">
                {{ analyzeEditValidate.description.required.$invalid ? 'Description is required.' : '&nbsp;' }}
            </small>
            <small class="p-error">
                {{ analyzeEditValidate.description.minLength.$invalid ? 'Description is to short.' : '' }}
            </small>
            <small class="p-error">
                {{ analyzeEditValidate.description.maxLength.$invalid ? 'Description is to long.' : '' }}
            </small>
        </div>
        <!-- <div class="field">
            <label for="File">Datasource:</label>
            <Dropdown v-model="analyzeEditValidate.datasourceId.$model" :options="props.datasources" option-label="name"
                option-value="id" placeholder="Select a datasource" :filter="true" filter-placeholder="Find datasource"
                class="w-full" :class="{ 'p-invalid': analyzeEditValidate.datasourceId.$invalid }"
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
                {{ analyzeEditValidate.datasourceId.required.$invalid ? 'Datasource is required.' : '&nbsp;' }}
            </small>
        </div> -->
        <div class="field">
            <label for="File" class="flex align-items-center">Algorithm:</label>
            <Dropdown v-model="analyzeEditValidate.algorithm.$model" :options="algorithmOptions" option-label="value"
                option-value="value" placeholder="Select an algorithm" :filter="true" filter-placeholder="Find algorithm"
                class="w-full" :class="{ 'p-invalid': analyzeEditValidate.algorithm.$invalid }" />
            <small class="p-error">
                {{ analyzeEditValidate.algorithm.required.$invalid ? 'Algorithm is required.' : '&nbsp;' }}
            </small>
        </div>
        <div class="field">
            <label for="File" class="flex align-items-center">
                <b>Status:</b>
            </label>
            <Badge class="w-fit" :value="analyzeEditValidate.status.$model"
                :severity="getAnalyzeSeverity(analyzeEditValidate.status.$model)" />
        </div>
        <div class="field">
            <label for="name">Support:</label>
            <InputNumber id="name" v-model.number="analyzeEditValidate.support.$model" required="true" autofocus
                class="w-full" :class="analyzeEditValidate.support.$invalid ? 'p-invalid' : ''" :step="0.1"
                :max-fraction-digits="5" />
            <small class="p-error">
                {{ analyzeEditValidate.support.required.$invalid ? 'Support is required.' : '&nbsp;' }}
            </small>
            <small class="p-error">
                {{
                    analyzeEditValidate.support.between.$invalid ?
                    analyzeEditValidate.support.between.$message.replace('The value', 'Support') : ''
                }}
            </small>
        </div>
        <div class="field">
            <label for="name">Lift:</label>
            <InputNumber id="name" v-model.number="analyzeEditValidate.lift.$model" required="true" autofocus class="w-full"
                :class="analyzeEditValidate.lift.$invalid ? 'p-invalid' : ''" :step="0.1" :max-fraction-digits="5" />
            <small class="p-error">
                {{ analyzeEditValidate.lift.required.$invalid ? 'Lift is required.' : '&nbsp;' }}
            </small>
            <small class="p-error">
                {{
                    analyzeEditValidate.lift.between.$invalid ?
                    analyzeEditValidate.lift.between.$message.replace('The value', 'Lift') : ''
                }}
            </small>
        </div>
        <div class="field">
            <label for="name">Confidence:</label>
            <InputNumber id="name" v-model.number="analyzeEditValidate.confidence.$model" required="true" autofocus
                class="w-full" :class="analyzeEditValidate.confidence.$invalid ? 'p-invalid' : ''" :step="0.1"
                :max-fraction-digits="5" />
            <small class="p-error">
                {{ analyzeEditValidate.confidence.required.$invalid ? 'Confidence is required.' : '&nbsp;' }}
            </small>
            <small class="p-error">
                {{
                    analyzeEditValidate.confidence.between.$invalid ?
                    analyzeEditValidate.confidence.between.$message.replace('The value', 'Confidence') : ''
                }}
            </small>
        </div>
        <div class="field">
            <label for="name">Rules length:</label>
            <InputNumber id="name" v-model.number="analyzeEditValidate.rulesLength.$model" required="true" autofocus
                class="w-full" :class="analyzeEditValidate.rulesLength.$invalid ? 'p-invalid' : ''" :max-fraction-digits="0" />
            <small class="p-error">
                {{ analyzeEditValidate.rulesLength.required.$invalid ? 'Rules length is required.' : '&nbsp;' }}
            </small>
            <small class="p-error">
                {{
                    analyzeEditValidate.rulesLength.between.$invalid ?
                    analyzeEditValidate.rulesLength.between.$message.replace('The value', 'Rules length') : ''
                }}
            </small>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
            <Button label="Update" icon="pi pi-check" severity="success" :disabled="analyzeEditValidate.$invalid"
                @click="submitDialog" />
        </template>
    </Dialog>
</template>
