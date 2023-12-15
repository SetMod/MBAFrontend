<script setup lang="ts">
import { maxLength, minLength, required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import Reports from "../../models/ReportsModel"
import ReportsAnalyzesDataViewVue from './ReportsAnalyzesDataView.vue'
import ReportsVisualizationsDataViewVue from "./ReportsVisualizationsDataView.vue"

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    report: {
        type: Reports,
        required: true
    },
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.error('Invalid update:show event params');
        return false
    },
    submitDialog: () => true
})

const closeDialog = () => emit('update:show', false)
const submitDialog = () => {
    emit('submitDialog')
    closeDialog()
}

const rules = {
    name: { required, minLength: minLength(2), maxLength: maxLength(200) },
    type: { required },
}
const v$ = useVuelidate(rules, props.report)
</script>

<template>
    <Dialog class="p-fluid" :visible="props.show" :style="{ width: '100rem' }" header="Report Details" :modal="true"
        @update:visible="closeDialog">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="v$.name.$model" required="true" autofocus
                :class="{ 'p-invalid': v$.name.$invalid }" />
            <small v-if="v$.name.required.$invalid" class="p-error">Name is required.</small>
            <small v-else-if="v$.name.minLength.$invalid" class="p-error">Name is to
                short.</small>
            <small v-else-if="v$.name.maxLength.$invalid" class="p-error">Name is to
                long.</small>
        </div>
        <!-- <div class="field">
            <label for="description">Data</label>
            <Editor v-model="v$.reportData.$model" editor-style="height: 320px"
                :class="{ 'p-invalid': v$.reportData.$invalid }" />
            <small v-if="v$.reportData.required.$invalid" class="p-error">Data is required.</small>
            <small v-else-if="v$.reportData.minLength.$invalid" class="p-error">Data is to
                short.</small>
            <small v-else-if="v$.reportData.maxLength.$invalid" class="p-error">Data is to
                long.</small>
        </div> -->
        <div class="field">
            <label for="description">Create date</label>
            <div>{{ new Date(report.createdDate).toLocaleDateString() }}</div>
        </div>
        <div class="field">
            <h3 class="mt-6">Visualizations:</h3>
            <ReportsVisualizationsDataViewVue :edit="true" :report="report" />
            <h3 class="mt-6">Analyzes:</h3>
            <ReportsAnalyzesDataViewVue :edit="true" :report="report" />
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button p-button-secondary" @click="closeDialog" />
            <Button label="Save" icon="pi pi-check" class="p-button p-button-success" @click="submitDialog" />
        </template>
    </Dialog>
</template>
