import { ref } from "vue"
import Reports from "../models/ReportsModel"
import { reportsService } from "../services/ReportsService"
import useCRUD from "./useCRUD"
import useState from "./useState"

const REPORTS_STORAGE_KEY = "report"
const reportsState = useState<Reports>()
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
} = useCRUD(reportsService, reportsState, REPORTS_STORAGE_KEY)
const userReports = ref<Reports[] | null>()

export default function useReports() {

    // const getUserReports = async (userId: number) => {
    //     isLoading.value = true
    //     const response = await reportsService.getUserReports(userId)
    //     if (Array.isArray(response)) state.userReports = response
    //     isLoading.value = false

    //     return response
    // }

    const getUserReports = async (userId: number) => {
        isReportsLoading.value = true
        reportsError.value = null
        try {
            const memberships = await reportsService.getUserReports(userId)
            userReports.value = memberships

        } catch (err) {
            if (err instanceof Error) {
                reportsError.value = err
                userReports.value = null
            }
        } finally {
            isReportsLoading.value = false
        }
    }

    // const getReportsAnalyzes = async (reportId: number) => {
    //     isLoading.value = true
    //     const response = await reportsService.getReportAnalyzes(reportId)
    //     if (response instanceof Reports) state.report = response
    //     isLoading.value = false

    //     return response
    // }


    return {
        userReports,
        reportsError,
        isReportsLoading,
        report,
        reports,
        updatedReport,
        newReport,
        deletedReport,
        getUserReports,
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
