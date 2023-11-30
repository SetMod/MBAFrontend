<template>
    <div class="w-30rem m-auto my-3 p-card">
        <div class="field">
            <label class="mr-2">name:</label>
            <InputText v-model="v$.name.$model" :maxlength="50" :minlength="2" autofocus
                :class="{ 'p-invalid': v$.name.$invalid }">
            </InputText>
            <small v-if="v$.name.minLength.$invalid" class="p-error ml-auto">name is to
                short.</small>
            <small v-else-if="v$.name.maxLength.$invalid" class="p-error ml-auto">name is to
                long.</small>
        </div>
        <FileUpload name="file" accept=".csv" :custom-upload="true" :max-file-size="100000000"
            @uploader="(event) => onUpload(event, state)">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
    </div>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core"
import { maxLength, minLength } from "@vuelidate/validators"
import { defineComponent, reactive } from "vue"
import Files from "../../models/FileDatasourcesModel"

export default defineComponent({
    props: {
        onUpload: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const state = reactive<Files>({
            fileId: 0,
            name: '',
            fileCreateDate: new Date(),
            filePath: '',
            organizationId: 0,
            userId: 0
        })
        const rules = {
            name: { minLength: minLength(2), maxLength: maxLength(50) },
        }
        const v$ = useVuelidate(rules, state)
        return {
            state,
            v$,
            props
        }
    }
})
</script>

<style>
</style>