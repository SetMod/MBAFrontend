import { reactive, ref, toRefs } from "vue";
import Files from "../models/FilesModel"
import FilesService from "../services/FilesService";
import useUsers from "./useUsers";


export interface IFilesState {
    file: Files | undefined
    files: Files[] | undefined
}

const state = reactive<IFilesState>({
    file: undefined,
    files: undefined
})

export default function useFiles() {
    const filesService = reactive(new FilesService())
    const isLoading = ref(false)
    const { user, isLoggedIn } = useUsers()

    const resetFiles = () => {
        state.file = undefined
        state.files = undefined
    }

    const getFiles = async () => {
        isLoading.value = true
        const response = await filesService.getFiles()
        state.files = Array.isArray(response) ? response : undefined
        isLoading.value = false

        return response
    }
    const getFileById = async (fileId: number) => {
        isLoading.value = true
        const response = await filesService.getFileById(fileId)
        isLoading.value = false

        return response
    }
    const getUserFiles = async (userId: number) => {
        isLoading.value = true
        const response = await filesService.getUserFiles(userId)
        state.files = Array.isArray(response) ? response : undefined
        isLoading.value = false

        return response
    }
    const downloadFile = async (fileId: number) => {
        isLoading.value = true
        const response = await filesService.downloadFileById(fileId)
        isLoading.value = false
        return response
    }
    const createFile = async (file: Files, form: FormData) => {
        isLoading.value = true
        const response = await filesService.createFile(file, form)
        isLoading.value = false

        return response
    }
    const updateFile = async (file: Files) => {
        isLoading.value = true
        const response = await filesService.updateFile(file)
        isLoading.value = false

        return response
    }
    const deleteFile = async (fileId: number) => {
        isLoading.value = true
        const response = await filesService.deleteFile(fileId)
        isLoading.value = false

        return response
    }
    const refreshFiles = async () => {
        if (isLoggedIn.value && user.value) await getUserFiles(user.value.userId)
    }
    return {
        isFilesLoading: isLoading,
        getFiles,
        getFileById,
        getUserFiles,
        downloadFile,
        createFile,
        updateFile,
        deleteFile,
        resetFiles,
        refreshFiles,
        ...toRefs(state)
    }
}