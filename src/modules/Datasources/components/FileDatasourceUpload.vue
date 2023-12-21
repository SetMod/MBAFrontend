<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import useFilePreview from '../hooks/useFilePreview';
import { simpleCSVParser } from '../../../utils'

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

const {
    selectedFiles,
    file,
    fileContent,
    onFileRemove,
    onFileSelect,
    readFileContent
} = useFilePreview()

const showFilePreview = ref(false)
const openShowPreviewDialog = () => showFilePreview.value = true
const closeShowPreviewDialog = () => showFilePreview.value = false

const csvData = ref<{
    headers: string[];
    parsedData: {
        [key: string]: string;
    }[];
}>()

watch(file, () => {
    if (file.value) {
        emit('update:selectedFile', file.value)

        readFileContent()
    }
})

watch(fileContent, () => {
    if (fileContent.value) {
        const res = simpleCSVParser(fileContent.value)
        csvData.value = res
    }
})
</script>

<template>
    <div class="m-auto my-3 p-card">
        <div class="field">
            <FileUpload name="file" :multiple="false" accept=".csv" :max-file-size="MAX_UPLOAD_FILE_SIZE"
                :file-limit="UPLOAD_FILE_LIMIT" :show-upload-button="false" :show-cancel-button="false"
                :disabled="selectedFiles.length > 0" @select="onFileSelect" @remove="onFileRemove">
                <template #empty>
                    <p>Drag and drop here a file to upload.</p>
                </template>
            </FileUpload>
        </div>

        <div class="field">
            <Button v-if="file && !showFilePreview" label="Preview" @click="openShowPreviewDialog" />
            <Button v-if="showFilePreview" label="Close" @click="closeShowPreviewDialog" />
        </div>

        <div v-if="showFilePreview" class="pl-3 max-h-30rem overflow-y-scroll">
            <div class="field">
                <h3 v-if="file">
                    "{{ file.name }}" file preview
                </h3>
                <h3 v-else>File preview</h3>
            </div>
            <div class="field">
                <div v-if="fileContent">
                    <div v-if="csvData?.headers.length">
                        <h4>Headers:</h4>
                        <ul v-for="(header, index) in csvData.headers" :key="index">
                            <li v-if="header">{{ header }}</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Content:</h4>
                        <div v-if="csvData">
                            <DataTable :value="csvData.parsedData">
                                <Column v-for="(header, index) in csvData.headers" :key="index" :field="header"
                                    :header="header" sortable />
                            </DataTable>
                        </div>
                        <div v-else>
                            <pre>{{ fileContent }}</pre>
                        </div>
                    </div>
                </div>
                <div v-else>File is empty.</div>
            </div>
        </div>
        <!-- <Card v-if="showPreview">
                <template #header>
                    <h3 v-if="file">
                        "{{ file.name }}" file preview
                    </h3>
                    <h3 v-else>File preview</h3>
                </template>
                <template #content>
                    <div v-if="fileContent">
                        <pre>{{ fileContent }}</pre>
                    </div>
                    <div v-else>File content is empty.</div>
                </template>
                <template #footer>
                    <div>
                        <Button label="Close" @submit="closeShowPreviewDialog" />
                    </div>
                </template>
            </Card> -->
    </div>
</template>