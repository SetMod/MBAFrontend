<script setup lang="ts">
import { onMounted } from 'vue';
import useMembers from '../../../hooks/useMembers';
import useOrganizations from '../../../hooks/useOrganizations';
import useUsers from '../../../hooks/useUsers';
import MemberCard from '../../Members/components/MemberCard.vue';
import OrganizationCard from '../components/OrganizationCard.vue';

const props = defineProps(
    {
        orgId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: false,
            default: ''
        },
    }
)

const {
    currentUser
} = useUsers()
const {
    isOrganizationsLoading,
    selectedOrganization,
    selectOrganization
} = useOrganizations()
const {
    getMemberByOrgAndUserIDs,
    currentMember,
    isMembersLoading
} = useMembers()

onMounted(async () => {
    await selectOrganization(Number(props.orgId))
    if (props.userId) {
        await getMemberByOrgAndUserIDs(Number(props.orgId), Number(props.userId))
    } else if (currentUser.value) {
        await getMemberByOrgAndUserIDs(Number(props.orgId), currentUser.value.id)
    }
})

</script>

<template>
    <div class="grid">
        <div class="col-8">
            <OrganizationCard v-if="selectedOrganization" :organization="selectedOrganization"
                :is-loading="isOrganizationsLoading" />
        </div>
        <div class="col-4">
            <MemberCard v-if="currentMember && currentUser" :member="currentMember" :user="currentUser"
                :is-loading="isMembersLoading" />
        </div>
    </div>
</template>
