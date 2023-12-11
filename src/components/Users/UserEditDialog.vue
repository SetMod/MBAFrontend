<script setup lang="ts">
import { ref } from "vue"
import Users, { Roles } from "../../models/UsersModel"
import { useUserEditValidate } from "../../hooks/useUsers"

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
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
const selectedRole = ref<Roles>()
const { } = useUserEditValidate()
</script>

<template>
    <Dialog header="Edit User" class="p-fluid w-29rem" :modal="true" :visible="props.show" @update:visible="closeDialog">
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
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeDialog" />
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="submitDialog" />
        </template>
    </Dialog>
</template>
