<script setup lang="ts">
import { onMounted } from 'vue';
import useMembers from '../../../hooks/useMembers';
import useOrganizations from '../../../hooks/useOrganizations';
import MemberCard from '../../../components/Members/MemberCard.vue';
import useUsers from '../../../hooks/useUsers';
import OrganizationCard from '../../../components/Organizations/OrganizationCard.vue';

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
    if (props.userId) {
        await getMemberByOrgAndUserIDs(Number(props.orgId), Number(props.userId))
    }
    if (currentUser.value) {
        await getMemberByOrgAndUserIDs(Number(props.orgId), currentUser.value.id)
    }
    await selectOrganization(Number(props.orgId))
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
