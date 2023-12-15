<script setup lang="ts">
import { PropType } from "vue"
import Organizations from "../../models/OrganizationsModel"
import useRoutes from "../../hooks/useRoutes"

const props = defineProps(
    {
        organizations: {
            type: Array as PropType<Array<Organizations>>,
            required: true
        },
        isLoading: {
            type: Boolean,
            required: false
        },
    }
)

const emit = defineEmits({
    refreshTable: () => true,
})

const { getOrganizationRoute } = useRoutes()
</script>

<template>
    <div class="card">
        <DataTable :value="organizations" removable-sort responsive-layout="scroll" :loading="props.isLoading"
            :paginator="true" :rows="10"
            paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rows-per-page-options="[10, 25, 50]"
            current-page-report-template="Showing {first} to {last} of {totalRecords}">
            <template #header>
                <div class="table-header flex justify-content-between align-items-center">
                    <h2>Organizations</h2>
                    <Button icon="pi pi-refresh" class="h-2rem" @click="emit('refreshTable')" />
                </div>
            </template>
            <Column field="id" header="ID" :sortable="true"></Column>
            <Column field="name" header="Name" :sortable="true">
                <template #body="slotProps">
                    <router-link :to="getOrganizationRoute(slotProps.data.id)">{{ slotProps.data.name }}</router-link>
                </template>
            </Column>
            <Column field="description" header="Description" :sortable="true"></Column>
            <Column field="email" header="Email" :sortable="true"></Column>
            <Column field="phone" header="Phone"></Column>
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
        </DataTable>
    </div>
</template>
