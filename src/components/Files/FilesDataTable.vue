<template>
    <DataTable :value="files" removable-sort responsive-layout="scroll" :paginator="true" :rows="10"
        paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rows-per-page-options="[10, 25, 50]"
        current-page-report-template="Showing {first} to {last} of {totalRecords}">
        <template #header>
            <div class="table-header flex justify-content-between align-items-center">
                <h2>Files</h2>
                <Button label="Refresh" icon="pi pi-refresh" class="h-2rem" @click="() => refreshTable()" />
            </div>
        </template>
        <template #empty>
            No customers found.
        </template>
        <template #loading>
            Loading customers data. Please wait.
        </template>
        <Column field="fileId" header="ID" :sortable="true"></Column>
        <Column field="fileName" header="Name" :sortable="true"></Column>
        <Column field="fileCreateDate" header="CreateDate" :sortable="true">
            <template #body="slotProps">
                <div>
                    {{ new Date(slotProps.data.fileCreateDate).toLocaleDateString() }}
                </div>
            </template>
        </Column>
        <Column field="userId" header="User" :sortable="true" style="min-width:16rem">
            <template #body="slotProps">
                <div>
                    {{ users?.find((usr) => usr.userId ==
                            slotProps.data.userId)?.userFirstName || slotProps.data.userId
                    }}
                </div>
            </template>
        </Column>
        <Column field="organizationId" header="Organization" :sortable="true" style="min-width:16rem">
            <template #body="slotProps">
                <div>
                    {{ userOrganizations?.find((org) => org.organizationId ==
                            slotProps.data.organizationId)?.organizationName || slotProps.data.organizationId
                    }}
                </div>
            </template>
        </Column>
        <Column header-style="width: 4rem; text-align: center" body-style="text-align: center; overflow: visible">
            <template #body="slotProps">
                <div class="flex justify-content-between align-content-center">
                    <!-- <Button type="button" class="p-button-outlined p-button-info mr-3" icon="pi pi-eye"
                        @click="() => openView(slotProps.data)"></Button> -->
                    <Button type="button" class="p-button-outlined p-button-danger mr-3" icon="pi pi-times"
                        @click="() => openDelete(slotProps.data)"></Button>
                    <Button type="button" class="p-button-outlined p-button-warning mr-3" icon="pi pi-pencil"
                        @click="() => openEdit(slotProps.data)"></Button>
                    <Button type="button" class="p-button-outlined" icon="pi pi-download"
                        @click="() => confirmDownload(slotProps.data.fileId)"></Button>
                </div>
            </template>
        </Column>
        <template #paginatorstart>
            <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="() => refreshTable()" />
        </template>
        <template #paginatorend>
        </template>
    </DataTable>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import useOrganizations from "../../hooks/useOrganizations"
import useUsers from "../../hooks/useUsers"
import Files from "../../models/Datasources"

export default defineComponent({
    props: {
        files: {
            type: Array as PropType<Array<Files>>,
            required: true
        },
        refreshTable: {
            type: Function,
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
        confirmDownload: {
            type: Function,
            required: true
        },
    },
    setup(props) {
        const { users } = useUsers()
        const { userOrganizations } = useOrganizations()
        return {
            props,
            users,
            userOrganizations,
        }
    }
})
</script>

<style>
</style>