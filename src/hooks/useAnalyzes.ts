import { reactive, ref, toRefs } from "vue"
import Analyzes from "../models/AnalyzesModel"
import AnalyzesService from "../services/AnalyzeService"

export interface AnalyzesState {
    analyze: Analyzes | undefined
    analyzes: Analyzes[] | undefined
    reportAnalyzes: Analyzes[] | undefined
    userAnalyzes: Analyzes[] | undefined
}

const state = reactive<AnalyzesState>({
    analyze: undefined,
    analyzes: undefined,
    reportAnalyzes: undefined,
    userAnalyzes: undefined,
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
        const response = await analyzesService.getAnalyzes()
        if (Array.isArray(response)) state.analyzes = response
        isLoading.value = false

        return response
    }

    const getAnalyzeById = async (analyzeId: number) => {
        isLoading.value = true
        const response = await analyzesService.getAnalyzeById(analyzeId)
        if (response instanceof Analyzes) state.analyze = response
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
    const getUserAnalyzes = async (reportId: number) => {
        isLoading.value = true
        const response = await analyzesService.getUserAnalyzes(reportId)
        if (Array.isArray(response)) state.userAnalyzes = response
        isLoading.value = false

        return response
    }

    const createAnalyze = async (newAnalyze: Analyzes) => {
        isLoading.value = true
        const response = await analyzesService.createAnalyze(newAnalyze)
        isLoading.value = false

        return response
    }

    const updateAnalyze = async (updatedAnalyze: Analyzes) => {
        isLoading.value = true
        const response = await analyzesService.updateAnalyze(updatedAnalyze)
        isLoading.value = false

        return response
    }

    const deleteAnalyze = async (reportId: number) => {
        isLoading.value = true
        const response = await analyzesService.deleteAnalyze(reportId)
        isLoading.value = false

        return response
    }

    return {
        resetAnalyzes,
        getAnalyzes,
        getAnalyzeById,
        getReportAnalyzes,
        getUserAnalyzes,
        createAnalyze,
        updateAnalyze,
        deleteAnalyze,
        isAnalyzesLoading: isLoading,
        ...toRefs(state)
    }
}