<template>
    <DataTable :value="props.users" removable-sort responsive-layout="scroll" :filters="filters" :paginator="true"
        :rows="10"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]"
        current-page-report-template="Showing {first} to {last} of {totalRecords}">
        <template #header>
            <div class="table-header flex justify-content-between align-items-center">
                <h2>Users</h2>
                <div class="flex align-items-center">
                    <span class="mr-2 p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters.global.value" placeholder="Search..." />
                    </span>
                    <Button icon="pi pi-refresh" class="h-2rem" @click="() => props.refreshTable()" />
                </div>
            </div>
        </template>
        <Column field="userId" header="ID" :sortable="true"></Column>
        <Column field="userFirstName" header="FirstName" :sortable="true"></Column>
        <Column field="userSecondName" header="SecondName" :sortable="true"></Column>
        <Column field="userEmail" header="Email" :sortable="true"></Column>
        <Column field="userPhone" header="Phone"></Column>
        <Column field="userUsername" header="Username" :sortable="true"></Column>
        <Column field="userPassword" header="Password"></Column>
        <Column field="userCreateDate" header="CreateDate" :sortable="true"></Column>
        <Column header="Role">
            <template #body="slotProps">
                <span>{{ props.roles.find((role) => role.roleId == slotProps.data.roleId)?.roleName }}</span>
            </template>
        </Column>
        <Column header="Actions" header-style="width: 4rem; text-align: center" body-style="overflow: visible;">
            <template #body="slotProps">
                <div class="flex justify-content-around align-content-center">
                    <Button type="button" icon="pi pi-user-edit" class="mr-1 p-button-outlined p-button-info"
                        @click="() => props.openEdit(slotProps.data)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
                        @click="() => props.openDelete(slotProps.data.userId)"></Button>
                </div>
            </template>
        </Column>
        <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="() => props.refreshTable()" />
        </template>
        <template #paginatorend>
        </template>
    </DataTable>
</template>

<script lang="ts">
import { FilterMatchMode } from "primevue/api";
import { defineComponent, PropType, ref } from "vue";
import Roles from "../../models/RolesModel";
import Users from "../../models/UsersModel";

export default defineComponent({
    props: {
        // https://forum.vuejs.org/t/specifying-array-type-of-prop-in-vue-3-0-with-typescript/103169
        users: {
            type: Array as PropType<Array<Users>>,
            required: true
        },
        roles: {
            type: Array as PropType<Array<Roles>>,
            required: true
        },
        openEdit: {
            type: Function,
            required: true
        },
        openDelete: {
            type: Function,
            required: true
        },
        refreshTable: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const filters = ref({
            global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
        });
        return {
            filters,
            props
        }
    }
})
</script>

<style>
</style>