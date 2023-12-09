<script setup lang="ts">
import { onMounted } from 'vue';
import OrganizationsDataTable from '../../components/Organizations/OrganizationsDataTable.vue';
import useOrganizations from '../../hooks/useOrganizations';

const { userOrganizations, organizations, getUserOrganizations, getOrganizations } = useOrganizations()

const props = defineProps({
    userId: {
        type: Number,
        required: false,
        default: null
    }
})

onMounted(async () => {
    if (props.userId) {
        await getUserOrganizations(props.userId)
        // getOrganizationMemberByField("user_id", userId)
        // getMemberByOrgAndUserIDs(1, userId)
    } else {
        await getOrganizations()
    }
})
</script>

<template>
    <h1>
        Organizations
    </h1>
    <div v-if="userOrganizations">
        <OrganizationsDataTable :organizations="userOrganizations" />
    </div>
    <div v-else-if="organizations">
        <OrganizationsDataTable :organizations="organizations" />
    </div>
</template>
