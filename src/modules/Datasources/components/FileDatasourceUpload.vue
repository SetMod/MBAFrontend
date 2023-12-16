<script setup lang="ts">
import { FileUploadSelectEvent } from 'primevue/fileupload';
import { PropType, ref } from 'vue';

const props = defineProps({
    selectedFile: {
        type: [File, null, undefined] as PropType<File | null | undefined>,
        default: null
    },
})

const emit = defineEmits({
    'update:selectedFile': (file: File) => {
        if (file instanceof File) return true
        console.log('Invalid pram type of update:selectedFile event');
        return false
    }
})

const MAX_UPLOAD_FILE_SIZE = Math.pow(1024, 2) * 100 // Mb
const UPLOAD_FILE_LIMIT = 1
const selectedFiles = ref<File[]>([])

const selectFile = (event: FileUploadSelectEvent) => {
    selectedFiles.value = event.files
    if (event.files.length > 0) {
        emit('update:selectedFile', event.files[0])
    }
}
</script>

<template>
    <div class="m-auto my-3 p-card">
        <FileUpload name="file" :multiple="false" accept=".csv" :max-file-size="MAX_UPLOAD_FILE_SIZE"
            :file-limit="UPLOAD_FILE_LIMIT" :show-upload-button="false" :show-cancel-button="false"
            :disabled="selectedFiles.length > 0" @select="selectFile">
            <template #empty>
                <p>Drag and drop here a file to upload.</p>
            </template>
        </FileUpload>
    </div>
</template>