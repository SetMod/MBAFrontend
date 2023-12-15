import { ref } from "vue"
import Analyzes, { AssociationRules, IAnalyzesFullResponse } from "../models/AnalyzesModel"
import { analyzesService } from "../services/AnalyzesService"
import useState from "./useState"
import useCRUD from "./useCRUD"
import { usersService } from "../services/UsersService"
import { organizationsService } from "../services/OrganizationsService"

// const analyzesState = reactive<AnalyzesState>({
//     analyze: undefined,
//     analyzes: undefined,
//     reportAnalyzes: undefined,
//     userAnalyzes: undefined,
//     associationRules: undefined,
// })

const analyzesState = useState<Analyzes>()
const {
    error: analyzesError,
    isLoading: isAnalyzesLoading,
    model: analyze,
    models: analyzes,
    updatedModel: updatedAnalyze,
    newModel: newAnalyze,
    deletedModel: deletedAnalyze,
    getAllModels: getAnalyzes,
    getModelById: getAnalyzeById,
    getModelByField: getAnalyzeByField,
    getModelsByFields: getAnalyzesByFields,
    createModel: createAnalyze,
    updateModel: updateAnalyze,
    deleteModel: deleteAnalyze,
} = useCRUD(analyzesService, analyzesState)

export default function useAnalyzes() {
    // const downloadAnalyze = async (id: number) => {
    //     isAnalyzesLoading.value = true
    //     const response = await analyzesService.downloadAnalyzeById(id)
    //     isAnalyzesLoading.value = false

    //     return response
    // }

    // const createAnalyze = async (newAnalyze: Analyzes, fileId: number) => {
    //     isAnalyzesLoading.value = true
    //     const response = await analyzesService.createAnalyze(newAnalyze, fileId)
    //     if (Array.isArray(response)) analyzesState.associationRules = response
    //     isAnalyzesLoading.value = false

    //     return response
    // }

    const userAnalyzes = ref<Analyzes[]>([])
    const getUserAnalyzes = async (userId: number) => {
        isAnalyzesLoading.value = true
        analyzesError.value = null
        try {
            const analyzes = await usersService.getAnalyzes(userId)
            userAnalyzes.value = analyzes
        } catch (err) {
            if (err instanceof Error) {
                analyzesError.value = err
                userAnalyzes.value = []
            }
        } finally {
            isAnalyzesLoading.value = false
        }
    }

    const userAnalyzesFull = ref<IAnalyzesFullResponse[]>([])
    const getUserAnalyzesFull = async (userId: number) => {
        isAnalyzesLoading.value = true
        analyzesError.value = null
        try {
            const analyzes = await usersService.getAnalyzesFull(userId)
            userAnalyzesFull.value = analyzes
        } catch (err) {
            if (err instanceof Error) {
                analyzesError.value = err
                userAnalyzes.value = []
            }
        } finally {
            isAnalyzesLoading.value = false
        }
    }

    const organizationAnalyzesFull = ref<IAnalyzesFullResponse[]>([])
    const getOrganizationAnalyzesFull = async (orgId: number) => {
        isAnalyzesLoading.value = true
        analyzesError.value = null
        try {
            const analyzes = await organizationsService.getAnalyzesFull(orgId)
            organizationAnalyzesFull.value = analyzes
        } catch (err) {
            if (err instanceof Error) {
                analyzesError.value = err
                organizationAnalyzesFull.value = []
            }
        } finally {
            isAnalyzesLoading.value = false
        }
    }

    return {
        analyzesError,
        isAnalyzesLoading,
        analyze,
        analyzes,
        updatedAnalyze,
        newAnalyze,
        deletedAnalyze,
        userAnalyzes,
        organizationAnalyzesFull,
        userAnalyzesFull,
        getUserAnalyzesFull,
        getOrganizationAnalyzesFull,
        getUserAnalyzes,
        getAnalyzes,
        getAnalyzeById,
        getAnalyzeByField,
        getAnalyzesByFields,
        createAnalyze,
        updateAnalyze,
        deleteAnalyze,
    }
}