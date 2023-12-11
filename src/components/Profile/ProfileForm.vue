<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import useUsers, { useUserEditValidate } from "../../hooks/useUsers";
import Users from "../../models/UsersModel";

const { currentUser, usersError, updateUser } = useUsers()
const { userEditValidate, userEditState } = useUserEditValidate()

const toast = useToast()
const edit = ref(false)
const displayEdit = ref(false)

const submitEdit = async () => {
    if (userEditValidate.value.$invalid) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 });
        return
    }
    if (!currentUser.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Login', life: 3000 });
        return
    }

    edit.value = false;
    displayEdit.value = false

    const updatedUser = new Users()
    updatedUser.id = userEditState.id || currentUser.value.id
    updatedUser.firstName = userEditState.firstName || currentUser.value.firstName
    updatedUser.secondName = userEditState.secondName || currentUser.value.secondName
    updatedUser.email = userEditState.email || currentUser.value.email
    updatedUser.username = userEditState.username || currentUser.value.username
    // updatedUser.password = state.password || user.value.password
    updatedUser.phone = userEditState.phone || currentUser.value.phone
    updatedUser.role = userEditState.role || currentUser.value.role

    const res = await updateUser(updatedUser.id, updatedUser)
    if (res) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Profile Updated', life: 3000 });
    } else if (usersError instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed', detail: usersError.message, life: 3000 });
    }
}
</script>

<template>
    <Toast />
    <Dialog v-model:visible="displayEdit" header="Confirmation" :style="{ width: '350px' }" :modal="true">
        <div class="confirmation-content flex align-content-center justify-content-between">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to update profile?</span>
        </div>
        <template #footer>
            <Button label="Confirm" icon="pi pi-times" severity="success" autofocus @click="() => displayEdit = false" />
            <Button label="Cancel" icon="pi pi-check" severity="warning" @click="submitEdit" />
        </template>
    </Dialog>

    <div class="p-card p-4 mx-3 w-29rem">
        <h3 class="p-card-title">Profile</h3>

        <div class="p-fluid text-left">
            <div class="field">
                <label>First name:</label>
                <InputText v-model="userEditValidate.firstName.$model" :disabled="!edit"
                    :class="{ 'p-invalid': userEditValidate.firstName.$invalid && edit }" placeholder="first name" />
                <small v-if="(userEditValidate.firstName.$invalid && edit) || userEditValidate.firstName.$pending"
                    class="p-error">{{
                        userEditValidate.firstName.required.$message.replace('Value', 'First name')
                    }}</small>
            </div>

            <div class="field">
                <label>Second name:</label>
                <InputText v-model="userEditValidate.secondName.$model" :disabled="!edit"
                    :class="{ 'p-invalid': userEditValidate.secondName.$invalid && edit }" placeholder="second name" />
                <small v-if="(userEditValidate.secondName.$invalid && edit) || userEditValidate.secondName.$pending"
                    class="p-error">{{
                        userEditValidate.secondName.required.$message.replace('Value', 'Second name')
                    }}</small>
            </div>

            <div class="field">
                <label>E-mail:</label>
                <InputText v-model="userEditValidate.email.$model" :disabled="!edit"
                    :class="{ 'p-invalid': userEditValidate.email.$invalid && edit }" placeholder="email@example.com"
                    type="email" />
                <span v-if="userEditValidate.email.$error && edit">
                    <span v-for="(error, index) of userEditValidate.email.$errors" id="email-error" :key="index">
                        <small class="p-error">{{ error.$message }}</small>
                    </span>
                </span>
                <small v-else-if="(userEditValidate.email.$invalid && edit) || userEditValidate.email.$pending"
                    class="p-error">{{
                        userEditValidate.email.required.$message.replace('Value', 'E-mail')
                    }}</small>
            </div>

            <div class="field">
                <label>Phone number:</label>
                <InputMask v-model="userEditValidate.phone.$model" :disabled="!edit" mask="+99 (999) 999-9999"
                    placeholder="+ 99 (999) 999-9999" />
                <small v-if="(userEditValidate.phone.required.$invalid && edit) || userEditValidate.phone.$pending"
                    class="p-error">{{
                        userEditValidate.phone.required.$message.replace('Value', 'Phone number')
                    }}</small>
                <small v-else-if="userEditValidate.phone.minLength.$invalid && edit" class="p-error">{{
                    userEditValidate.phone.minLength.$message.replace('Value', 'Phone number')
                }}</small>
                <small v-else-if="userEditValidate.phone.maxLength.$invalid && edit" class="p-error">{{
                    userEditValidate.phone.maxLength.$message.replace('Value', 'Phone number')
                }}</small>
            </div>

            <div class="field">
                <label>Username:</label>
                <InputText v-model="userEditValidate.username.$model" :disabled="!edit"
                    :class="{ 'p-invalid': userEditValidate.username.$invalid && edit }" placeholder="username" />
                <small v-if="userEditValidate.username.required.$invalid && edit" class="p-error">{{
                    userEditValidate.username.required.$message.replace('Value', 'Username')
                }}</small>
                <small v-else-if="userEditValidate.username.minLength.$invalid && edit" class="p-error">{{
                    userEditValidate.username.minLength.$message.replace('This field', 'Username')
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
                <InputText v-model="userEditState.role" :disabled="true" placeholder="No role" />
            </div>
        </div>

        <div class="p-card-footer">
            <Button v-if="!edit" label="Edit" severity="help" @click="() => edit = true" />
            <div v-else class="flex justify-content-around align-items-center">
                <Button label="Cancel" @click="() => edit = false" />
                <Button label="Save" severity="warning" @click="() => displayEdit = true" />
            </div>
        </div>
    </div>
</template>
