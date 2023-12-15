<script setup lang="ts">
import { reactive } from "vue"
import { maxLength, minLength, required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import Reports, { reportTypeOptions } from "../../models/ReportsModel"

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },

})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.log('Validation error of update:show event params');
        return false
    },
    submitDialog: (report: Reports) => {
        if (report instanceof Reports) return true
        console.log('Invalid submitDialog event params');
        return false
    }
})

const closeDialog = () => {
    emit('update:show', false)
}
const reportState = reactive<Reports>(new Reports())
const reportRules = {
    name: { required, minLength: minLength(2), maxLength: maxLength(200) },
    type: { required },
    creatorId: { required },
}
const reportValidate = useVuelidate(reportRules, reportState)
</script>


<template>
    <Dialog class="p-fluid" :visible="props.show" :style="{ width: '100rem' }" header="Report Details" :modal="true"
        @update:visible="closeDialog">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="reportValidate.name.$model" required="true" autofocus
                :class="{ 'p-invalid': reportValidate.name.$invalid }" />
            <small class="p-error">
                {{ reportValidate.name.required.$invalid ? 'Name is required.' : '' }}
            </small>
            <small class="p-error">
                {{ reportValidate.name.minLength.$invalid ? 'Name is to short.' : '' }}
            </small>
            <small class="p-error">
                {{ reportValidate.name.maxLength.$invalid ? 'Name is to long.' : '' }}
            </small>
        </div>
        <div class="field">
            <label for="File" class="flex align-items-center">Type:</label>
            <Dropdown v-model="reportValidate.type.$model" :options="reportTypeOptions" option-label="value"
                option-value="value" placeholder="Select an type" :filter="true" filter-placeholder="Find type"
                class="w-full" :class="{ 'p-invalid': reportValidate.type.$invalid }" />
            <small class="p-error">
                {{ reportValidate.type.required.$invalid ? 'Type is required.' : '&nbsp;' }}
            </small>
        </div>
        <!-- <div class="field">
            <label for="description">Data</label>
            <Textarea id="description" v-model="v$.reportData.$model" required="true" rows="3" cols="20"
                    :class="{ 'p-invalid': v$.reportData.$invalid }" />
        </div> -->
        <!-- <div class="field">
            <label for="description">Data</label>
            <Editor v-model="reportValidate.reportData.$model" editor-style="height: 320px"
                :class="{ 'p-invalid': reportValidate.reportData.$invalid }" />
            <small class="p-error">
                {{ reportValidate.reportData.required.$invalid ? 'Data is required.' : '' }}
            </small>
            <small class="p-error">
                {{ reportValidate.reportData.minLength.$invalid ? 'Data is to short.' : '' }}
            </small>
            <small class="p-error">
                {{ reportValidate.reportData.maxLength.$invalid ? 'Data is to long.' : '' }}
            </small>
        </div> -->

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="() => closeDialog()" />
            <Button label="Save" icon="pi pi-check" class="p-button-text" :disabled="reportValidate.$invalid"
                @click="() => emit('submitDialog', reportState)" />
        </template>
    </Dialog>
</template>
