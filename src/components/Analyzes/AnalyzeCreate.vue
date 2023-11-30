
<template>
    <div class="p-card m-5 w-30rem">
        <h2 class="p-card-title">Analyze</h2>
        <div class="p-card-body  text-left">
            <div class="field flex flex-column flex flex-column">
                <label for="name">Name:</label>
                <InputText id="name" v-model.trim="v$.name.$model" required="true" autofocus
                    :class="{ 'p-invalid': v$.name.$invalid }" />
                <small v-if="v$.name.required.$invalid" class="p-error">Name is required.</small>
                <small v-else-if="v$.name.minLength.$invalid" class="p-error">Name is to
                    short.</small>
                <small v-else-if="v$.name.maxLength.$invalid" class="p-error">Name is to
                    long.</small>
            </div>
            <div class="field flex flex-column">
                <label for="name">Description:</label>
                <Textarea id="name" v-model.trim="v$.description.$model" required="true" autofocus
                    :auto-resize="true" rows="3" :class="{ 'p-invalid': v$.description.$invalid }" />
                <small v-if="v$.description.required.$invalid" class="p-error">Description is required.</small>
                <small v-else-if="v$.description.minLength.$invalid" class="p-error">Description is to
                    short.</small>
                <small v-else-if="v$.description.maxLength.$invalid" class="p-error">Description is to
                    long.</small>
            </div>
            <div class="field flex flex-column">
                <label for="name">Support:</label>
                <InputNumber id="name" v-model.number="v$.support.$model" required="true" autofocus
                    :class="v$.support.$invalid ? 'p-invalid' : ''" :min="0.01" :max="1" :step="0.1" />
                <small v-if="v$.support.required.$invalid" class="p-error">Support is required.</small>
                <small v-else-if="v$.support.between.$invalid" class="p-error">{{
                        v$.support.between.$message.replace('The value', 'Support')
                }}</small>
            </div>
            <div class="field flex flex-column">
                <label for="name">Lift:</label>
                <InputNumber id="name" v-model.number="v$.lift.$model" required="true" autofocus
                    :class="v$.lift.$invalid ? 'p-invalid' : ''" :min="0.01" :max="1" :step="0.1" />
                <small v-if="v$.lift.required.$invalid" class="p-error">Lift is required.</small>
                <small v-else-if="v$.lift.between.$invalid" class="p-error">{{
                        v$.lift.between.$message.replace('The value', 'Lift')
                }}</small>
            </div>
            <div class="field flex flex-column">
                <label for="name">Confidence:</label>
                <InputNumber id="name" v-model.number="v$.confidence.$model" required="true" autofocus
                    :class="v$.confidence.$invalid ? 'p-invalid' : ''" :min="0.01" :max="1" :step="0.1" />
                <small v-if="v$.confidence.required.$invalid" class="p-error">Confidence is required.</small>
                <small v-else-if="v$.confidence.between.$invalid" class="p-error">{{
                        v$.confidence.between.$message.replace('The value', 'Confidence')
                }}</small>
            </div>
            <div class="field flex flex-column">
                <label for="name">Rules length:</label>
                <InputNumber id="name" v-model.number="v$.rulesLength.$model" required="true" autofocus
                    :class="v$.rulesLength.$invalid ? 'p-invalid' : ''" :min="1" :max="10" />
                <small v-if="v$.rulesLength.required.$invalid" class="p-error">Rules length is required.</small>
                <small v-else-if="v$.rulesLength.between.$invalid" class="p-error">{{
                        v$.rulesLength.between.$message.replace('The value', 'Rules length')
                }}</small>
            </div>

            <div class="field flex flex-column">
                <label for="File" class="flex align-items-center">File:</label>
                <Dropdown v-if="!userFiles || !isReportsLoading" v-model="selectedFile" :options="userFiles"
                    option-label="name" placeholder="Select a file" :filter="true" filter-placeholder="Find file"
                    :loading="isFilesLoading" />
                <Button v-else label="Add file" class="p-button-link" @click="redirectFiles" />
            </div>

            <div class="field flex flex-column">
                <label for="Report" class="flex align-items-center">Report:</label>
                <Dropdown v-if="!userReports || !isReportsLoading" v-model="selectedReport" :options="userReports"
                    option-label="reportName" placeholder="Select a report" :filter="true"
                    filter-placeholder="Search report" :loading="isReportsLoading" />
                <Button v-else label="Create report" class="p-button-link" @click="redirectReports" />
            </div>
            <div class="field flex justify-content-around">
                <i v-if="loading" class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                <Button v-else label="Analyze" :disabled="!selectedFile || !selectedReport"
                    @click="() => submit(state, selectedFile, selectedReport)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core"
import { maxLength, minLength, required, decimal, between } from "@vuelidate/validators"
import { defineComponent, reactive, ref } from "vue"
import useFiles from "../../hooks/useFiles"
import useRedirect from "../../hooks/useRedirect"
import useReports from "../../hooks/useReports"
import Analyzes from "../../models/AnalyzesModel"
import Files from "../../models/FileDatasourcesModel"
import Reports from "../../models/ReportsModel"

export default defineComponent({
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        submit: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const { userFiles, isFilesLoading } = useFiles()
        const { userReports, isReportsLoading } = useReports()
        const { redirectFiles, redirectReports } = useRedirect()
        const selectedFile = ref<Files>()
        const selectedReport = ref<Reports>()
        const state = reactive<Analyzes>({
            id: 0,
            name: '',
            description: '',
            support: 0.1,
            lift: 0.1,
            confidence: 0.1,
            rulesLength: 1,
            analyzeCreateDate: new Date(),
            filePath: '',
            reportId: 0
        })
        const rules = {
            name: { required, minLength: minLength(2), maxLength: maxLength(200) },
            description: { required, minLength: minLength(10), maxLength: maxLength(2000) },
            support: { required, decimal, between: between(0.01, 1) },
            lift: { required, decimal, between: between(0.01, 1) },
            confidence: { required, decimal, between: between(0.01, 1) },
            rulesLength: { required, decimal, between: between(1, 10) },
        }
        const v$ = useVuelidate(rules, state)
        return {
            userFiles,
            userReports,
            selectedFile,
            selectedReport,
            isFilesLoading,
            isReportsLoading,
            v$,
            state,
            props,
            redirectFiles,
            redirectReports,
        }
    }
})
</script>

<style>
</style>