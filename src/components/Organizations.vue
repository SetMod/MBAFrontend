<template>
    <div v-if="isOrganizationsLoading"><i class="pi pi-spin pi-spinner mt-8" style="font-size: 2rem"></i></div>
    <div v-else-if="!organizations">
        <h5 class="mt-8">Organizations not found</h5>
    </div>
    <div v-else>
        <DataTable :value="organizations" removable-sort responsive-layout="scroll" :paginator="true" :rows="10"
            paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rows-per-page-options="[10, 25, 50]"
            current-page-report-template="Showing {first} to {last} of {totalRecords}">
            <template #header>
                <div class="table-header flex justify-content-between align-items-center">
                    <h2>Organizations</h2>
                    <Button icon="pi pi-refresh" class="h-2rem" @click="refresh" />
                </div>
            </template>
            <Column field="organizationId" header="ID" :sortable="true"></Column>
            <Column field="organizationName" header="FirstName" :sortable="true"></Column>
            <Column field="organizationDescription" header="SecondName" :sortable="true"></Column>
            <Column field="organizationEmail" header="Email" :sortable="true"></Column>
            <Column field="organizationPhone" header="Phone"></Column>
            <Column field="organizationCreateDate" header="Username" :sortable="true"></Column>
            <!-- <Column header="Role">
                <template #body="slotProps">
                    <span>{{
                            organizationRoles
                                ? organizationRoles.find((role) => role.organizationRoleId ==
                                    slotProps.data.roleId)?.organizationRoleName
                                : slotProps.data.roleId
                    }}</span>
                </template>
            </Column> -->
            <Column field="roleId" header="Actions"></Column>
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="refresh" />
            </template>
            <template #paginatorend>
            </template>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import useOrganizationRoles from "../hooks/useOrganizationRoles";
import useOrganizations from "../hooks/useOrganizations";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default defineComponent({
    components: {
        DataTable,
        Column
    },
    setup() {
        onMounted(() => {
            getAllOrganizations()
            getOrganizationsRoles()
        })
        const { organizations, isOrganizationsLoading, getAllOrganizations } = useOrganizations();
        const { organizationRoles, getOrganizationsRoles } = useOrganizationRoles();

        const refresh = () => {
            getAllOrganizations()
            getOrganizationsRoles()
        }
        return {
            isOrganizationsLoading,
            organizations,
            organizationRoles,
            refresh
        };
    },
});
</script>

<style>
</style>