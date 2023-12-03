import { reportsService } from "../services/ReportsService"
import useCRUD from "./useCRUD"

const REPORTS_STORAGE_KEY = "report"
export default function useReports() {
    const {
        error: reportsError,
        isLoading: isReportsLoading,
        model: report,
        models: reports,
        updatedModel: updatedReport,
        newModel: newReport,
        deletedModel: deletedReport,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getAllModels: getReports,
        getModelById: getReportById,
        getModelByField: getReportByField,
        getModelsByFields: getReportsByFields,
        createModel: createReport,
        updateModel: updateReport,
        deleteModel: deleteReport,
    } = useCRUD(reportsService, REPORTS_STORAGE_KEY)

    // const getUserReports = async (userId: number) => {
    //     isLoading.value = true
    //     const response = await reportsService.getUserReports(userId)
    //     if (Array.isArray(response)) state.userReports = response
    //     isLoading.value = false

    //     return response
    // }

    // const getReportsAnalyzes = async (reportId: number) => {
    //     isLoading.value = true
    //     const response = await reportsService.getReportAnalyzes(reportId)
    //     if (response instanceof Reports) state.report = response
    //     isLoading.value = false

    //     return response
    // }


    return {
        reportsError,
        isReportsLoading,
        report,
        reports,
        updatedReport,
        newReport,
        deletedReport,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getReports,
        getReportById,
        getReportByField,
        getReportsByFields,
        createReport,
        updateReport,
        deleteReport,
    }
}
