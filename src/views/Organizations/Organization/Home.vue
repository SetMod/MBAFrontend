<script setup lang="ts">
import { onMounted } from 'vue';
import useUsers from '../../../hooks/useUsers';
import { useRoute, useRouter } from 'vue-router';
import useOrganizationMembers from '../../../hooks/useOrganizationMembers';

const router = useRouter()
const route = useRoute()
const { currentUser } = useUsers()
const { getMemberByOrgAndUserIDs, currentMember } = useOrganizationMembers()

let orgIdParam = route.params.orgId
let orgId = typeof orgIdParam === "string" ? Number(orgIdParam) : null

onMounted(async () => {
    if (!currentUser.value || !orgId) {
        router.push('/login')
    } else {
        getMemberByOrgAndUserIDs(orgId, currentUser.value.id)
    }
})
</script>

<template>
    <h1>
        Organization Home
    </h1>
    <div>
        Current member: {{ currentMember }}
    </div>
</template>
