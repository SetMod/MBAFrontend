import { ref } from "vue"
import Datasources from "../models/DatasourcesModel"
import { datasourcesService } from "../services/DatasourcesService"
import useCRUD from "./useCRUD"
import useState from "./useState"

const DATASOURCES_STORAGE_KEY = "datasource"
const datasourcesState = useState<Datasources>()
const {
    error: datasourcesError,
    isLoading: isDatasourcesLoading,
    model: datasource,
    models: datasources,
    updatedModel: updatedDatasource,
    newModel: newDatasource,
    deletedModel: deletedDatasource,
    getFromLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage,
    getAllModels: getDatasources,
    getModelById: getDatasourceById,
    getModelByField: getDatasourceByField,
    getModelsByFields: getDatasourcesByFields,
    createModel: createDatasource,
    updateModel: updateDatasource,
    deleteModel: deleteDatasource,
} = useCRUD(datasourcesService, datasourcesState, DATASOURCES_STORAGE_KEY)
const userDatasources = ref<Datasources[] | null>()

export default function useDatasources() {

    const getUserDatasources = async (userId: number) => {
        isDatasourcesLoading.value = true
        datasourcesError.value = null
        try {
            const memberships = await datasourcesService.getUserDatasources(userId)
            userDatasources.value = memberships

        } catch (err) {
            if (err instanceof Error) {
                datasourcesError.value = err
                userDatasources.value = null
            }
        } finally {
            isDatasourcesLoading.value = false
        }
    }

    // const getDatasourcesAnalyzes = async (datasourceId: number) => {
    //     isLoading.value = true
    //     const response = await datasourcesService.getDatasourceAnalyzes(datasourceId)
    //     if (response instanceof Datasources) state.datasource = response
    //     isLoading.value = false

    //     return response
    // }


    return {
        userDatasources,
        datasourcesError,
        isDatasourcesLoading,
        datasource,
        datasources,
        updatedDatasource,
        newDatasource,
        deletedDatasource,
        getUserDatasources,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getDatasources,
        getDatasourceById,
        getDatasourceByField,
        getDatasourcesByFields,
        createDatasource,
        updateDatasource,
        deleteDatasource,
    }
}
