<script setup lang="ts">
import Organizations from "../../../models/OrganizationsModel"
import { useOrgCreateValidate } from "../../../hooks/useOrganizations"

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
    submitDialog: (value: Organizations) => {
        if (value && value instanceof Organizations) return true
        console.error('Invalid value type for submitDialog event!');
        return false
    }
})

const closeDialog = () => emit('update:show', false)
const submitDialog = (value: Organizations) => {
    emit('submitDialog', value)
    closeDialog()
}

const { orgCreateState, orgCreateValidate } = useOrgCreateValidate()
</script>

<template>
    <Dialog header="Organization" :modal="true" class="p-fluid w-29rem" :visible="props.show" @update:visible="closeDialog">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="orgCreateValidate.name.$model" required="true" autofocus
                :class="{ 'p-invalid': orgCreateValidate.name.$invalid }" />
            <small v-if="orgCreateValidate.name.required.$invalid" class="p-error">Name is required.</small>
            <small v-else-if="orgCreateValidate.name.minLength.$invalid" class="p-error">Name is to
                short.</small>
            <small v-else-if="orgCreateValidate.name.maxLength.$invalid" class="p-error">Name is to
                long.</small>
        </div>
        <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="orgCreateValidate.description.$model" required="true" rows="3" cols="20"
                :class="{ 'p-invalid': orgCreateValidate.description.$invalid }" />
            <small v-if="orgCreateValidate.description.required.$invalid" class="p-error">Description is
                required.</small>
            <small v-else-if="orgCreateValidate.description.minLength.$invalid" class="p-error">Description is
                to
                short.</small>
            <small v-else-if="orgCreateValidate.description.maxLength.$invalid" class="p-error">Description is
                to
                long.</small>
        </div>
        <div class="field">
            <label for="name">Email</label>
            <InputText id="name" v-model.trim="orgCreateValidate.email.$model" required="true" autofocus
                :class="{ 'p-invalid': orgCreateValidate.email.$invalid }" />
            <small v-if="orgCreateValidate.email.required.$invalid" class="p-error">Email is required.</small>
            <small v-else-if="orgCreateValidate.email.email.$invalid" class="p-error">Email is
                invalid.</small>
            <small v-else-if="orgCreateValidate.email.maxLength.$invalid" class="p-error">Email is to
                long.</small>
        </div>
        <div class="field">
            <label for="name">Phone</label>
            <InputMask v-model="orgCreateValidate.phone.$model" mask="+99 (999) 999-9999" placeholder="+ 99 (999) 999-9999"
                :class="{ 'p-invalid': orgCreateValidate.phone.$invalid }" />
            <!-- <InputText id="name" v-model.trim="v$.phone.$model" autofocus
                :class="{ 'p-invalid': v$.phone.$invalid }" /> -->
            <small v-if="orgCreateValidate.phone.minLength.$invalid" class="p-error">Phone number is to
                short.</small>
            <small v-else-if="orgCreateValidate.phone.maxLength.$invalid" class="p-error">Phone number is to
                long.</small>
        </div>

        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
            <Button label="Create" icon="pi pi-check" severity="success" :disabled="orgCreateValidate.$invalid"
                @click="submitDialog(orgCreateState)" />
        </template>
    </Dialog>
</template>
