<script setup lang="ts">
import { PropType, ref } from "vue";
import { FilterMatchMode } from "primevue/api";
import { IOrganizationMembersFullResponse } from "../../../models/OrganizationMembersModel";
import { getOrganizationRoleValue, getOrganizationRoleSeverity } from "../utils";
import useRoutes from "../../../hooks/useRoutes";

const props = defineProps({
    memberships: {
        type: Array as PropType<Array<IOrganizationMembersFullResponse>>,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    },
})

const emit = defineEmits({
    refreshTable: () => true,
})

const { getOrganizationRoute, getUserRoute } = useRoutes()
const filters = ref({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
    <DataTable :value="props.memberships" removable-sort responsive-layout="scroll" :filters="filters" :paginator="true"
        :loading="props.isLoading" :rows="10"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]" current-page-report-template="Showing {first} to {last} of {totalRecords}">
        <template #header>
            <div class="table-header flex justify-content-between align-items-center">
                <h2>Memberships</h2>
                <div class="flex align-items-center">
                    <span class="mr-2 p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters.global.value" placeholder="Search..." />
                    </span>
                    <Button icon="pi pi-refresh" class="h-2rem" @click="() => emit('refreshTable')" />
                </div>
            </div>
        </template>
        <Column field="id" header="ID" :sortable="true"></Column>
        <Column field="user.username" header="Username" :sortable="true">
            <template #body="slotProps">
                <router-link :to="getUserRoute(slotProps.data.user_id)">
                    {{ slotProps.data.user.username }}
                </router-link>
            </template>
        </Column>
        <Column field="organization.name" header="Organization" :sortable="true">
            <template #body="slotProps">
                <router-link :to="getOrganizationRoute(slotProps.data.organization_id)">
                    {{ slotProps.data.organization.name }}
                </router-link>
            </template>
        </Column>
        <Column header="Role" :sortable="true">
            <template #body="slotProps">
                <div>
                    <Badge :value="getOrganizationRoleValue(slotProps.data.role)"
                        :severity="getOrganizationRoleSeverity(getOrganizationRoleValue(slotProps.data.role))"></Badge>
                </div>
            </template>
        </Column>
        <Column header="Dates" :sortable="true">
            <template #body="slotProps">
                <div>
                    Created: {{ new Date(slotProps.data.created_date).toUTCString() }}
                </div>
                <div v-if="slotProps.data.updated_date">
                    Updated: {{ new Date(slotProps.data.updated_date).toUTCString() }}
                </div>
                <div v-if="slotProps.data.soft_deleted">
                    Deleted: {{ new Date(slotProps.data.deleted_date).toUTCString() }}
                </div>
            </template>
        </Column>
        <!-- <Column header="Actions">
            <template #body="slotProps">
                <div class="flex justify-content-around align-content-center">
                    <Button type="button" icon="pi pi-user-edit" class="mr-1 p-button-outlined p-button-info"
                        @click="() => emit('openEdit', slotProps.data)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
                        @click="() => emit('openDelete', slotProps.data)"></Button>
                </div>
            </template>
        </Column> -->
    </DataTable>
</template>

<style></style>