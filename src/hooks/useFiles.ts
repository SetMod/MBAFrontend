import { reactive, ref, toRefs } from "vue";
import FileDatasourcesModel from "../models/FileDatasourcesModel"
import FilesService from "../services/FileDatasourcesService";

export interface IFilesState {
    file: FileDatasourcesModel | undefined
    files: FileDatasourcesModel[] | undefined
    userFiles: FileDatasourcesModel[] | undefined
}

const state = reactive<IFilesState>({
    file: undefined,
    files: undefined,
    userFiles: undefined
})

export default function useFiles() {
    const filesService = reactive(new FilesService())
    const isLoading = ref(false)

    const resetFiles = () => {
        state.file = undefined
        state.files = undefined
        state.userFiles = undefined
    }

    const getFiles = async () => {
        isLoading.value = true
        const response = await filesService.getAll()
        if (Array.isArray(response)) state.files = response
        isLoading.value = false

        return response
    }
    const getFileById = async (fileId: number) => {
        isLoading.value = true
        const response = await filesService.getById(fileId)
        isLoading.value = false

        return response
    }
    const getUserFiles = async (userId: number) => {
        isLoading.value = true
        const response = await filesService.getUserFiles(userId)
        if (Array.isArray(response)) state.userFiles = response
        isLoading.value = false

        return response
    }
    const downloadFile = async (fileId: number) => {
        // isLoading.value = true
        const response = await filesService.downloadFileById(fileId)
        // isLoading.value = false
        return response
    }
    const createFile = async (file: FileDatasourcesModel, form: FormData) => {
        isLoading.value = true
        const response = await filesService.createFile(file, form)
        isLoading.value = false

        return response
    }
    const updateFile = async (file: FileDatasourcesModel) => {
        isLoading.value = true
        const response = await filesService.update(file)
        isLoading.value = false

        return response
    }
    const deleteFile = async (fileId: number) => {
        isLoading.value = true
        const response = await filesService.delete(fileId)
        isLoading.value = false

        return response
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
        ...toRefs(state)
    }
}