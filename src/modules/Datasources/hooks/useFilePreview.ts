import { FileUploadSelectEvent, FileUploadRemoveEvent } from "primevue/fileupload"
import { ref } from "vue"

const reader = new FileReader();
// const FILE_READ_CHUNK_SIZE = 1024 * 1024; // 1MB chunk size
const FILE_READ_CHUNK_SIZE = 1024 * 128; // 128KB chunk size


export default function useFilePreview() {
    const selectedFiles = ref<File[]>([])
    const file = ref<File>()
    const fileContent = ref()
    const readFullFile = ref(false)

    const onFileSelect = (event: FileUploadSelectEvent) => {
        selectedFiles.value = event.files

        if (event.files.length > 0) {
            file.value = event.files[0]
        }
    }

    const onFileRemove = (event: FileUploadRemoveEvent) => {
        selectedFiles.value = []
        fileContent.value = undefined
        file.value = undefined
    }

    const readFileContent = () => {
        let offset = 0;

        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (!e.target?.error) {
                const chunk = e.target?.result;
                const fileSize = file.value?.size
                fileContent.value += chunk;


                if (readFullFile.value && fileSize && offset < fileSize) {
                    readNextChunk(offset);
                }
            }
        };
        reader.onerror = (err: ProgressEvent<FileReader>) => {
            console.log(err);
        };

        const readNextChunk = (currentOffset: number) => {
            const blob = file.value?.slice(currentOffset, currentOffset + FILE_READ_CHUNK_SIZE);
            if (blob) {
                reader.readAsText(blob, "UTF-8");
                offset += FILE_READ_CHUNK_SIZE;
            }
        };

        readNextChunk(offset);
    }

    return {
        selectedFiles,
        file,
        fileContent,
        onFileSelect,
        onFileRemove,
        readFileContent
    }
}

export function useFileReader() {

}