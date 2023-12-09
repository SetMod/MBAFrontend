<script setup lang="ts">
import { onMounted } from 'vue';
import OrganizationsDataTable from '../../../components/Organizations/OrganizationsDataTable.vue';
import useOrganizations from '../../../hooks/useOrganizations';

const props = defineProps(
    {
        userId: {
            type: Number,
            required: true
        },
    }
)
const { userOrganizations, isOrganizationsLoading, getUserOrganizations } = useOrganizations()

onMounted(async () => {
    await getUserOrganizations(props.userId)
})
</script>

<template>
    <h1>
        User organizations
    </h1>
    <div v-if="userOrganizations">
        <OrganizationsDataTable :organizations="userOrganizations" :is-loading="isOrganizationsLoading"
            :refresh-table="() => getUserOrganizations(props.userId)" />
    </div>
</template>
