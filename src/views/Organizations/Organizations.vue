<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import useOrganizations from '../../hooks/useOrganizations';
import Organizations from '../../models/OrganizationsModel';
import OrganizationCreateDialog from '../../components/Organizations/OrganizationCreateDialog.vue';
import OrganizationEditDialog from '../../components/Organizations/OrganizationEditDialog.vue';
import OrganizationDeleteDialog from '../../components/Organizations/OrganizationDeleteDialog.vue';
import OrganizationLeaveDialog from '../../components/Organizations/OrganizationLeaveDialog.vue';
import OrganizationToolbar from '../../components/Organizations/OrganizationToolbar.vue';
import OrganizationsDataTable from '../../components/Organizations/OrganizationsDataTable.vue';

const props = defineProps({
    userId: {
        type: String,
        required: false,
        default: null
    },
})

onMounted(async () => {
    await refreshOrgsTable(Number(props.userId))
})

const toast = useToast()
const {
    organizationsError,
    userOrganizations,
    organizations,
    selectedOrganization,
    isOrganizationsLoading,
    getUserOrganizations,
    getOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization,
} = useOrganizations()

const showOrgsCreate = ref(false)
const showOrgsEdit = ref(false)
const showOrgsDelete = ref(false)
const showOrgsLeave = ref(false)

const openOrgsEdit = (organization: Organizations) => {
    showOrgsEdit.value = true
    selectedOrganization.value = organization
}
const openOrgsDelete = (organization: Organizations) => {
    showOrgsDelete.value = true
    selectedOrganization.value = organization
};
const openOrgsLeave = (organization: Organizations) => {
    showOrgsLeave.value = true
    selectedOrganization.value = organization
};
const selectOrganization = (organization: Organizations) => {
    selectedOrganization.value = organization
}

const refreshOrgsTable = async (userId: number) => {
    if (userId) {
        await getUserOrganizations(userId)
        // getOrganizationMemberByField("user_id", userId)
        // getMemberByOrgAndUserIDs(1, userId)
    } else {
        await getOrganizations()
    }
}
const submitOrgsCreate = async (newOrganization: Organizations) => {
    if (!newOrganization) {
        toast.add({ severity: 'error', summary: 'Fail', detail: 'Select organization', life: 3000 });
        return
    }

    const res = await createOrganization(newOrganization)

    if (organizationsError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to create', detail: organizationsError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Created', detail: 'Organization created', life: 1500 });
    }
}
// Add to organization settings
const submitOrgsEdit = async () => {
    if (!selectedOrganization.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select an organization to edit', life: 3000 })
        return
    }

    const res = await updateOrganization(selectedOrganization.value.id, selectedOrganization.value)

    if (organizationsError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to update', detail: organizationsError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Updated', detail: 'Organization updated', life: 1500 });
    }
}
// Add to organization settings
const submitOrgsDelete = async () => {
    if (!selectedOrganization.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to delete', life: 3000 })
        return
    }

    const res = await deleteOrganization(selectedOrganization.value.id)

    if (organizationsError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to delete', detail: organizationsError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Deleted', detail: 'Organization deleted', life: 1500 });
    }
}
// Add to organization settings
const submitOrgsLeave = async () => {
    if (!selectedOrganization.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to leave', life: 3000 })
        return
    }

    const member = new OrganizationMembers()
    member.id = user.value.id
    member.id = selectedOrganization.value.id
    member.role = OrganizationRoles.VIEWER

    const res = await deleteUserFromOrganization(member)

    if (organizationsError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to leave organization', detail: organizationsError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Deleted', detail: 'Organization deleted', life: 1500 });
    }
}
</script>

<template>
    <Toast />
    <h1>
        Organizations
    </h1>
    <OrganizationCreateDialog v-model:show="showOrgsCreate" @submit-dialog="submitOrgsCreate" />
    <OrganizationEditDialog v-model:show="showOrgsEdit" @submit-dialog="submitOrgsEdit" />
    <OrganizationDeleteDialog v-model:show="showOrgsDelete" @submit-dialog="submitOrgsDelete" />
    <OrganizationLeaveDialog v-model:show="showOrgsLeave" @submit-dialog="submitOrgsDelete" />
    <div v-if="userOrganizations">
        <OrganizationToolbar v-model:show-new-dialog="showOrgsCreate" :organizations="userOrganizations"
            :is-loading="isOrganizationsLoading" @select-organization="selectOrganization" />
        <OrganizationsDataTable :organizations="userOrganizations" :is-loading="isOrganizationsLoading"
            @refresh-table="() => refreshOrgsTable(Number(props.userId))" @open-edit="openOrgsEdit"
            @open-delete="openOrgsDelete" />
    </div>
    <div v-else-if="organizations">
        <OrganizationToolbar v-model:show-new-dialog="showOrgsCreate" :organizations="organizations"
            :is-loading="isOrganizationsLoading" @select-organization="selectOrganization" />
        <OrganizationsDataTable :organizations="organizations" :is-loading="isOrganizationsLoading"
            @refresh-table="() => refreshOrgsTable(Number(props.userId))" @open-edit="openOrgsEdit"
            @open-delete="openOrgsDelete" />
    </div>
</template>
