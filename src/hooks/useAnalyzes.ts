import { reactive, ref, toRefs } from "vue"
import Analyzes from "../models/AnalyzesModel"
import AssociationRules from "../models/AssociationRulesModel"
import AnalyzesService from "../services/AnalyzeService"

export interface AnalyzesState {
    analyze: Analyzes | undefined
    analyzes: Analyzes[] | undefined
    reportAnalyzes: Analyzes[] | undefined
    userAnalyzes: Analyzes[] | undefined
    associationRules: AssociationRules[] | undefined
}

const state = reactive<AnalyzesState>({
    analyze: undefined,
    analyzes: undefined,
    reportAnalyzes: undefined,
    userAnalyzes: undefined,
    associationRules: undefined,
})

export default function useAnalyzes() {
    const analyzesService = reactive(new AnalyzesService())
    const isLoading = ref(false)

    const resetAnalyzes = () => {
        state.analyze = undefined
        state.analyzes = undefined
        state.reportAnalyzes = undefined
        state.userAnalyzes = undefined
    }

    const getAnalyzes = async () => {
        isLoading.value = true
        const response = await analyzesService.getAll()
        if (Array.isArray(response)) state.analyzes = response
        isLoading.value = false

        return response
    }

    const getAnalyzeById = async (id: number) => {
        isLoading.value = true
        const response = await analyzesService.getById(id)
        if (response instanceof Analyzes) state.analyze = response
        isLoading.value = false

        return response
    }
    const downloadAnalyze = async (id: number) => {
        isLoading.value = true
        const response = await analyzesService.downloadAnalyzeById(id)
        isLoading.value = false

        return response
    }

    const getReportAnalyzes = async (reportId: number) => {
        isLoading.value = true
        const response = await analyzesService.getReportAnalyzes(reportId)
        if (Array.isArray(response)) state.reportAnalyzes = response
        isLoading.value = false

        return response
    }

    const createAnalyze = async (newAnalyze: Analyzes, fileId: number) => {
        isLoading.value = true
        const response = await analyzesService.createAnalyze(newAnalyze, fileId)
        if (Array.isArray(response)) state.associationRules = response
        isLoading.value = false

        return response
    }

    const updateAnalyze = async (updatedAnalyze: Analyzes) => {
        isLoading.value = true
        const response = await analyzesService.updateAnalyze(updatedAnalyze)
        isLoading.value = false

        return response
    }

    const deleteAnalyze = async (id: number) => {
        isLoading.value = true
        const response = await analyzesService.deleteAnalyze(id)
        isLoading.value = false

        return response
    }

    return {
        resetAnalyzes,
        getAnalyzes,
        getAnalyzeById,
        downloadAnalyze,
        getReportAnalyzes,
        createAnalyze,
        updateAnalyze,
        deleteAnalyze,
        isAnalyzesLoading: isLoading,
        ...toRefs(state)
    }
}