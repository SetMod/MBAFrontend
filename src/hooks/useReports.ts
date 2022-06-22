import { reactive, ref, toRefs } from "vue"
import Reports from "../models/ReportsModel"
import ReportsService from "../services/ReportsService"

export interface ReportsState {
    report: Reports | undefined
    reports: Reports[] | undefined
    userReports: Reports[] | undefined
}

const state = reactive<ReportsState>({
    report: undefined,
    reports: undefined,
    userReports: undefined,
})

export default function useReports() {
    const reportsService = reactive(new ReportsService())
    const isLoading = ref(false)

    const resetReports = () => {
        state.report = undefined
        state.reports = undefined
        state.userReports = undefined
    }

    const getReports = async () => {
        isLoading.value = true
        const response = await reportsService.getReports()
        if (Array.isArray(response)) state.reports = response
        isLoading.value = false

        return response
    }

    const getUserReports = async (userId: number) => {
        isLoading.value = true
        const response = await reportsService.getUserReports(userId)
        if (Array.isArray(response)) state.userReports = response
        isLoading.value = false

        return response
    }

    const getReportsById = async (reportId: number) => {
        isLoading.value = true
        const response = await reportsService.getReportById(reportId)
        if (response instanceof Reports) state.report = response
        isLoading.value = false

        return response
    }
    const getReportsAnalyzes = async (reportId: number) => {
        isLoading.value = true
        const response = await reportsService.getReportAnalyzes(reportId)
        if (response instanceof Reports) state.report = response
        isLoading.value = false

        return response
    }

    const createReport = async (newReport: Reports) => {
        isLoading.value = true
        const response = await reportsService.createReport(newReport)
        isLoading.value = false

        return response
    }

    const updateReport = async (updatedReport: Reports) => {
        isLoading.value = true
        const response = await reportsService.updateReport(updatedReport)
        isLoading.value = false

        return response
    }

    const deleteReport = async (reportId: number) => {
        isLoading.value = true
        const response = await reportsService.deleteReport(reportId)
        isLoading.value = false

        return response
    }

    return {
        resetReports,
        getReports,
        getUserReports,
        getReportsById,
        createReport,
        updateReport,
        deleteReport,
        isReportsLoading: isLoading,
        ...toRefs(state)
    }
}