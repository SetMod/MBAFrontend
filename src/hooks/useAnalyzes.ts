import { ref } from "vue"
import Analyzes, { AssociationRules } from "../models/AnalyzesModel"
import { analyzesService } from "../services/AnalyzesService"
import useState from "./useState"
import useCRUD from "./useCRUD"


const DATASOURCES_STORAGE_KEY = "analyze"
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
    getFromLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage,
    getAllModels: getAnalyzes,
    getModelById: getAnalyzeById,
    getModelByField: getAnalyzeByField,
    getModelsByFields: getAnalyzesByFields,
    createModel: createAnalyze,
    updateModel: updateAnalyze,
    deleteModel: deleteAnalyze,
} = useCRUD(analyzesService, analyzesState, DATASOURCES_STORAGE_KEY)
const userAnalyzes = ref<Analyzes[] | null>()

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

    const getUserAnalyzes = async (userId: number) => {
        isAnalyzesLoading.value = true
        analyzesError.value = null
        try {
            const memberships = await analyzesService.getUserAnalyzes(userId)
            userAnalyzes.value = memberships

        } catch (err) {
            if (err instanceof Error) {
                analyzesError.value = err
                userAnalyzes.value = null
            }
        } finally {
            isAnalyzesLoading.value = false
        }
    }

    return {
        userAnalyzes,
        analyzesError,
        isAnalyzesLoading,
        analyze,
        analyzes,
        updatedAnalyze,
        newAnalyze,
        deletedAnalyze,
        getUserAnalyzes,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getAnalyzes,
        getAnalyzeById,
        getAnalyzeByField,
        getAnalyzesByFields,
        createAnalyze,
        updateAnalyze,
        deleteAnalyze,
    }
}