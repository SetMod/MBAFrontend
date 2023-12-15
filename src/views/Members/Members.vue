<script setup lang="ts">
import { onMounted } from 'vue';
import useMembers from '../../hooks/useMembers';
import UserMembershipsTable from '../../components/Users/UserMembershipsTable.vue';
import MembersTable from '../../components/Members/MembersTable.vue'

const props = defineProps({
    orgId: {
        type: String,
        required: false,
        default: ''
    },
    userId: {
        type: String,
        required: false,
        default: ''
    },
})

onMounted(async () => {
    refreshTable()
})

const {
    isMembersLoading,
    userMembershipsFull,
    organizationMembersFull,
    getUserMembershipsFull,
    getOrganizationMembersFull
} = useMembers()

const refreshTable = async () => {
    if (props.userId) {
        await getUserMembershipsFull(Number(props.userId))
    } else if (props.orgId) {
        await getOrganizationMembersFull(Number(props.orgId))
    }
}
</script>

<template>
    <h1>
        Members
    </h1>
    <div v-if="userMembershipsFull.length">
        <UserMembershipsTable :memberships="userMembershipsFull" :is-loading="isMembersLoading"
        @refresh-table="refreshTable" />
    </div>
    <div v-else-if="organizationMembersFull.length">
        <MembersTable :members="organizationMembersFull" :is-loading="isMembersLoading" @refresh-table="refreshTable" />
    </div>
</template>
