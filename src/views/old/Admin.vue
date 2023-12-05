<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import useUsers from "../hooks/useUsers";
import Users from "../models/UsersModel";
import useOrganizations from "../hooks/useOrganizations";
import Organizations from "../models/OrganizationsModel";
import OrganizationMembers from "../models/OrganizationMembersModel";

import UserDeleteDialog from "../components/Users/UserDeleteDialog.vue";
import UserEditDialog from "../components/Users/UserEditDialog.vue";
import UsersDataTable from "../components/Users/UsersDataTable.vue";
import OrganizationsDataTable from "../components/Organizations/OrganizationsDataTable.vue";
import OrganizationToolbar from "../components/Organizations/OrganizationToolbar.vue";
import OrganizationLeaveDialog from "../components/Organizations/OrganizationLeaveDialog.vue"
import OrganizationDeleteDialog from "../components/Organizations/OrganizationDeleteDialog.vue";
import OrganizationCreateDialog from "../components/Organizations/OrganizationCreateDialog.vue";
import OrganizationEditDialog from "../components/Organizations/OrganizationEditDialog.vue";
import UserOrganizationsDataTable from "../components/Organizations/UserOrganizationsDataTable.vue"


onMounted(() => {
    refreshUsersTable()
    refreshOrgsTable()
})

const {
    user,
    users,
    isUsersLoading,
    usersError,
    deleteUser,
    getUsers,
    updateUser
} = useUsers()

const {
    organization,
    organizations,
    // organizationMembers,

    isOrganizationsLoading,
    // getOrganizationMembers,
    // addUserToOrganization,
    // deleteUserFromOrganization,
    getOrganizations,
    createOrganization,
    deleteOrganization,
    updateOrganization,
} = useOrganizations();

const toast = useToast()
const selectedUser = ref<Users>()
const selectedOrganization = ref<Organizations>()

const selectOrganization = (selectedOrganization: Organizations) => {
    organization.value = selectedOrganization
}

const displayUsersEdit = ref(false)
const displayUsersDelete = ref(false)

const displayOrgsCreate = ref(false)
const displayOrgsEdit = ref(false)
const displayOrgsDelete = ref(false)
const displayOrgsLeave = ref(false)

const refreshUsersTable = () => {
    getUsers()
}
const refreshOrgsTable = () => {
    getOrganizations()
}


const openOrgsCreate = () => {
    displayOrgsCreate.value = true
}
const openUsersEdit = (user: Users) => {
    displayUsersEdit.value = true
    selectedUser.value = user
}
const openOrgsEdit = (organization: Organizations) => {
    displayOrgsEdit.value = true
    selectedOrganization.value = organization
}
const openUsersDelete = (user: Users) => {
    displayUsersDelete.value = true
    selectedUser.value = user
}
const openOrgsDelete = (organization: Organizations) => {
    displayOrgsDelete.value = true
    selectedOrganization.value = organization
};
const openOrgsLeave = (organization: Organizations) => {
    displayOrgsLeave.value = true
    selectedOrganization.value = organization
};
const closeUsersDialog = () => {
    displayUsersEdit.value = false
    displayUsersDelete.value = false
    selectedUser.value = undefined
}
const closeOrgsDialog = () => {
    displayOrgsCreate.value = false
    displayOrgsEdit.value = false
    displayOrgsLeave.value = false
    displayOrgsDelete.value = false
    selectedOrganization.value = undefined
}

const submitOrgsCreate = async (newOrganization: Organizations) => {
    if (!user.value) return toast.add({ severity: 'error', summary: 'Fail', detail: 'User not specified', life: 3000 });

    const response = await createOrganization(newOrganization)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Create', detail: response, life: 3000 });
    toast.add({ severity: 'success', summary: 'Created', detail: 'Organization created', life: 1500 });

    closeOrgsDialog()
    refreshOrgsTable()
}
const submitUsersEdit = async () => {
    if (!selectedUser.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select a user to edit', life: 3000 })

    updateUser(selectedUser.value).then(res => {
        if (usersError.value instanceof Error) {
            toast.add({ severity: 'error', summary: 'Failed', detail: usersError.value.message, life: 3000 });
        } else if (res) {
            toast.add({ severity: 'success', summary: 'Success', detail: 'User updated', life: 1500 })
        }
    })

    closeUsersDialog()
    refreshUsersTable()
}
const submitOrgsEdit = async (invalid: boolean) => {
    if (invalid) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 })
    if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select an organization to edit', life: 3000 })

    const response = await updateOrganization(selectedOrganization.value)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
    toast.add({ severity: 'success', summary: 'Success', detail: 'Organization updated', life: 1500 })

    closeOrgsDialog()
    refreshOrgsTable()
}
const submitUsersDelete = async () => {
    if (!selectedUser.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select user to delete', life: 3000 })

    deleteUser(selectedUser.value.id).then(res => {
        if (usersError.value instanceof Error) {
            toast.add({ severity: 'error', summary: 'Error', detail: usersError.value.message, life: 3000 })
        } else {
            toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted', life: 1500 })
        }
    })

    closeUsersDialog()
    refreshUsersTable()
}
const submitOrgsDelete = async () => {
    if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to delete', life: 3000 })
    if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to delete', life: 3000 })

    const response = await deleteOrganization(selectedOrganization.value.id)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
    toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted', life: 1500 })

    closeOrgsDialog()
    refreshOrgsTable()
}

const submitOrgsJoin = async (selectedOrganization: Organizations) => {
    if (!user.value || !selectedOrganization) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization', life: 1500 })

    const member = new OrganizationMembers()
    member.id = user.value.id
    member.id = selectedOrganization.id
    member.role = OrganizationRoles.VIEWER
    const response = await addUserToOrganization(member)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Join', detail: response, life: 1500 })
    toast.add({ severity: 'success', summary: 'Successfully Joined', detail: 'Successfully joined to organization', life: 1500 })

    await getOrganizationMembers(user.value.id)
}
const submitOrgsLeave = async () => {
    if (!user.value) return
    if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to leave', life: 3000 })

    const member = new OrganizationMembers()
    member.id = user.value.id
    member.id = selectedOrganization.value.id
    member.role = OrganizationRoles.VIEWER

    const response = await deleteUserFromOrganization(member)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
    toast.add({ severity: 'success', summary: 'Success', detail: 'Exited from organization', life: 1500 })

    closeOrgsDialog()
    refreshOrgsTable()
}

</script>

<template>
    <Toast />
    <div>
        <h4 class="m-3 text-left">Admin</h4>
        <hr>
        <div>
            <div v-if="isUsersLoading">
                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            </div>
            <div v-else>
                <UsersDataTable :users="users" :open-edit="openUsersEdit" :open-delete="openUsersDelete"
                    :refresh-table="refreshUsersTable" />
            </div>
            <UserEditDialog v-if="selectedUser" :display="displayUsersEdit" :user="selectedUser"
                :close-dialog="closeUsersDialog" :submit-dialog="submitUsersEdit" />
            <UserDeleteDialog v-if="selectedUser" :display="displayUsersDelete" :user="selectedUser"
                :close-dialog="closeUsersDialog" :submit-dialog="submitUsersDelete" />
        </div>
        <div class="mt-8">
            <div v-if="isOrganizationsLoading">
                <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            </div>
            <div v-else>
                <UserOrganizationsDataTable v-if="organizationMembers" :organizations="organizations"
                    :open-leave="openOrgsLeave" :select-organization="selectOrganization"
                    :refresh-table="refreshOrgsTable" />
                <OrganizationsDataTable v-else :organizations="organizations" :open-edit="openOrgsEdit"
                    :open-delete="openOrgsDelete" :refresh-table="refreshOrgsTable" />
            </div>
            <OrganizationCreateDialog :display="displayOrgsCreate" :close-dialog="closeOrgsDialog"
                :submit-dialog="submitOrgsCreate" />
            <OrganizationEditDialog v-if="selectedOrganization" :display="displayOrgsEdit"
                :organization="selectedOrganization" :close-dialog="closeOrgsDialog" :submit-dialog="submitOrgsEdit" />
            <OrganizationLeaveDialog :display="displayOrgsLeave" :close-dialog="closeOrgsDialog"
                :submit-dialog="submitOrgsLeave" />
            <OrganizationDeleteDialog :display="displayOrgsDelete" :close-dialog="closeOrgsDialog"
                :submit-dialog="submitOrgsDelete" />
            <OrganizationToolbar :open-create="openOrgsCreate" :submit-join="submitOrgsJoin"
                :refresh-table="refreshOrgsTable" />
        </div>
    </div>
</template>
