<script setup lang="ts">
import { getMemberActiveSeverity, getMemberActiveValue, getOrganizationRoleSeverity } from "../utils"
import OrganizationMembers from "../../../models/OrganizationMembersModel";
import Users from "../../../models/UsersModel";

const props = defineProps({
    member: {
        type: OrganizationMembers,
        required: true
    },
    user: {
        type: Users,
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
        <template #title>Member</template>
        <template #content>
            <ProgressSpinner v-if="props.isLoading" />
            <div v-else class="text-left px-5">
                <div class="field">
                    <b>Id: </b>
                    <span>{{ props.member.id }}</span>
                </div>
                <div class="field">
                    <b>Username: </b>
                    <span>{{ props.user.username }}</span>
                </div>
                <div class="field">
                    <b>Role: </b>
                    <span>
                        <Badge :value="props.member.role" :severity="getOrganizationRoleSeverity(props.member.role)"></Badge>
                    </span>
                </div>
                <div class="field">
                    <!-- <span>Active: </span> -->
                    <!-- <span>{{ props.member.active }}</span> -->
                    <b>Status: </b>
                    <span>
                        <Badge :value="getMemberActiveValue(props.member.active)"
                            :severity="getMemberActiveSeverity(props.member.active)"></Badge>
                    </span>
                </div>
                <div class="field">
                    <div>
                        <b>Created: </b>
                        <span>
                            {{ new Date(props.member.createdDate).toUTCString() }}
                        </span>
                    </div>
                    <div v-if="props.member.updatedDate">
                        <b>Updated: </b>
                        <span>
                            {{ new Date(props.member.updatedDate).toUTCString() }}
                        </span>
                    </div>
                    <div v-if="props.member.softDeleted && props.member.deletedDate">
                        <b>Deleted: </b>
                        <span>
                            {{ new Date(props.member.deletedDate).toUTCString() }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>