
<script setup lang="ts">
import { onMounted, ref, defineComponent } from "vue"
import Users, { Roles } from "../../models/UsersModel"

const props = defineComponent({
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
// onMounted(() => {
// })
const selectedRole = ref<Roles>()
</script>

<template>
    <Dialog v-model:visible="props.display" header="Organization" :modal="true" class="p-fluid w-29rem">
        <div class="p-fluid text-left">
            <div class="field">
                <label for="firstName">First name:</label>
                <InputText v-model="props.user.userFirstName" placeholder="first name" />
            </div>

            <div class="field">
                <label for="secondName">Second name:</label>
                <InputText v-model="props.user.userSecondName" placeholder="second name" />
            </div>

            <div class="field">
                <label for="email">E-mail:</label>
                <InputText v-model="props.user.userEmail" placeholder="email@example.com" type="email" />
            </div>

            <div class="field">
                <label for="username">Username:</label>
                <InputText v-model="props.user.userUsername" placeholder="username" />
            </div>

            <div class="field">
                <label for="password">Password:</label>
                <Password v-model="props.user.userPassword" placeholder="password" toggle-mask :feedback="false" />
            </div>

            <div class="field">
                <label for="phone">Phone number:</label>
                <InputText v-model="props.user.userPhone" placeholder="+38012345678" type="tel" />
            </div>

            <div class="field">
                <label for="role">Role:</label>
                <!-- <InputText v-model="selectedUser.roleName" placeholder="User" /> -->
                <Dropdown v-model="selectedRole" :options="roles" option-label="roleName" placeholder="Select a role"
                    :filter="true" filter-placeholder="Find Role" :loading="isRolesLoading" />
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="() => props.closeDialog()" />
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="() => props.submitDialog(selectedRole)" />
        </template>
    </Dialog>
</template>


<style></style>