<template>
    <Dialog v-model:visible="props.display" header="Update" :style="{ width: '350px' }" :modal="true" class="p-fluid">
        <div class="field">
            <label>Filename</label>
            <InputText v-model="v$.fileName.$model" :maxlength="50" :minlength="2" required="true" autofocus
                :class="{ 'p-invalid': v$.fileName.$invalid }">
            </InputText>
            <small v-if="v$.fileName.required.$invalid" class="p-error ml-auto">Filename is required.</small>
            <small v-else-if="v$.fileName.minLength.$invalid" class="p-error ml-auto">Filename is to
                short.</small>
            <small v-else-if="v$.fileName.maxLength.$invalid" class="p-error ml-auto">Filename is to
                long.</small>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="() => props.closeDialog()" />
            <Button label="Yes" icon="pi pi-check" class="p-button-text" :disabled="v$.fileName.$invalid"
                @click="() => props.submitDialog()" />
        </template>
    </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { maxLength, minLength, required } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import Files from "../../models/FileDatasourcesModel"

export default defineComponent({
    props: {
        display: {
            type: Boolean,
            required: true
        },
        file: {
            type: Files,
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
            fileName: { required, minLength: minLength(2), maxLength: maxLength(50) },
        }
        const v$ = useVuelidate(rules, props.file)
        return {
            v$,
            props
        }
    }
})
</script>

<style>
</style>