<script setup lang="ts">
import Datasources from '../../../models/DatasourcesModel';
import useDatasourceCreateValidate from '../hooks/useDatasourceCreateValidate';

const props = defineProps({
    datasource: {
        type: Datasources,
        required: true
    }
})

const emit = defineEmits({
    testConnection: (event: any, value: Datasources) => {
        if (value instanceof Datasources) return true
        console.error('Invalid value type for submitDialog event!');
        return false
    }
})

const { datasourceValidate } = useDatasourceCreateValidate(props.datasource)
</script>

<template>
    <div>
        <label>
            <b>Connection string:</b>
        </label>
        <InputText :maxlength="50" :minlength="2" autofocus :class="{ 'p-invalid': datasourceValidate.$invalid }" />
        <small class="p-error">
            {{ datasourceValidate.$invalid ? 'Test' : '' }}
        </small>
        <Button class="mt-2" label="Test connection" @click="(event) => emit('testConnection', event, props.datasource)" />
    </div>
</template>
