<template>
    <Dialog v-model:visible="props.display" header="Organization" :modal="true" class="p-fluid w-29rem">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="v$.organizationName.$model" required="true" autofocus
                :class="{ 'p-invalid': v$.organizationName.$invalid }" />
            <small v-if="v$.organizationName.required.$invalid" class="p-error">Name is required.</small>
            <small v-else-if="v$.organizationName.minLength.$invalid" class="p-error">Name is to
                short.</small>
            <small v-else-if="v$.organizationName.maxLength.$invalid" class="p-error">Name is to
                long.</small>
        </div>
        <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="v$.organizationDescription.$model" required="true" rows="3" cols="20"
                :class="{ 'p-invalid': v$.organizationDescription.$invalid }" />
            <small v-if="v$.organizationDescription.required.$invalid" class="p-error">Description is
                required.</small>
            <small v-else-if="v$.organizationDescription.minLength.$invalid" class="p-error">Description is
                to
                short.</small>
            <small v-else-if="v$.organizationDescription.maxLength.$invalid" class="p-error">Description is
                to
                long.</small>
        </div>
        <div class="field">
            <label for="name">Email</label>
            <InputText id="name" v-model.trim="v$.organizationEmail.$model" required="true" autofocus
                :class="{ 'p-invalid': v$.organizationEmail.$invalid }" />
            <small v-if="v$.organizationEmail.required.$invalid" class="p-error">Email is required.</small>
            <small v-else-if="v$.organizationEmail.email.$invalid" class="p-error">Email is
                invalid.</small>
            <small v-else-if="v$.organizationEmail.maxLength.$invalid" class="p-error">Email is to
                long.</small>
        </div>
        <div class="field">
            <label for="name">Phone</label>
            <InputMask v-model="v$.organizationPhone.$model" mask="+99 (999) 999-9999" placeholder="+ 99 (999) 999-9999"
                :class="{ 'p-invalid': v$.organizationPhone.$invalid }" />
            <!-- <InputText id="name" v-model.trim="v$.organizationPhone.$model" autofocus
                :class="{ 'p-invalid': v$.organizationPhone.$invalid }" /> -->
            <small v-if="v$.organizationPhone.minLength.$invalid" class="p-error">Phone number is to
                short.</small>
            <small v-else-if="v$.organizationPhone.maxLength.$invalid" class="p-error">Phone number is to
                long.</small>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="() => closeDialog()" />
            <Button label="Save" icon="pi pi-check" class="p-button-text" :disabled="v$.$invalid"
                @click="() => submitDialog(state)" />
        </template>
    </Dialog>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core"
import { defineComponent, reactive } from "vue"
import Organizations from "../../models/OrganizationsModel"
import { email, maxLength, minLength, required } from "@vuelidate/validators"

export default defineComponent({
    props: {
        display: {
            type: Boolean,
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
        const state = reactive<Organizations>({
            organizationId: 0,
            organizationName: '',
            organizationDescription: '',
            organizationEmail: '',
            organizationPhone: '',
            organizationCreateDate: new Date(),
        })
        const rules = {
            organizationName: { required, minLength: minLength(2), maxLength: maxLength(200) },
            organizationDescription: { required, minLength: minLength(10), maxLength: maxLength(2000) },
            organizationEmail: { required, email, maxLength: maxLength(255) },
            organizationPhone: { minLength: minLength(18), maxLength: maxLength(18) },
        }
        const v$ = useVuelidate(rules, state)
        return {
            v$,
            state,
            props
        }
    }
})
</script>
