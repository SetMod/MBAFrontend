<template>
    <Toast />
    <FileDeleteDialogVue :display="displayDelete" :close-dialog="closeDialog" :submit-dialog="confirmDelete" />
    <FileEditDialogVue v-if="selectedFile" :display="displayUpdate" :file="selectedFile" :close-dialog="closeDialog"
        :submit-dialog="confirmEdit" />
    <Message v-if="!organization" severity="warn">Select organization in profile</Message>
    <FileUploadVue :on-upload="onUpload" />

    <div v-if="isFilesLoading" class="mt-8">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div v-else-if="!files" class="mt-8">
        <Message severity="info">Files not found</Message>
        <Button label="Refresh" icon="pi pi-refresh" class="h-2rem" @click="refreshFiles" />
    </div>
    <div v-else>
        <FilesDataTableVue :files="files" :open-edit="openEdit" :open-delete="openDelete"
            :confirm-download="confirmDownload" :refresh-table="refreshFiles" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import useFiles from "../hooks/useFiles"
import useUsers from "../hooks/useUsers"
import { useToast } from "primevue/usetoast";
import useOrganizations from "../hooks/useOrganizations";
import { FileUploadRemoveEvent } from "primevue/fileupload"
import Files from "../models/FileDatasourcesModel";
import FileDeleteDialogVue from "../components/Files/FileDeleteDialog.vue";
import FileEditDialogVue from "../components/Files/FileEditDialog.vue";
import FileUploadVue from "../components/Files/FileUpload.vue";
import FilesDataTableVue from "../components/Files/FilesDataTable.vue";

export default defineComponent({
    components: {
        FileDeleteDialogVue,
        FileEditDialogVue,
        FileUploadVue,
        FilesDataTableVue
    },
    setup() {
        onMounted(() => {
            if (isLoggedIn.value && user.value) {
                getUserFiles(user.value.userId)
                getUserOrganizations(user.value.userId)
                getUsers()
            }
        })
        const toast = useToast();
        const { user, isLoggedIn, getUsers } = useUsers()
        const { organization, getUserOrganizations } = useOrganizations()
        const { userFiles: files, isFilesLoading, getUserFiles, createFile, deleteFile, updateFile, downloadFile } = useFiles()
        const selectedFile = ref<Files>()
        const csvFile = ref()
        const displayDelete = ref(false)
        const displayUpdate = ref(false)

        const refreshFiles = () => {
            if (isLoggedIn.value && user.value) getUserFiles(user.value.userId)
        }
        const closeDialog = () => {
            displayDelete.value = false
            displayUpdate.value = false
            selectedFile.value = undefined
        }
        const openEdit = (file: Files) => {
            displayUpdate.value = true
            selectedFile.value = file
        }
        const openDelete = (file: Files) => {
            displayDelete.value = true
            selectedFile.value = file
        }
        const onUpload = async (event: FileUploadRemoveEvent, newFile: Files) => {
            if (!isLoggedIn.value || !user.value) return toast.add({ severity: 'error', summary: 'Error', detail: 'User not signed in', life: 3000 });
            if (!organization.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select organization in your profile', life: 3000 });

            const form = new FormData();
            csvFile.value = event.files[0]
            form.append('file', csvFile.value)
            newFile.userId = user.value.userId
            newFile.organizationId = organization.value.organizationId
            const response = await createFile(newFile, form)

            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 });
            toast.add({ severity: 'success', summary: 'Uploaded', detail: 'File Uploaded', life: 3000 });

            refreshFiles()
        }
        // const onPreview = (event: FileUploadRemoveEvent) => {
        //     csvFile.value = event.files[0]
        //     console.log(csvFile.value);
        // }
        // const onView = () => {
        //     // if (csvFile.value) return
        //     console.log(csvFile.value);
        // }
        const confirmEdit = async () => {
            if (!selectedFile.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select a file to edit', life: 3000 })

            const response = await updateFile(selectedFile.value)

            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Failed to Update', detail: response, life: 3000 });
            toast.add({ severity: 'info', summary: 'Updated', detail: 'File Updated', life: 3000 });

            refreshFiles()
            closeDialog()
        }
        const confirmDelete = async () => {
            if (!selectedFile.value) return toast.add({ severity: 'warn', summary: 'Warning', detail: 'Select a file to delete', life: 3000 })

            const response = await deleteFile(selectedFile.value.fileId)

            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 });
            toast.add({ severity: 'info', summary: 'Deleted', detail: 'File Deleted', life: 3000 });

            refreshFiles()
            closeDialog()
        }
        const confirmDownload = async (fileId: number) => {
            const response = await downloadFile(fileId)

            if (response instanceof String) return toast.add({ severity: 'error', summary: 'Error', detail: response, life: 3000 });
            toast.add({ severity: 'info', summary: 'Download', detail: 'Download started', life: 3000 });
        }


        return {
            files,
            organization,
            displayUpdate,
            displayDelete,
            isFilesLoading,
            selectedFile,
            openEdit,
            openDelete,
            closeDialog,
            confirmEdit,
            confirmDelete,
            createFile,
            confirmDownload,
            refreshFiles,
            onUpload
        }
    }
})
</script>
