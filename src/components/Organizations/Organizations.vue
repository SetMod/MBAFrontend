<template>
    <Toast />
    <OrganizationCreateDialogVue :display="displayCreate" :close-dialog="closeDialog" :submit-dialog="submitCreate" />
    <OrganizationEditDialogVue v-if="selectedOrganization" :display="displayEdit" :organization="selectedOrganization"
        :close-dialog="closeDialog" :submit-dialog="submitEdit" />
    <OrganizationLeaveDialogVue :display="displayLeave" :close-dialog="closeDialog" :submit-dialog="submitLeave" />
    <OrganizationDeleteDialogVue :display="displayDelete" :close-dialog="closeDialog" :submit-dialog="submitDelete" />
    <OrganizationToolbarVue :open-create="openCreate" :submit-join="submitJoin" :refresh-table="refreshTable" />

    <div v-if="isOrganizationsLoading" class="mt-7">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div v-else-if="!organizations" class="flex justify-content-center align-items-center">
        <Message severity="info" class="mr-3">Organizations not found</Message>
        <Button label="Refresh" icon="pi pi-refresh" class="h-2rem" @click="refreshTable" />
    </div>
    <div v-else>
        <UserOrganizationsDataTableVue v-if="userOrganizations" :organizations="organizations" :open-leave="openLeave"
            :select-organization="selectOrganization" :refresh-table="refreshTable" />
        <OrganizationsDataTableVue v-else :organizations="organizations" :open-edit="openEdit" :open-delete="openDelete"
            :refresh-table="refreshTable" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import useUsers from "../../hooks/useUsers";
import useOrganizations from "../../hooks/useOrganizations";
import useOrganizationRoles from "../../hooks/useOrganizationRoles";
import Organizations from "../../models/OrganizationsModel";
import OrganizationMembers from "../../models/OrganizationMembersModel";
import OrganizationsDataTableVue from "./OrganizationsDataTable.vue";
import OrganizationToolbarVue from "./OrganizationToolbar.vue";
import OrganizationLeaveDialogVue from "./OrganizationLeaveDialog.vue"
import OrganizationDeleteDialogVue from "./OrganizationDeleteDialog.vue";
import OrganizationCreateDialogVue from "./OrganizationCreateDialog.vue";
import OrganizationEditDialogVue from "./OrganizationEditDialog.vue";
import UserOrganizationsDataTableVue from "./UserOrganizationsDataTable.vue"
export default defineComponent({
    components: {
        OrganizationsDataTableVue,
        OrganizationCreateDialogVue,
        OrganizationEditDialogVue,
        OrganizationLeaveDialogVue,
        OrganizationDeleteDialogVue,
        OrganizationToolbarVue,
        UserOrganizationsDataTableVue,
    },
    props: {
        userOrganizations: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        onMounted(() => {
            if (props.userOrganizations && isLoggedIn && user.value) getUserOrganizations(user.value.userId)
            getOrganizations()
            getOrganizationsRoles()
        })
        const toast = useToast()
        const { user, isLoggedIn } = useUsers()
        const {
            organization,
            organizations: allOrganizations,
            userOrganizations,
            isOrganizationsLoading,
            getUserOrganizations,
            getOrganizations,
            createOrganization,
            deleteOrganization,
            updateOrganization,
            addUserToOrganization,
            deleteUserFromOrganization,
        } = useOrganizations();
        const { organizationRoles, getOrganizationsRoles } = useOrganizationRoles();

        const displayCreate = ref(false)
        const displayEdit = ref(false)
        const displayDelete = ref(false)
        const displayLeave = ref(false)

        const organizations = ref(props.userOrganizations ? userOrganizations : allOrganizations)
        const selectedOrganization = ref<Organizations>()
        const refreshTable = () => {
            if (isLoggedIn && user.value) getUserOrganizations(user.value.userId)
            getOrganizations()
            getOrganizationsRoles()
        }
        const closeDialog = () => {
            displayCreate.value = false
            displayEdit.value = false
            displayLeave.value = false
            displayDelete.value = false
            selectedOrganization.value = undefined
        }
        const openCreate = () => {
            displayCreate.value = true
        }
        const openEdit = (organization: Organizations) => {
            displayEdit.value = true
            selectedOrganization.value = organization
        }
        const openLeave = (organization: Organizations) => {
            displayLeave.value = true
            selectedOrganization.value = organization
        };
        const openDelete = (organization: Organizations) => {
            displayDelete.value = true
            selectedOrganization.value = organization
        };
        const selectOrganization = (selectedOrganization: Organizations) => {
            organization.value = selectedOrganization
        }
        const submitCreate = async (newOrganization: Organizations) => {
            if (!user.value) return toast.add({ severity: 'error', summary: 'Fail', detail: 'User not specified', life: 3000 });

            const response = await createOrganization(newOrganization, user.value.userId)
            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Create', detail: response, life: 3000 });
            toast.add({ severity: 'success', summary: 'Created', detail: 'Organization created', life: 1500 });

            closeDialog()
            refreshTable()
        }
        const submitEdit = async (invalid: boolean) => {
            if (invalid) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Validate all fields', life: 3000 })
            if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select an organization to edit', life: 3000 })

            const response = await updateOrganization(selectedOrganization.value)
            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
            toast.add({ severity: 'success', summary: 'Success', detail: 'Organization updated', life: 1500 })

            closeDialog()
            refreshTable()
        }
        const submitJoin = async (selectedOrganization: Organizations) => {
            if (!user.value || !selectedOrganization) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization', life: 1500 })

            const userOrganization = new OrganizationMembers()
            userOrganization.userId = user.value.userId
            userOrganization.organizationId = selectedOrganization.organizationId
            userOrganization.organizationRoleId = 1
            const response = await addUserToOrganization(userOrganization)
            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Join', detail: response, life: 1500 })
            toast.add({ severity: 'success', summary: 'Successfully Joined', detail: 'Successfully joined to organization', life: 1500 })

            await getUserOrganizations(user.value.userId)
        }
        const submitLeave = async () => {
            if (!user.value) return
            if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to leave', life: 3000 })

            const userOrganization = new OrganizationMembers()
            userOrganization.userId = user.value.userId
            userOrganization.organizationId = selectedOrganization.value.organizationId
            userOrganization.organizationRoleId = 1

            const response = await deleteUserFromOrganization(userOrganization)
            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
            toast.add({ severity: 'success', summary: 'Success', detail: 'Exited from organization', life: 1500 })

            closeDialog()
            refreshTable()
        }
        const submitDelete = async () => {
            if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to delete', life: 3000 })
            if (!selectedOrganization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to delete', life: 3000 })

            const response = await deleteOrganization(selectedOrganization.value.organizationId)
            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 })
            toast.add({ severity: 'success', summary: 'Success', detail: 'User deleted', life: 1500 })

            closeDialog()
            refreshTable()
        }
        return {
            props,
            displayDelete,
            isOrganizationsLoading,
            allOrganizations,
            organization,
            displayEdit,
            organizations,
            organizationRoles,
            selectedOrganization,
            displayCreate,
            displayLeave,
            openCreate,
            openEdit,
            submitEdit,
            selectOrganization,
            submitJoin,
            submitCreate,
            submitDelete,
            openDelete,
            openLeave,
            closeDialog,
            submitLeave,
            refreshTable,
        };
    },
});
</script>

<style></style>