<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, maxLength, minLength, required } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";
import { reactive, ref } from "vue";
import useUsers from "../../hooks/useUsers";
import Users from "../../models/UsersModel";

const { user, updateUser } = useUsers()
const toast = useToast()
const edit = ref(false)
const displayEdit = ref(false)
const state = reactive({
    id: user.value?.id,
    firstName: user.value?.firstName,
    secondName: user.value?.secondName,
    email: user.value?.email,
    username: user.value?.username,
    // password: user.value?.password,
    phone: user.value?.phone,
    role: user.value?.role,
})
const rules = {
    firstName: { required },
    secondName: { required },
    email: { required, email },
    username: { required, minLength: minLength(3) },
    // password: { required, minLength: minLength(6) },
    phone: { required, minLength: minLength(18), maxLength: maxLength(18) },
}
const v$ = useVuelidate(rules, state)

const updateProfile = () => {
    edit.value = true
}
const submitCancel = () => {
    edit.value = false
}
const openEdit = () => {
    displayEdit.value = true
}
const closeDialog = () => {
    displayEdit.value = false
}
const submitEdit = async () => {
    if (v$.value.$invalid) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 });
    if (!user.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Login', life: 3000 });

    const updatedUser = new Users()
    updatedUser.id = state.id || user.value.id
    updatedUser.firstName = state.firstName || user.value.firstName
    updatedUser.secondName = state.secondName || user.value.secondName
    updatedUser.email = state.email || user.value.email
    updatedUser.username = state.username || user.value.username
    // updatedUser.password = state.password || user.value.password
    updatedUser.phone = state.phone || user.value.phone
    updatedUser.role = state.role || user.value.role

    const response = await updateUser(updatedUser)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed', detail: response, life: 3000 });
    toast.add({ severity: 'success', summary: 'Success', detail: 'Profile Updated', life: 3000 });

    edit.value = false;
    closeDialog()
}
</script>

<template>
    <!-- <div v-if="user" class="p-card p-4 mx-3 w-29rem"> -->
    <div class="p-card p-4 mx-3 w-29rem">
        <h3 class="p-card-title">Profile</h3>

        <div class="p-fluid text-left">
            <div class="field">
                <label>First name:</label>
                <InputText v-model="v$.firstName.$model" :disabled="!edit"
                    :class="{ 'p-invalid': v$.firstName.$invalid && edit }" placeholder="first name" />
                <small v-if="(v$.firstName.$invalid && edit) || v$.firstName.$pending" class="p-error">{{
                    v$.firstName.required.$message.replace('Value', 'First name')
                }}</small>
            </div>

            <div class="field">
                <label>Second name:</label>
                <InputText v-model="v$.secondName.$model" :disabled="!edit"
                    :class="{ 'p-invalid': v$.secondName.$invalid && edit }" placeholder="second name" />
                <small v-if="(v$.secondName.$invalid && edit) || v$.secondName.$pending" class="p-error">{{
                    v$.secondName.required.$message.replace('Value', 'Second name')
                }}</small>
            </div>

            <div class="field">
                <label>E-mail:</label>
                <InputText v-model="v$.email.$model" :disabled="!edit" :class="{ 'p-invalid': v$.email.$invalid && edit }"
                    placeholder="email@example.com" type="email" />
                <span v-if="v$.email.$error && edit">
                    <span v-for="(error, index) of v$.email.$errors" id="email-error" :key="index">
                        <small class="p-error">{{ error.$message }}</small>
                    </span>
                </span>
                <small v-else-if="(v$.email.$invalid && edit) || v$.email.$pending" class="p-error">{{
                    v$.email.required.$message.replace('Value', 'E-mail')
                }}</small>
            </div>

            <div class="field">
                <label>Phone number:</label>
                <InputMask v-model="v$.phone.$model" :disabled="!edit" mask="+99 (999) 999-9999"
                    placeholder="+ 99 (999) 999-9999" />
                <small v-if="(v$.phone.required.$invalid && edit) || v$.phone.$pending" class="p-error">{{
                    v$.phone.required.$message.replace('Value', 'Phone number')
                }}</small>
                <small v-else-if="v$.phone.minLength.$invalid && edit" class="p-error">{{
                    v$.phone.minLength.$message.replace('Value', 'Phone number')
                }}</small>
                <small v-else-if="v$.phone.maxLength.$invalid && edit" class="p-error">{{
                    v$.phone.maxLength.$message.replace('Value', 'Phone number')
                }}</small>
            </div>

            <div class="field">
                <label>Username:</label>
                <InputText v-model="v$.username.$model" :disabled="!edit"
                    :class="{ 'p-invalid': v$.username.$invalid && edit }" placeholder="username" />
                <small v-if="v$.username.required.$invalid && edit" class="p-error">{{
                    v$.username.required.$message.replace('Value', 'Username')
                }}</small>
                <small v-else-if="v$.username.minLength.$invalid && edit" class="p-error">{{
                    v$.username.minLength.$message.replace('This field', 'Username')
                }}</small>
            </div>

            <!-- <div class="field">
                <label>Password:</label>
                <Password v-model="v$.password.$model" :disabled="!edit"
                    :class="{ 'p-invalid': v$.password.$invalid && edit }" placeholder="password" toggle-mask
                    :feedback="edit" />
                <small v-if="(v$.password.required.$invalid && edit) || v$.password.$pending" class="p-error">{{
                    v$.password.required.$message.replace('Value', 'Password')
                }}</small>
            </div> -->

            <div class="field">
                <label>Role:</label>
                <InputText v-model="state.role" :disabled="true" placeholder="No role" />
            </div>
        </div>

        <div class="p-card-footer">
            <Button v-if="!edit" label="Edit" class="p-button-help" @click="updateProfile" />
            <div v-else class="flex justify-content-around align-items-center">
                <Button label="Cancel" class="p-button-info" @click="submitCancel" />
                <Button label="Save" class="p-button-warning" @click="openEdit" />
            </div>
        </div>
    </div>

    <Dialog v-model:visible="displayEdit" header="Confirmation" :style="{ width: '350px' }" :modal="true">
        <div class="confirmation-content flex align-content-center justify-content-between">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to update profile?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button p-button-success" autofocus @click="closeDialog" />
            <Button label="Yes" icon="pi pi-check" class="p-button p-button-warning" @click="submitEdit" />
        </template>
    </Dialog>
</template>
