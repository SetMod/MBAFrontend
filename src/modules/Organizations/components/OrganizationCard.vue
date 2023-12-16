<script setup lang="ts">
import Organizations from "../../../models/OrganizationsModel";

const props = defineProps({
    organization: {
        type: Organizations,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <Card class="h-full">
        <template #title>Organization</template>
        <template #content>
            <ProgressSpinner v-if="props.isLoading" />
            <div v-else class="text-left px-5">
                <div class="field">
                    <b>Id: </b>
                    <span>{{ props.organization.id }}</span>
                </div>
                <div class="field">
                    <b>Name: </b>
                    <span>{{ props.organization.name }}</span>
                </div>
                <div class="field">
                    <b>Description:</b>
                    <div class="my-1">{{ props.organization.description }}</div>
                </div>
                <div class="field">
                    <b>Email: </b>
                    <span>{{ props.organization.email }}</span>
                </div>
                <div class="field">
                    <b>Phone: </b>
                    <span>{{ props.organization.phone }}</span>
                </div>
                <div class="field">
                    <div>
                        <b>Created: </b>
                        <span>
                            {{ new Date(props.organization.createdDate).toLocaleDateString() }}
                        </span>
                    </div>
                    <div v-if="props.organization.updatedDate">
                        <b>Updated: </b>
                        <span>
                            {{ new Date(props.organization.updatedDate).toLocaleDateString() }}
                        </span>
                    </div>
                    <div v-if="props.organization.softDeleted && props.organization.deletedDate">
                        <b>Deleted: </b>
                        <span>
                            {{ new Date(props.organization.deletedDate).toLocaleDateString() }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>