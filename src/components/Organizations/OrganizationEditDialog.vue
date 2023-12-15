<script setup lang="ts">
import { useOrgEditValidate } from "../../hooks/useOrganizations"
import Organizations from "../../models/OrganizationsModel";

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    organization: {
        type: Organizations,
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

const { orgEditValidate } = useOrgEditValidate(props.organization)
</script>

<template>
    <Dialog header="Organization" class="p-fluid w-29rem" :modal="true" :visible="props.show" @update:visible="closeDialog">
        <div class="field">
            <label for="name">Name</label>
            <InputText id="name" v-model.trim="orgEditValidate.name.$model" required="true" autofocus
                :class="{ 'p-invalid': orgEditValidate.name.$invalid }" />
            <small v-if="orgEditValidate.name.required.$invalid" class="p-error">Name is required.</small>
            <small v-else-if="orgEditValidate.name.minLength.$invalid" class="p-error">Name is to
                short.</small>
            <small v-else-if="orgEditValidate.name.maxLength.$invalid" class="p-error">Name is to
                long.</small>
        </div>
        <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="orgEditValidate.description.$model" required="true" rows="3" cols="20"
                :class="{ 'p-invalid': orgEditValidate.description.$invalid }" />
            <small v-if="orgEditValidate.description.required.$invalid" class="p-error">Description is
                required.</small>
            <small v-else-if="orgEditValidate.description.minLength.$invalid" class="p-error">Description is
                to
                short.</small>
            <small v-else-if="orgEditValidate.description.maxLength.$invalid" class="p-error">Description is
                to
                long.</small>
        </div>
        <div class="field">
            <label for="name">Email</label>
            <InputText id="name" v-model.trim="orgEditValidate.email.$model" required="true" autofocus
                :class="{ 'p-invalid': orgEditValidate.email.$invalid }" />
            <small v-if="orgEditValidate.email.required.$invalid" class="p-error">Email is required.</small>
            <small v-else-if="orgEditValidate.email.email.$invalid" class="p-error">Email is
                invalid.</small>
            <small v-else-if="orgEditValidate.email.maxLength.$invalid" class="p-error">Email is to
                long.</small>
        </div>
        <div class="field">
            <label for="name">Phone</label>
            <InputMask v-model="orgEditValidate.phone.$model" mask="+99 (999) 999-9999" placeholder="+ 99 (999) 999-9999"
                :class="{ 'p-invalid': orgEditValidate.phone.$invalid }" />
            <!-- <InputText id="name" v-model.trim="v$.phone.$model" autofocus
                :class="{ 'p-invalid': v$.phone.$invalid }" /> -->
            <small v-if="orgEditValidate.phone.minLength.$invalid" class="p-error">Phone number is to
                short.</small>
            <small v-else-if="orgEditValidate.phone.maxLength.$invalid" class="p-error">Phone number is to
                long.</small>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
            <Button label="Update" icon="pi pi-check" severity="success" :disabled="orgEditValidate.$invalid"
                @click="submitDialog" />
        </template>
    </Dialog>
</template>
