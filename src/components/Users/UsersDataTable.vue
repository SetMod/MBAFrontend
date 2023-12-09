<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PropType, ref } from "vue";
import Users, { Roles } from "../../models/UsersModel";

const props = defineProps(
    {
        // https://forum.vuejs.org/t/specifying-array-type-of-prop-in-vue-3-0-with-typescript/103169
        users: {
            type: Array as PropType<Array<Users>>,
            required: true
        },
        openEdit: {
            type: Function,
            required: false,
            default: () => { }
        },
        openDelete: {
            type: Function,
            required: false,
            default: () => { }
        },
        refreshTable: {
            type: Function,
            required: false,
            default: () => { }
        }
    }
)
const filters = ref({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
});
</script>


<template>
    <DataTable :value="props.users" removable-sort responsive-layout="scroll" :filters="filters" :paginator="true"
        :rows="10"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]" current-page-report-template="Showing {first} to {last} of {totalRecords}">
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
        <Column field="id" header="ID" :sortable="true"></Column>
        <Column field="firstName" header="First Name" :sortable="true"></Column>
        <Column field="secondName" header="Second Name" :sortable="true"></Column>
        <Column field="email" header="Email" :sortable="true"></Column>
        <Column field="phone" header="Phone"></Column>
        <Column field="username" header="Username" :sortable="true"></Column>
        <!-- <Column field="userPassword" header="Password"></Column> -->
        <Column field="role" header="Role" :sortable="true"></Column>
        <Column field="createdDate" header="Created Date" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ new Date(slotProps.data.createdDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <Column field="updatedDate" header="Updated Date" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ new Date(slotProps.data.updatedDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <Column field="deletedDate" header="Create Date" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ new Date(slotProps.data.updatedDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <Column field="softDeleted" header="Soft Deleted" :sortable="true"></Column>
        <Column header="Actions" header-style="width: 4rem; text-align: center" body-style="overflow: visible;">
            <template #body="slotProps">
                <div class="flex justify-content-around align-content-center">
                    <Button type="button" icon="pi pi-user-edit" class="mr-1 p-button-outlined p-button-info"
                        @click="() => props.openEdit(slotProps.data)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
                        @click="() => props.openDelete(slotProps.data)"></Button>
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

<style></style>