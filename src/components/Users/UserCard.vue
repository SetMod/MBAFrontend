<script setup lang="ts">
import Users, { Roles } from '../../models/UsersModel';
import { getRolesValue, getRolesSeverity } from '../../utils';
const props = defineProps({
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
        <template #title>User</template>
        <template #content>
            <ProgressSpinner v-if="props.isLoading" />
            <div v-else class="text-left px-5">
                <div class="field">
                    <b>Id: </b>
                    <span>{{ props.user.id }}</span>
                </div>
                <div class="field">
                    <b>First name: </b>
                    <span>{{ props.user.firstName }}</span>
                </div>
                <div class="field">
                    <b>Second name: </b>
                    <span>{{ props.user.secondName }}</span>
                </div>
                <div class="field">
                    <b>Username: </b>
                    <span>{{ props.user.username }}</span>
                </div>
                <div class="field">
                    <b>Role: </b>
                    <span>
                        <Badge :value="getRolesValue(props.user.role)" :severity="getRolesSeverity(props.user.role)">
                        </Badge>
                    </span>
                </div>
                <div class="field">
                    <b>Email: </b>
                    <span>{{ props.user.email }}</span>
                </div>
                <div class="field">
                    <b>Phone: </b>
                    <span>{{ props.user.phone }}</span>
                </div>
                <div class="field">
                    <div>
                        <b>Created: </b>
                        <span>
                            {{ new Date(props.user.createdDate).toLocaleDateString() }}
                        </span>
                    </div>
                    <div v-if="props.user.updatedDate">
                        <b>Updated: </b>
                        <span>
                            {{ new Date(props.user.updatedDate).toLocaleDateString() }}
                        </span>
                    </div>
                    <div v-if="props.user.softDeleted && props.user.deletedDate">
                        <b>Deleted: </b>
                        <span>
                            {{ new Date(props.user.deletedDate).toLocaleDateString() }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>