<script setup lang="ts">
import { reactive } from 'vue';
import Datasources, { DatasourceTypes, datasourceTypeOptions } from '../../models/DatasourcesModel';
import FileDatasourceUpload from '../Files/FileDatasourceUpload.vue';
import useVuelidate from '@vuelidate/core';
import { minLength, maxLength, required } from '@vuelidate/validators';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.error('Invalid value type for update:show event!');
        return false
    },
    submitDialog: (value: Datasources) => {
        if (value && value instanceof Datasources) return true
        console.error('Invalid value type for submitDialog event!');
        return false
    }
})

const closeDialog = () => emit('update:show', false)
const submitDialog = (value: Datasources) => {
    emit('submitDialog', value)
    closeDialog()
}
const datasourceState = reactive<Datasources>(new Datasources())
const datasourceRules = {
    name: { minLength: minLength(2), maxLength: maxLength(50) },
    type: { required }
}
const datasourceValidate = useVuelidate(datasourceRules, datasourceState)
const toast = useToast()
</script>

<template>
    <Toast />
    <Dialog header="Datasource" :modal="true" class="p-fluid min-w-max" :visible="props.show" @update:visible="closeDialog">
        <div class="field">
            <label class="mr-2">
                <b>Name:</b>
            </label>
            <InputText v-model="datasourceValidate.name.$model" :maxlength="50" :minlength="2" autofocus
                :class="{ 'p-invalid': datasourceValidate.name.$invalid }">
            </InputText>
            <small v-if="datasourceValidate.name.minLength.$invalid" class="p-error ml-auto">name is to
                short.</small>
            <small v-else-if="datasourceValidate.name.maxLength.$invalid" class="p-error ml-auto">name is to
                long.</small>
        </div>
        <div class="field">
            <label for="type">
                <b>Type:</b>
            </label>
            <Dropdown v-model="datasourceValidate.type.$model" :options="datasourceTypeOptions" option-label="value"
                option-value="value" placeholder="Select a datasource type" :filter="true" filter-placeholder="Find type" />
        </div>
        <div v-if="datasourceValidate.type.$model == DatasourceTypes.FILE" class="field">
            <FileDatasourceUpload />
        </div>
        <div v-if="datasourceValidate.type.$model == DatasourceTypes.DB" class="field">
            <label class="mr-2">
                <b>Connection string:</b>
            </label>
            <InputText :maxlength="50" :minlength="2" autofocus></InputText>
            <Button class="mt-2" label="Test" severity="info"
                @click="() => toast.add({ severity: 'info', summary: 'Testing connection', detail: 'Testing connection', life: 3000 })" />
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
            <Button label="Create" icon="pi pi-check" severity="success" :disabled="datasourceValidate.$invalid"
                @click="submitDialog(datasourceValidate.$model)" />
        </template>
    </Dialog>
</template>