<template>
    <div v-if="user" class="p-card p-4 mx-3">
        <h3 class="p-card-title">Profile</h3>

        <div class="p-fluid text-left">
            <div class="field">
                <label for="firstName">First name:</label>
                <InputText v-model="user.userFirstName" :disabled="!edit" placeholder="first name" />
            </div>

            <div class="field">
                <label for="secondName">Second name:</label>
                <InputText v-model="user.userSecondName" :disabled="!edit" placeholder="second name" />
            </div>

            <div class="field">
                <label for="email">E-mail:</label>
                <InputText v-model="user.userEmail" :disabled="!edit" placeholder="email@example.com" type="email" />
            </div>

            <div class="field">
                <label for="username">Username:</label>
                <InputText v-model="user.userUsername" :disabled="!edit" placeholder="username" />
            </div>

            <div class="field">
                <label for="password">Password:</label>
                <Password v-model="user.userPassword" :disabled="!edit" placeholder="password" toggle-mask
                    :feedback="false" />
            </div>

            <div class="field">
                <label for="phone">Phone number:</label>
                <InputText v-model="user.userPhone" :disabled="!edit" placeholder="+38012345678" type="tel" />
            </div>

            <div class="field">
                <label for="role">Role:</label>
                <InputText v-model="user.roleName" :disabled="!edit" placeholder="User" />
            </div>
        </div>

        <div class="p-card-footer flex justify-content-around align-content-center mt-2">
            <Button v-if="!edit" label="Edit" class="p-button-help" @click="updateProfile" />
            <Button v-else label="Save" class="p-button-info" @click="saveChanges" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import useUsers from "../hooks/useUsers";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

export default defineComponent({
    components: {
        Button,
        InputText,
        Password,
    },
    setup() {
        onMounted(async () => {
        })
        const { user } = useUsers()
        const edit = ref(false)
        const updateProfile = () => {
            edit.value = true
        }
        const saveChanges = () => {
            edit.value = false
        }
        return {
            edit,
            user,
            saveChanges,
            updateProfile,
        }
    }
});
</script>