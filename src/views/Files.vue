<template>
    <div class="w-30rem m-auto my-3">
        <FileUpload name="file" accept=".csv" :url="postUrl" :max-file-size="100000000" @upload="onUpload">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
    </div>
    <div v-if="isFilesLoading" class="mt-8"><i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></div>
    <div v-else-if="!files" class="mt-8">
        <h5>Files not found</h5>
    </div>
    <div v-else>
        <DataTable :value="files" removable-sort responsive-layout="scroll" :paginator="true" :rows="10"
            paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rows-per-page-options="[10, 25, 50]"
            current-page-report-template="Showing {first} to {last} of {totalRecords}">
            <template #header>
                <div class="table-header flex justify-content-between align-items-center">
                    <h2>Files</h2>
                    <Button icon="pi pi-refresh" class="h-2rem" @click="refresh" />
                </div>
            </template>
            <Column field="fileId" header="ID" :sortable="true"></Column>
            <Column field="fileName" header="Name" :sortable="true"></Column>
            <Column field="filePath" header="Path" :sortable="true"></Column>
            <Column field="fileCreateDate" header="CreateDate" :sortable="true"></Column>
            <Column field="userId" header="User"></Column>
            <Column field="organizationId" header="organizationId" :sortable="true"></Column>
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="refresh" />
            </template>
            <template #paginatorend>
            </template>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import useFiles from "../hooks/useFiles"
import useUsers from "../hooks/useUsers"
import Button from "primevue/button";
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import FileUpload from "primevue/fileupload"
import config from "../config";
export default defineComponent({
    components: {
        Button,
        DataTable,
        Column,
        FileUpload
    },
    setup() {
        onMounted(() => {
            if (isLoggedIn.value) getUserFiles(user.value.userId)
        })

        const { user, isLoggedIn } = useUsers()
        const postUrl = `${config.baseUrl}/files/upload?file_name=MyFile&user_id=${user.value.userId}&organization_id=1`
        const { files, isFilesLoading, getUserFiles } = useFiles()
        const refresh = () => {
            if (isLoggedIn.value) getUserFiles(user.value.userId)
        }
        const onUpload = (event) => {
            console.log(event);
        }

        return {
            postUrl,
            files,
            isFilesLoading,
            refresh,
            onUpload
        }
    }
})
</script>
