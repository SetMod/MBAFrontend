
import { reactive, ref, toRefs } from "vue"
import Files from "../models/FilesMode"
import { filesService } from "../services/FilesService"

export interface IFilesState {
    file: Files | undefined
    files: Files[] | undefined
}

const state = reactive<IFilesState>({
    file: undefined,
    files: undefined
})

export default function useFiles() {
    const isFilesLoading = ref(false)
    const getUserFiles = (userId: number) => {
        isFilesLoading.value = true
        filesService.getUserFiles(userId).then((files) => {
            if (Array.isArray(files)) state.files = files
        }).finally(() => isFilesLoading.value = false)
    }

    return {
        getUserFiles,
        isFilesLoading,
        ...toRefs(state)
    }
}