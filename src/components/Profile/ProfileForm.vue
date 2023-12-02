<template>
    <div v-if="user" class="p-card p-4 mx-3 w-29rem">
        <h3 class="p-card-title">Profile</h3>

        <div class="p-fluid text-left">
            <div class="field">
                <label>First name:</label>
                <InputText v-model="v$.userFirstName.$model" :disabled="!edit"
                    :class="{ 'p-invalid': v$.userFirstName.$invalid && edit }" placeholder="first name" />
                <small v-if="(v$.userFirstName.$invalid && edit) || v$.userFirstName.$pending" class="p-error">{{
                        v$.userFirstName.required.$message.replace('Value', 'First name')
                }}</small>
            </div>

            <div class="field">
                <label>Second name:</label>
                <InputText v-model="v$.userSecondName.$model" :disabled="!edit"
                    :class="{ 'p-invalid': v$.userSecondName.$invalid && edit }" placeholder="second name" />
                <small v-if="(v$.userSecondName.$invalid && edit) || v$.userSecondName.$pending" class="p-error">{{
                        v$.userSecondName.required.$message.replace('Value', 'Second name')
                }}</small>
            </div>

            <div class="field">
                <label>E-mail:</label>
                <InputText v-model="v$.userEmail.$model" :disabled="!edit"
                    :class="{ 'p-invalid': v$.userEmail.$invalid && edit }" placeholder="email@example.com"
                    type="email" />
                <span v-if="v$.userEmail.$error && edit">
                    <span v-for="(error, index) of v$.userEmail.$errors" id="email-error" :key="index">
                        <small class="p-error">{{ error.$message }}</small>
                    </span>
                </span>
                <small v-else-if="(v$.userEmail.$invalid && edit) || v$.userEmail.$pending" class="p-error">{{
                        v$.userEmail.required.$message.replace('Value', 'E-mail')
                }}</small>
            </div>

            <div class="field">
                <label>Phone number:</label>
                <InputMask v-model="v$.userPhone.$model" :disabled="!edit" mask="+99 (999) 999-9999"
                    placeholder="+ 99 (999) 999-9999" />
                <small v-if="(v$.userPhone.required.$invalid && edit) || v$.userPhone.$pending" class="p-error">{{
                        v$.userPhone.required.$message.replace('Value', 'Phone number')
                }}</small>
                <small v-else-if="v$.userPhone.minLength.$invalid && edit" class="p-error">{{
                        v$.userPhone.minLength.$message.replace('Value', 'Phone number')
                }}</small>
                <small v-else-if="v$.userPhone.maxLength.$invalid && edit" class="p-error">{{
                        v$.userPhone.maxLength.$message.replace('Value', 'Phone number')
                }}</small>
            </div>

            <div class="field">
                <label>Username:</label>
                <InputText v-model="v$.userUsername.$model" :disabled="!edit"
                    :class="{ 'p-invalid': v$.userUsername.$invalid && edit }" placeholder="username" />
                <small v-if="v$.userUsername.required.$invalid && edit" class="p-error">{{
                        v$.userUsername.required.$message.replace('Value', 'Username')
                }}</small>
                <small v-else-if="v$.userUsername.minLength.$invalid && edit" class="p-error">{{
                        v$.userUsername.minLength.$message.replace('This field', 'Username')
                }}</small>
            </div>

            <div class="field">
                <label>Password:</label>
                <Password v-model="v$.userPassword.$model" :disabled="!edit"
                    :class="{ 'p-invalid': v$.userPassword.$invalid && edit }" placeholder="password" toggle-mask
                    :feedback="edit" />
                <small v-if="(v$.userPassword.required.$invalid && edit) || v$.userPassword.$pending" class="p-error">{{
                        v$.userPassword.required.$message.replace('Value', 'Password')
                }}</small>
            </div>

            <div class="field">
                <label>Role:</label>
                <InputText v-model="state.roleName" :disabled="true" placeholder="No role" />
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

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, maxLength, minLength, required } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";
import { defineComponent, reactive, ref } from "vue";
import useUsers from "../../hooks/useUsers";
import Users from "../../models/UsersModel";

export default defineComponent({
    setup() {
        const { user, updateUser } = useUsers()
        const toast = useToast()
        const edit = ref(false)
        const displayEdit = ref(false)
        const state = reactive({
            userId: user.value?.userId,
            userFirstName: user.value?.userFirstName,
            userSecondName: user.value?.userSecondName,
            userEmail: user.value?.userEmail,
            userUsername: user.value?.userUsername,
            userPassword: user.value?.userPassword,
            userPhone: user.value?.userPhone,
            roleId: user.value?.roleId,
            roleName: user.value?.roleName,
        })
        const rules = {
            userFirstName: { required },
            userSecondName: { required },
            userEmail: { required, email },
            userUsername: { required, minLength: minLength(3) },
            userPassword: { required, minLength: minLength(6) },
            userPhone: { required, minLength: minLength(18), maxLength: maxLength(18) },
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
            updatedUser.userId = state.userId || user.value.userId
            updatedUser.userFirstName = state.userFirstName || user.value.userFirstName
            updatedUser.userSecondName = state.userSecondName || user.value.userSecondName
            updatedUser.userEmail = state.userEmail || user.value.userEmail
            updatedUser.userUsername = state.userUsername || user.value.userUsername
            updatedUser.userPassword = state.userPassword || user.value.userPassword
            updatedUser.userPhone = state.userPhone || user.value.userPhone
            updatedUser.roleId = state.roleId || user.value.roleId

            const response = await updateUser(updatedUser)
            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed', detail: response, life: 3000 });
            toast.add({ severity: 'success', summary: 'Success', detail: 'Profile Updated', life: 3000 });

            edit.value = false;
            closeDialog()
        }
        return {
            v$,
            edit,
            user,
            state,
            displayEdit,
            openEdit,
            closeDialog,
            submitCancel,
            submitEdit,
            updateProfile,
        }
    }
});
</script>