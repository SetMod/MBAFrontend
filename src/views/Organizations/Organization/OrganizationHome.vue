<script setup lang="ts">
import { onMounted } from 'vue';
import useOrganizationMembers from '../../../hooks/useOrganizationMembers';
import useOrganizations from '../../../hooks/useOrganizations';

const props = defineProps(
    {
        orgId: {
            type: Number,
            required: true
        },
        userId: {
            type: Number,
            required: false,
            default: undefined
        },
    }
)

const { selectedOrganization, isOrganizationsLoading, selectOrganization } = useOrganizations()
const {
    getMemberByOrgAndUserIDs,
    currentMember,
    isOrganizationAdmin,
    isOrganizationOwner,
    isOrganizationMembersLoading
} = useOrganizationMembers()

onMounted(async () => {
    if (props.userId) {
        await getMemberByOrgAndUserIDs(props.orgId, props.userId)
    }
    await selectOrganization(props.orgId)
})

</script>

<template>
    <h1>
        Organization Home
    </h1>
    <div>
        <h2>Member:</h2>
        <div v-if="isOrganizationMembersLoading">
            Loading...
        </div>
        <div v-else-if="currentMember">
            <div>
                Current member Id: {{ currentMember.id }}
            </div>
            <div>
                Current member active: {{ currentMember.active }}
            </div>
            <div>
                Current member role: {{ currentMember.role }}
            </div>
            <div>is Owner: {{ isOrganizationOwner }}</div>
            <div>is Admin: {{ isOrganizationAdmin }}</div>
        </div>
    </div>
    <div>
        <h2>Organization:</h2>
        <div v-if="isOrganizationsLoading">
            Loading...
        </div>
        <div v-else>
            <div v-if="selectedOrganization">
                <div>
                    Id: {{ selectedOrganization.id }}
                </div>
                <div>
                    Name: {{ selectedOrganization.name }}
                </div>
                <div>
                    Description: {{ selectedOrganization.description }}
                </div>
                <div>
                    Email: {{ selectedOrganization.email }}
                </div>
                <div>
                    Phone: {{ selectedOrganization.phone }}
                </div>
                <div>
                    Created date: {{ selectedOrganization.createdDate }}
                </div>
                <div>
                    Updated date: {{ selectedOrganization.updatedDate }}
                </div>
                <div>
                    Deleted date: {{ selectedOrganization.deletedDate }}
                </div>
                <div>
                    Soft deleted: {{ selectedOrganization.softDeleted }}
                </div>
            </div>
        </div>
    </div>
</template>
