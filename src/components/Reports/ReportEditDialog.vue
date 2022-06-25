<template>
    <Dialog v-model:visible="props.display" :style="{ width: '100rem' }" header="Report Details" :modal="true"
        class="p-fluid">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="v$.reportName.$model" required="true" autofocus
                :class="{ 'p-invalid': v$.reportName.$invalid }" />
            <small v-if="v$.reportName.required.$invalid" class="p-error">Name is required.</small>
            <small v-else-if="v$.reportName.minLength.$invalid" class="p-error">Name is to
                short.</small>
            <small v-else-if="v$.reportName.maxLength.$invalid" class="p-error">Name is to
                long.</small>
        </div>
        <div class="field">
            <label for="description">Data</label>
            <Editor v-model="v$.reportData.$model" editor-style="height: 320px"
                :class="{ 'p-invalid': v$.reportData.$invalid }" />
            <small v-if="v$.reportData.required.$invalid" class="p-error">Data is required.</small>
            <small v-else-if="v$.reportData.minLength.$invalid" class="p-error">Data is to
                short.</small>
            <small v-else-if="v$.reportData.maxLength.$invalid" class="p-error">Data is to
                long.</small>
        </div>
        <div class="field">
            <label for="description">Create date</label>
            <div>{{ new Date(report.reportCreateDate).toLocaleDateString() }}</div>
        </div>
        <div class="field">
            <h3 class="mt-6">Visualizations:</h3>
            <ReportsVisualizationsDataViewVue :edit="true" :report="report" />
            <h3 class="mt-6">Analyzes:</h3>
            <ReportsAnalyzesDataViewVue :edit="true" :report="report" />
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button p-button-secondary"
                @click="() => closeDialog()" />
            <Button label="Save" icon="pi pi-check" class="p-button p-button-success" @click="() => submitDialog()" />
        </template>
    </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { maxLength, minLength, required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import Reports from "../../models/ReportsModel"
import ReportsAnalyzesDataViewVue from './ReportsAnalyzesDataView.vue'
import ReportsVisualizationsDataViewVue from "./ReportsVisualizationsDataView.vue"

export default defineComponent({
    components: {
        ReportsAnalyzesDataViewVue,
        ReportsVisualizationsDataViewVue
    },
    props: {
        display: {
            type: Boolean,
            required: true
        },
        report: {
            type: Reports,
            required: true
        },
        closeDialog: {
            type: Function,
            required: true
        },
        submitDialog: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const rules = {
            reportName: { required, minLength: minLength(2), maxLength: maxLength(200) },
            reportData: { required, minLength: minLength(10), maxLength: maxLength(2000) },
        }
        const v$ = useVuelidate(rules, props.report)
        return {
            v$,
            props,
        }
    }
})
</script>

<style>
</style>