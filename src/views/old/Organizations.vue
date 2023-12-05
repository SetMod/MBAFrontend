<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import useUsers from "../hooks/useUsers";
import useOrganizations from "../hooks/useOrganizations";
import Organizations from "../models/OrganizationsModel";
import OrganizationMembers, { OrganizationRoles } from "../models/OrganizationMembersModel";
import OrganizationsDataTable from "../components/Organizations/OrganizationsDataTable.vue";
import OrganizationToolbar from "../components/Organizations/OrganizationToolbar.vue";
import OrganizationLeaveDialog from "../components/Organizations/OrganizationLeaveDialog.vue"
import OrganizationDeleteDialog from "../components/Organizations/OrganizationDeleteDialog.vue";
import OrganizationCreateDialog from "../components/Organizations/OrganizationCreateDialog.vue";
import OrganizationEditDialog from "../components/Organizations/OrganizationEditDialog.vue";
import UserOrganizationsDataTable from "../components/Organizations/UserOrganizationsDataTable.vue"

onMounted(() => {
    // if (props.organizationMembers && isLoggedIn && user.value) getOrganizationMembers(user.value.id)
    getOrganizations()
})

const toast = useToast()
const { user, isUsersLoading } = useUsers()
const {
    organization,
    organizations,
    isOrganizationsLoading,
    getOrganizations,
    createOrganization,
    deleteOrganization,
    updateOrganization,
} = useOrganizations();

const displayOrgsCreate = ref(false)
const displayOrgsEdit = ref(false)
const displayOrgsDelete = ref(false)
const displayOrgsLeave = ref(false)

// const organizations = ref(props.organizationMembers ? organizationMembers : organizations)
const selectedOrganization = ref<Organizations>()
const refreshOrgsTable = () => {
    getOrganizations()
}
const closeOrgsDialog = () => {
    displayOrgsCreate.value = false
    displayOrgsEdit.value = false
    displayOrgsLeave.value = false
    displayOrgsDelete.value = false
    selectedOrganization.value = undefined
}
const openOrgsCreate = () => {
    displayOrgsCreate.value = true
}
const openOrgsEdit = (organization: Organizations) => {
    displayOrgsEdit.value = true
    selectedOrganization.value = organization
}
const openOrgsLeave = (organization: Organizations) => {
    displayOrgsLeave.value = true
    selectedOrganization.value = organization
};
const openOrgsDelete = (organization: Organizations) => {
    displayOrgsDelete.value = true
    selectedOrganization.value = organization
};
const selectOrganization = (selectedOrganization: Organizations) => {
    organization.value = selectedOrganization
}
const submitOrgsCreate = async (newOrganization: Organizations) => {
    if (!user.value) return toast.add({ severity: 'error', summary: 'Fail', detail: 'User not specified', life: 3000 });

    const response = await createOrganization(newOrganization)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Create', detail: response, life: 3000 });
    toast.add({ severity: 'success', summary: 'Created', detail: 'Organization created', life: 1500 });

    closeOrgsDialog()
    refreshOrgsTable()
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
const submitOrgsDelete = async () => {
    if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to delete', life: 3000 })
    if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to delete', life: 3000 })

    const response = await deleteOrganization(selectedOrganization.value.id)
    if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
    toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted', life: 1500 })

    closeOrgsDialog()
    refreshOrgsTable()
}
</script>


<template>
    <Toast />
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
</template>


<style></style>