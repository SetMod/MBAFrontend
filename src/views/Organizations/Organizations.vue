<script setup lang="ts">
import { onMounted } from 'vue';
import useUsers from '../../hooks/useUsers';
import { useRoute, useRouter } from 'vue-router';
import useOrganizationMembers from '../../hooks/useOrganizationMembers';
import OrganizationsDataTable from '../../components/Organizations/OrganizationsDataTable.vue';

const router = useRouter()
const route = useRoute()
const { userOrganizations, currentUser, getOrganizations } = useUsers()
const { getMemberByOrgAndUserIDs, getOrganizationMemberByField, currentMember } = useOrganizationMembers()

let userIdParam = route.params.userId
let userId = typeof userIdParam === "string" ? Number(userIdParam) : null

onMounted(async () => {
    console.log("User id: " + userId);
    console.log("Current User id: " + currentUser.value?.id);
    console.log("Current Member id: " + currentMember.value?.id);

    if (!currentUser.value || !userId) {
        router.push('/login')
    } else {
        // getOrganizationMemberByField("user_id", userId)
        // getMemberByOrgAndUserIDs(1, userId)
        getOrganizations(userId)
    }
})

const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "NAME" },
    { field: "description", header: "DESCRIPTION" },
    { field: "email", header: "EMAIL" },
    { field: "phone", header: "PHONE" },
    { field: "createdDate", header: "CREATEDDATE" },
    { field: "updatedDate", header: "UPDATEDDATE" },
    { field: "deletedDate", header: "DELETEDDATE" },
    { field: "softDeleted", header: "SOFTDELETED" },
];
</script>

<template>
    <h1>
        Organizations
    </h1>
    <div v-if="userOrganizations">
        <OrganizationsDataTable :organizations="userOrganizations" />
    </div>
</template>
