<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Organizations from '../../../models/OrganizationsModel';
import useOrganizations from '../../../hooks/useOrganizations';
import useMembers from '../../../hooks/useMembers';
import useUsers from '../../../hooks/useUsers';
import OrganizationMembers, { OrganizationRoles } from '../../../models/OrganizationMembersModel';
import OrganizationCreateDialog from '../components/OrganizationCreateDialog.vue';
import OrganizationEditDialog from '../components/OrganizationEditDialog.vue';
import OrganizationDeleteDialog from '../components/OrganizationDeleteDialog.vue';
import OrganizationLeaveDialog from '../components/OrganizationLeaveDialog.vue';
import OrganizationToolbar from '../components/OrganizationToolbar.vue';
import OrganizationsDataTable from '../components/OrganizationsDataTable.vue';

const props = defineProps({
    userId: {
        type: String,
        required: false,
        default: ''
    },
})

onMounted(async () => {
    await refreshOrgsTable(props.userId)
})

const toast = useToast()
const { currentUser, } = useUsers()
const {
    isOrganizationsLoading,
    organizationsError,
    organizations,
    userOrganizations,
    selectedOrganization: globallySelectedOrganization,
    getUserOrganizations,
    // selectedOrganization,
    getOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization,
} = useOrganizations()
const {
    membersError,
    createMember,
    getMemberByOrgAndUserIDs,
    deleteMember
} = useMembers()
const showOrgsCreate = ref(false)
const showOrgsEdit = ref(false)
const showOrgsDelete = ref(false)
const showOrgsLeave = ref(false)
const selectedOrganization = ref<Organizations | null>(null)

const refreshOrgsTable = async (userId: string) => {
    if (userId) {
        globallySelectedOrganization.value = null
        await getUserOrganizations(Number(userId))
        if (organizationsError.value instanceof Error) {
            toast.add({ severity: 'error', summary: 'Failed to refresh table', detail: organizationsError.value.message, life: 3000 })
        }
    } else {
        await getOrganizations()
        if (organizationsError.value instanceof Error) {
            toast.add({ severity: 'error', summary: 'Failed to refresh table', detail: organizationsError.value.message, life: 3000 })
        }
    }
}

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
const openOrgsJoin = (organization: Organizations) => {
    showOrgsLeave.value = true
    selectedOrganization.value = organization
};

const submitOrgsCreate = async (newOrganization: Organizations) => {
    if (!newOrganization) {
        toast.add({ severity: 'error', summary: 'Fail', detail: 'Select organization', life: 3000 });
        return
    } else if (!currentUser.value) {
        toast.add({ severity: 'error', summary: 'Fail', detail: 'Select user', life: 3000 });
        return
    }

    const organization = await createOrganization(newOrganization)
    if (organizationsError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to create', detail: organizationsError.value.message, life: 3000 })
        return
    }
    if (!organization) {
        toast.add({ severity: 'error', summary: 'Failed to create', detail: 'Failed to get new organization', life: 3000 })
        return
    }

    const newMember = new OrganizationMembers(
        0,
        currentUser.value.id,
        organization.id,
        true,
        OrganizationRoles.OWNER
    )

    await createMember(newMember)
    if (membersError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to create', detail: membersError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Created', detail: 'Organization created', life: 1500 });
        await refreshOrgsTable(props.userId)
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
        await refreshOrgsTable(props.userId)
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
        await refreshOrgsTable(props.userId)
    }
}

// Add to organization settings
const submitOrgsLeave = async () => {
    if (!selectedOrganization.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to leave', life: 3000 })
        return
    } else if (!currentUser.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to leave', life: 3000 })
        return
    }

    const member = await getMemberByOrgAndUserIDs(selectedOrganization.value.id, currentUser.value.id)
    if (!member || member instanceof Array) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to leave', life: 3000 })
        return
    }

    await deleteMember(member.id)

    if (organizationsError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to leave organization', detail: organizationsError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Deleted', detail: 'Organization deleted', life: 1500 });
    }
}
const submitOrgsJoin = async () => {
    if (!selectedOrganization.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to join', life: 3000 })
        return
    } else if (!currentUser.value) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization to join', life: 3000 })
        return
    }

    const member = new OrganizationMembers(
        0,
        currentUser.value.id,
        selectedOrganization.value.id,
    )

    await createMember(member)

    if (membersError.value instanceof Error) {
        toast.add({ severity: 'error', summary: 'Failed to leave organization', detail: membersError.value.message, life: 3000 })
    } else {
        toast.add({ severity: 'success', summary: 'Deleted', detail: `Organization joined ${selectedOrganization.value.name} organization`, life: 1500 });
    }
}
</script>

<template>
    <Toast />
    <h1>
        Organizations
    </h1>
    <OrganizationCreateDialog v-model:show="showOrgsCreate" @submit-dialog="submitOrgsCreate" />
    <OrganizationEditDialog v-if="selectedOrganization" v-model:show="showOrgsEdit" :organization="selectedOrganization"
        @submit-dialog="submitOrgsEdit" />
    <OrganizationDeleteDialog v-model:show="showOrgsDelete" @submit-dialog="submitOrgsDelete" />
    <OrganizationLeaveDialog v-model:show="showOrgsLeave" @submit-dialog="submitOrgsLeave" />
    <div v-if="userOrganizations.length">
        <OrganizationToolbar v-model:show-new-dialog="showOrgsCreate" v-model:selected-organization="selectedOrganization"
            :organizations="userOrganizations" :is-loading="isOrganizationsLoading" @submit-join="submitOrgsJoin" />
        <OrganizationsDataTable :organizations="userOrganizations" :is-loading="isOrganizationsLoading"
            @refresh-table="() => refreshOrgsTable(props.userId)" @open-edit="openOrgsEdit" @open-delete="openOrgsDelete" />
    </div>
    <div v-else-if="organizations.length">
        <OrganizationToolbar v-model:show-new-dialog="showOrgsCreate" v-model:selected-organization="selectedOrganization"
            :organizations="organizations" :is-loading="isOrganizationsLoading" />
        <OrganizationsDataTable :organizations="organizations" :is-loading="isOrganizationsLoading"
            @refresh-table="() => refreshOrgsTable(props.userId)" @open-edit="openOrgsEdit" @open-delete="openOrgsDelete" />
    </div>
</template>
