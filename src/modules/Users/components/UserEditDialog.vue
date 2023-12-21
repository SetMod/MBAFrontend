<script setup lang="ts">
import Users, { roleOptions } from "../../../models/UsersModel"
import useUserEditValidate from "../hooks/useUserEditValidate"

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    user: {
        type: Users,
        required: true
    }
})

const emit = defineEmits({
    'update:show': (value: boolean) => {
        if (typeof value === 'boolean') return true
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
const { userEditValidate } = useUserEditValidate(props.user)
</script>

<template>
    <Dialog header="Edit User" class="p-fluid w-29rem" :modal="true" :visible="props.show" @update:visible="closeDialog">
        <div class="p-fluid text-left">
            <div class="field">
                <label for="firstName">First name:</label>
                <InputText id="firstName" v-model.trim="userEditValidate.firstName.$model" required="true" autofocus
                    :class="{ 'p-invalid': userEditValidate.firstName.$invalid }" />
                <small v-if="userEditValidate.firstName.required.$invalid" class="p-error">First name is required.</small>
            </div>

            <div class="field">
                <label for="secondName">Second name:</label>
                <InputText v-model.trim="userEditValidate.secondName.$model" placeholder="second name"
                    :class="{ 'p-invalid': userEditValidate.secondName.$invalid }" />
                <small v-if="userEditValidate.secondName.required.$invalid" class="p-error">Second name is required.</small>
            </div>

            <div class="field">
                <label for="email">E-mail:</label>
                <InputText v-model.trim="userEditValidate.email.$model" placeholder="email@example.com" type="email"
                    :class="{ 'p-invalid': userEditValidate.email.$invalid }" />
                <small v-if="userEditValidate.email.required.$invalid" class="p-error">Email is required.</small>
                <small v-else-if="userEditValidate.email.email.$invalid" class="p-error">Email is
                    invalid.</small>
            </div>

            <div class="field">
                <label for="username">Username:</label>
                <InputText v-model.trim="userEditValidate.username.$model" placeholder="username"
                    :class="{ 'p-invalid': userEditValidate.username.$invalid }" />
                <small v-if="userEditValidate.username.required.$invalid" class="p-error">Username is required.</small>
                <small v-else-if="userEditValidate.username.minLength.$invalid" class="p-error">Username is to
                    short.</small>
            </div>

            <!-- <div class="field">
                <label for="password">Password:</label>
                <Password v-model.trim="user.password" placeholder="password" toggle-mask :feedback="false" />
            </div> -->

            <div class="field">
                <label for="phone">Phone number:</label>
                <InputText v-model.trim="userEditValidate.phone.$model" placeholder="+38012345678" type="tel"
                    :class="{ 'p-invalid': userEditValidate.phone.$invalid }" />
                <small v-if="userEditValidate.phone.minLength.$invalid" class="p-error">Phone number is to
                    short.</small>
                <small v-else-if="userEditValidate.phone.maxLength.$invalid" class="p-error">Phone number is to
                    long.</small>
            </div>

            <div class="field">
                <label for="role">Role:</label>
                <Dropdown v-model="userEditValidate.role.$model" :options="roleOptions" option-label="value"
                    option-value="name" placeholder="Select a role" :filter="true" filter-placeholder="Find Role"
                    :class="{ 'p-invalid': userEditValidate.role.$invalid }" />
                <small v-if="userEditValidate.role.required.$invalid" class="p-error">Role is required.</small>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" severity="secondary" @click="closeDialog" />
            <Button label="Update" icon="pi pi-check" severity="success" :disabled="userEditValidate.$invalid"
                @click="submitDialog" />
        </template>
    </Dialog>
</template>
