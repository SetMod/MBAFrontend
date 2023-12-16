<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { PropType, ref } from "vue";
import { getRolesSeverity, getRolesValue } from "../utils";
import Users from "../../../models/UsersModel";

const props = defineProps({
    // https://forum.vuejs.org/t/specifying-array-type-of-prop-in-vue-3-0-with-typescript/103169
    users: {
        type: Array as PropType<Array<Users>>,
        required: true
    },
    isLoading: {
        type: Boolean,
        required: true
    },

})

const emit = defineEmits({
    refreshTable: () => true,
    openEdit: (value: Users) => {
        if (value instanceof Users) return true
        console.error('Invalid value type for openEdit event!');
        return false
    },
    openDelete: (value: Users) => {
        if (value instanceof Users) return true
        console.error('Invalid value type for openDelete event!');
        return false
    },
})

const filters = ref({
    global: { value: undefined, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
    <DataTable :value="props.users" removable-sort responsive-layout="scroll" :filters="filters" :paginator="true"
        :loading="props.isLoading" :rows="10"
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
                    <Button icon="pi pi-refresh" class="h-2rem" @click="() => emit('refreshTable')" />
                </div>
            </div>
        </template>
        <Column field="id" header="ID" :sortable="true"></Column>
        <Column field="firstName" header="First Name" :sortable="true"></Column>
        <Column field="secondName" header="Second Name" :sortable="true"></Column>
        <Column field="username" header="Username" :sortable="true"></Column>
        <Column field="email" header="Email" :sortable="true"></Column>
        <Column field="phone" header="Phone"></Column>
        <!-- <Column field="userPassword" header="Password"></Column> -->
        <Column field="role" header="Role" :sortable="true">
            <template #body="slotProps">
                <div>
                    <Badge :value="getRolesValue(slotProps.data.role)" :severity="getRolesSeverity(slotProps.data.role)">
                    </Badge>
                </div>
            </template>
        </Column>
        <Column header="Dates" :sortable="true">
            <template #body="slotProps">
                <div>
                    Created: {{ new Date(slotProps.data.createdDate).toLocaleDateString() }}
                </div>
                <div v-if="slotProps.data.updatedDate">
                    Updated: {{ new Date(slotProps.data.updatedDate).toLocaleDateString() }}
                </div>
                <div v-if="slotProps.data.softDeleted">
                    Deleted: {{ new Date(slotProps.data.deletedDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <Column field="softDeleted" header="Soft Deleted" :sortable="true"></Column>
        <Column header="Actions">
            <template #body="slotProps">
                <div class="flex justify-content-around align-content-center">
                    <Button type="button" icon="pi pi-user-edit" class="mr-1 p-button-outlined p-button-info"
                        @click="() => emit('openEdit', slotProps.data)"></Button>
                    <Button type="button" icon="pi pi-times" class="p-button-outlined p-button-danger"
                        @click="() => emit('openDelete', slotProps.data)"></Button>
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<style></style>