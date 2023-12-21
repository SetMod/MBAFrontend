<script setup lang="ts">
import Datasources, { datasourceTypeOptions } from '../../../models/DatasourcesModel';
import useDatasourceCreateValidate from '../hooks/useDatasourceCreateValidate';
import { reactive } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
        console.error('Invalid value type for update:show event!');
        return false
    },
    submitDialog: (value: Datasources) => {
        if (value instanceof Datasources) return true
        console.error('Invalid value type for submitDialog event!');
        return false
    }
})

const newDatasource = reactive<Datasources>(new Datasources())
const { datasourceCreateValidate } = useDatasourceCreateValidate(newDatasource)

const closeDialog = () => emit('update:show', false)
const submitDialog = () => {
    emit('submitDialog', newDatasource)
    closeDialog()
}
</script>

<template>
    <Dialog header="Datasource" :modal="true" class="p-fluid" :style="{ width: '50rem' }" :visible="props.show"
        @update:visible="closeDialog">
        <div class="field">
            <label class="mr-2">
                <b>Name:</b>
            </label>
            <InputText v-model="datasourceCreateValidate.name.$model" :maxlength="50" :minlength="2" autofocus
                :class="{ 'p-invalid': datasourceCreateValidate.name.$invalid }">
            </InputText>
            <small class="p-error ml-auto">
                {{ datasourceCreateValidate.name.required.$invalid ? 'Name is required.' : '&nbsp;' }}
            </small>
            <small class="p-error ml-auto">
                {{ datasourceCreateValidate.name.minLength.$invalid ? 'Name is to short.' : '' }}
            </small>
            <small class="p-error ml-auto">
                {{ datasourceCreateValidate.name.maxLength.$invalid ? 'Name is to long.' : '' }}
            </small>
        </div>
        <div class="field">
            <label for="type">
                <b>Type:</b>
            </label>
            <Dropdown v-model="datasourceCreateValidate.type.$model" :options="datasourceTypeOptions" option-label="label"
                option-value="value" placeholder="Select a datasource type" :filter="true" filter-placeholder="Find type" />
        </div>

        <div class="field">
            <slot :new-datasource="newDatasource"></slot>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
            <Button label="Create" icon="pi pi-check" severity="success" :disabled="datasourceCreateValidate.$invalid"
                @click="submitDialog" />
        </template>
    </Dialog>
</template>