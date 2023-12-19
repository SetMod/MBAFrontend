<script setup lang="ts">
import Datasources from "../../../models/DatasourcesModel";
import useDatasourceEditValidate from "../hooks/useDatasourceEditValidate";

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    datasource: {
        type: Datasources,
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

const { datasourceEditValidate } = useDatasourceEditValidate(props.datasource)
</script>

<template>
    <Dialog header="Organization" class="p-fluid w-29rem" :modal="true" :visible="props.show" @update:visible="closeDialog">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="datasourceEditValidate.name.$model" required="true" autofocus
                :class="{ 'p-invalid': datasourceEditValidate.name.$invalid }" />
            <small v-if="datasourceEditValidate.name.required.$invalid" class="p-error">Name is required.</small>
            <small v-else-if="datasourceEditValidate.name.minLength.$invalid" class="p-error">Name is to
                short.</small>
            <small v-else-if="datasourceEditValidate.name.maxLength.$invalid" class="p-error">Name is to
                long.</small>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
            <Button label="Update" icon="pi pi-check" severity="success" :disabled="datasourceEditValidate.$invalid"
                @click="submitDialog" />
        </template>
    </Dialog>
</template>
