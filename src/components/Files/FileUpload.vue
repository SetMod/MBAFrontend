<template>
    <div class="w-30rem m-auto my-3 p-card">
        <div class="field">
            <label class="mr-2">Filename:</label>
            <InputText v-model="v$.fileName.$model" :maxlength="50" :minlength="2" autofocus
                :class="{ 'p-invalid': v$.fileName.$invalid }">
            </InputText>
            <small v-if="v$.fileName.minLength.$invalid" class="p-error ml-auto">Filename is to
                short.</small>
            <small v-else-if="v$.fileName.maxLength.$invalid" class="p-error ml-auto">Filename is to
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
import Files from "../../models/FilesModel"

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
            fileName: '',
            fileCreateDate: new Date(),
            filePath: '',
            organizationId: 0,
            userId: 0
        })
        const rules = {
            fileName: { minLength: minLength(2), maxLength: maxLength(50) },
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