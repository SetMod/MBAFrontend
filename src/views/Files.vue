<template>
    <Toast />

    <Dialog v-model:visible="displayDelete" header="Confirmation" :style="{ width: '350px' }" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to proceed?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="closeDialog" />
            <Button label="Yes" icon="pi pi-check" class="p-button-text" autofocus @click="confirmDelete" />
        </template>
    </Dialog>

    <Dialog v-model:visible="displayUpdate" header="Update" :style="{ width: '350px' }" :modal="true" class="p-fluid">
        <div class="field">
            <label>Filename</label>
            <InputText v-model="updatedFile.fileName" :maxlength="50" :minlength="2" required="true" autofocus
                :class="{ 'p-invalid': !updatedFile.fileName || updatedFile.fileName.length < 2 || updatedFile.fileName.length > 50 }">
            </InputText>
            <small v-if="!updatedFile.fileName" class="p-error ml-auto">Filename is required.</small>
            <small v-else-if="updatedFile.fileName.length < 2" class="p-error ml-auto">Filename is to
                short.</small>
            <small v-else-if="updatedFile.fileName.length > 50" class="p-error ml-auto">Filename is to
                long.</small>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="closeDialog" />
            <Button label="Yes" icon="pi pi-check" class="p-button-text"
                :disabled="!updatedFile.fileName || updatedFile.fileName.length < 2 || updatedFile.fileName.length > 50"
                @click="confirmEdit" />
        </template>
    </Dialog>

    <div class="w-30rem m-auto my-3 p-card">
        <div class="p-card-content p-3 p-fluid">
            <div class="field text-left">
                <label>Filename:</label>
                <InputText v-model="file.fileName" :maxlength="50" :minlength="2" required="true" autofocus
                    :class="{ 'p-invalid': file.fileName && (file.fileName.length < 2 || file.fileName.length > 50) }">
                </InputText>
                <small v-if="file.fileName && file.fileName.length < 2" class="p-error ml-auto">Filename is to
                    short.</small>
                <small v-else-if="file.fileName && file.fileName.length > 50" class="p-error ml-auto">Filename is to
                    long.</small>
            </div>
        </div>
        <FileUpload name="file" accept=".csv" :custom-upload="true" :max-file-size="100000000" @uploader="onUpload">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
    </div>

    <div v-if="isFilesLoading" class="mt-8">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div v-else-if="!files" class="mt-8">
        <Message severity="info">Files not found</Message>
        <div class="flex justify-content-end">
            <Button label="Refresh" icon="pi pi-refresh" class="h-2rem" @click="refreshFiles" />
        </div>
    </div>
    <div v-else>
        <DataTable :value="files" removable-sort responsive-layout="scroll" :paginator="true" :rows="10"
            paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rows-per-page-options="[10, 25, 50]"
            current-page-report-template="Showing {first} to {last} of {totalRecords}">
            <template #header>
                <div class="table-header flex justify-content-between align-items-center">
                    <h2>Files</h2>
                    <Button label="Refresh" icon="pi pi-refresh" class="h-2rem" @click="refreshFiles" />
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
            <Column field="fileCreateDate" header="CreateDate" :sortable="true"></Column>
            <Column field="userId" header="User"></Column>
            <Column field="organizationId" header="Organization" :sortable="true"></Column>
            <Column header-style="width: 4rem; text-align: center" body-style="text-align: center; overflow: visible">
                <template #body="slotProps">
                    <div class="flex justify-content-between align-content-center">
                        <Button type="button" class="p-button-outlined p-button-danger mr-3" icon="pi pi-times"
                            @click="() => openDelete(slotProps.data.fileId)"></Button>
                        <Button type="button" class="p-button-outlined p-button-warning mr-3" icon="pi pi-pencil"
                            @click="() => openUpdate(slotProps.data)"></Button>
                        <Button type="button" class="p-button-outlined" icon="pi pi-download"
                            @click="() => confirmDownload(slotProps.data.fileId)"></Button>
                    </div>
                </template>
            </Column>
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" class="p-button-text" @click="refreshFiles" />
            </template>
            <template #paginatorend>
            </template>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import useFiles from "../hooks/useFiles"
import useUsers from "../hooks/useUsers"
import { useToast } from "primevue/usetoast";
import useOrganizations from "../hooks/useOrganizations";
import Button from "primevue/button";
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import FileUpload, { FileUploadRemoveEvent } from "primevue/fileupload"
import Message from 'primevue/message';
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Files from "../models/FilesModel";

export default defineComponent({
    components: {
        Button,
        DataTable,
        Column,
        FileUpload,
        Message,
        Toast,
        Dialog,
        InputText
    },
    setup() {
        onMounted(async () => {
            if (!files.value) await refreshFiles()
        })
        const toast = useToast();
        const { user, isLoggedIn } = useUsers()
        const { organization } = useOrganizations()
        const { files, isFilesLoading, refreshFiles, createFile, deleteFile, updateFile, downloadFile } = useFiles()
        const file = ref(new Files())
        const updatedFile = ref(new Files())
        const selectedFileId = ref(0)
        const displayDelete = ref(false)
        const displayUpdate = ref(false)

        const openUpdate = (file: Files) => {
            displayUpdate.value = true
            updatedFile.value = file
        };
        const openDelete = (fileId: number) => {
            displayDelete.value = true
            selectedFileId.value = fileId
        };
        const closeDialog = () => {
            displayDelete.value = false
            displayUpdate.value = false
        };
        const confirmUpdate = async () => {
            closeDialog()
            const response = await updateFile(updatedFile.value)

            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Update', detail: response, life: 3000 });
            toast.add({ severity: 'info', summary: 'Updated', detail: 'File Updated', life: 3000 });
            file.value = new Files()
            await refreshFiles()
        }
        const confirmDelete = async () => {
            closeDialog()
            const response = await deleteFile(selectedFileId.value)

            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 });
            toast.add({ severity: 'info', summary: 'Deleted', detail: 'File Deleted', life: 3000 });
            await refreshFiles()
        }
        const confirmDownload = async (fileId: number) => {
            await downloadFile(fileId)
        }
        const onUpload = async (event: FileUploadRemoveEvent) => {
            const form = new FormData();
            form.append('file', event.files[0])
            if (!isLoggedIn.value || !user.value) return toast.add({ severity: 'error', summary: 'Error', detail: 'User not signed in', life: 3000 });
            // if (!organization.value) return toast.add({ severity: 'error', summary: 'Error', detail: 'User without organization', life: 3000 });
            file.value.userId = user.value.userId
            // file.value.organizationId = organization.value.organizationId
            file.value.organizationId = 1
            const response = await createFile(file.value, form)

            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 });
            toast.add({ severity: 'success', summary: 'Uploaded', detail: 'File Uploaded', life: 3000 });
            file.value = new Files()
            await refreshFiles()
        }

        return {
            file,
            files,
            displayUpdate,
            displayDelete,
            isFilesLoading,
            updatedFile,
            openUpdate,
            openDelete,
            closeDialog,
            confirmEdit: confirmUpdate,
            confirmDelete,
            createFile,
            confirmDownload,
            refreshFiles,
            onUpload
        }
    }
})
</script>
