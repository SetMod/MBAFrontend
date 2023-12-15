import { ref } from "vue"
import Reports, { IReportsFullResponse } from "../models/ReportsModel"
import { reportsService } from "../services/ReportsService"
import useCRUD from "./useCRUD"
import useState from "./useState"
import { useLocalStorage } from "./useLocalStorage"
import { usersService } from "../services/UsersService"
import { organizationsService } from "../services/OrganizationsService"

const REPORTS_STORAGE_KEY = "report"
const reportsState = useState<Reports>()
const {
    getFromLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage
} = useLocalStorage(reportsService, REPORTS_STORAGE_KEY)

const {
    error: reportsError,
    isLoading: isReportsLoading,
    model: report,
    models: reports,
    updatedModel: updatedReport,
    newModel: newReport,
    deletedModel: deletedReport,
    getAllModels: getReports,
    getModelById: getReportById,
    getModelByField: getReportByField,
    getModelsByFields: getReportsByFields,
    createModel: createReport,
    updateModel: updateReport,
    deleteModel: deleteReport,
} = useCRUD(reportsService, reportsState)

export default function useReports() {

    // const getUserReports = async (userId: number) => {
    //     isLoading.value = true
    //     const response = await reportsService.getUserReports(userId)
    //     if (Array.isArray(response)) state.userReports = response
    //     isLoading.value = false

    //     return response
    // }

    const userReportsFull = ref<IReportsFullResponse[]>([])
    const getUserReportsFull = async (userId: number) => {
        isReportsLoading.value = true
        reportsError.value = null
        try {
            const reports = await usersService.getReportsFull(userId)
            userReportsFull.value = reports
        } catch (err) {
            if (err instanceof Error) {
                reportsError.value = err
                userReportsFull.value = []
            }
        } finally {
            isReportsLoading.value = false
        }
    }

    const organizationReportsFull = ref<IReportsFullResponse[]>([])
    const getOrganizationsReportsFull = async (orgId: number) => {
        isReportsLoading.value = true
        reportsError.value = null
        try {
            const reports = await organizationsService.getReportsFull(orgId)
            organizationReportsFull.value = reports
        } catch (err) {
            if (err instanceof Error) {
                reportsError.value = err
                organizationReportsFull.value = []
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
        reportsError,
        isReportsLoading,
        report,
        reports,
        updatedReport,
        newReport,
        deletedReport,
        userReportsFull,
        organizationReportsFull,
        getOrganizationsReportsFull,
        getUserReportsFull,
        getReports,
        getReportById,
        getReportByField,
        getReportsByFields,
        createReport,
        updateReport,
        deleteReport,
    }
}
