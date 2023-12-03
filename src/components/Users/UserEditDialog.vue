<script setup lang="ts">
import { computed, ref } from "vue"
import Users, { Roles } from "../../models/UsersModel"

const props = defineProps({
    display: {
        type: Boolean,
        required: true
    },
    user: {
        type: Users,
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
})
const selectedRole = ref<Roles>()
const user = computed(() => {
    return props.user
})
const visible = computed(() => {
    return props.display
})
</script>

<template>
    <Dialog v-model:visible="visible" header="Edit User" :modal="true" class="p-fluid w-29rem">
        <div class="p-fluid text-left">
            <div class="field">
                <label for="firstName">First name:</label>
                <InputText v-model="user.firstName" placeholder="first name" />
            </div>

            <div class="field">
                <label for="secondName">Second name:</label>
                <InputText v-model="user.secondName" placeholder="second name" />
            </div>

            <div class="field">
                <label for="email">E-mail:</label>
                <InputText v-model="user.email" placeholder="email@example.com" type="email" />
            </div>

            <div class="field">
                <label for="username">Username:</label>
                <InputText v-model="user.username" placeholder="username" />
            </div>

            <!-- <div class="field">
                <label for="password">Password:</label>
                <Password v-model="user.password" placeholder="password" toggle-mask :feedback="false" />
            </div> -->

            <div class="field">
                <label for="phone">Phone number:</label>
                <InputText v-model="user.phone" placeholder="+38012345678" type="tel" />
            </div>

            <div class="field">
                <label for="role">Role:</label>
                <!-- <InputText v-model="selectedUser.role" placeholder="User" /> -->
                <Dropdown v-model="selectedRole" :options="Object.keys(Roles)" option-label="role"
                    placeholder="Select a role" :filter="true" filter-placeholder="Find Role" />
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="() => props.closeDialog()" />
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="() => props.submitDialog(selectedRole)" />
        </template>
    </Dialog>
</template>
