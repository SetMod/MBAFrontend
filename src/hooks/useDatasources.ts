import { ref } from "vue"
import Datasources, { IDatasourcesFullResponse } from "../models/DatasourcesModel"
import { datasourcesService } from "../services/DatasourcesService"
import useCRUD from "./useCRUD"
import useState from "./useState"
import { usersService } from "../services/UsersService"
import { organizationsService } from "../services/OrganizationsService"
import { filesService } from "../services/FileDatasourcesService"
import useVuelidate from "@vuelidate/core"
import { minLength, maxLength, required } from "@vuelidate/validators"

const datasourcesState = useState<Datasources>()
const userDatasources = ref<Datasources[] | null>(null)
const {
    error: datasourcesError,
    isLoading: isDatasourcesLoading,
    model: datasource,
    models: datasources,
    updatedModel: updatedDatasource,
    newModel: newDatasource,
    deletedModel: deletedDatasource,
    getAllModels: getDatasources,
    getModelById: getDatasourceById,
    getModelByField: getDatasourceByField,
    getModelsByFields: getDatasourcesByFields,
    createModel: createDatasource,
    updateModel: updateDatasource,
    deleteModel: deleteDatasource,
} = useCRUD(datasourcesService, datasourcesState)

export function useDatasourceCreateValidate(datasourceState: Datasources) {
    const datasourceRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(50) },
        type: { required }
    }
    const datasourceValidate = useVuelidate(datasourceRules, datasourceState)
    return {
        datasourceValidate,
        datasourceState,
        datasourceRules
    }
}

export default function useDatasources() {

    const createFileDatasource = async (file: Datasources, form: FormData) => {
        isDatasourcesLoading.value = true
        datasourcesError.value = null
        try {
            const res = await filesService.createFile(file, form)

        } catch (err) {
            if (err instanceof Error) {
                datasourcesError.value = err
            }
        } finally {
            isDatasourcesLoading.value = false
        }
    }
    const downloadFileDatasource = async (datasourceId: number) => {
        isDatasourcesLoading.value = true
        datasourcesError.value = null
        try {
            await filesService.downloadFileById(datasourceId)
        } catch (err) {
            if (err instanceof Error) {
                datasourcesError.value = err
            }
        } finally {
            isDatasourcesLoading.value = false
        }
    }

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


    const userDatasourcesFull = ref<IDatasourcesFullResponse[]>([])
    const getUserDatasourcesFull = async (userId: number) => {
        isDatasourcesLoading.value = true
        datasourcesError.value = null
        try {
            const datasources = await usersService.getDatasourcesFull(userId)
            userDatasourcesFull.value = datasources
        } catch (err) {
            if (err instanceof Error) {
                datasourcesError.value = err
                userDatasourcesFull.value = []
            }
        } finally {
            isDatasourcesLoading.value = false
        }
    }

    const organizationDatasourcesFull = ref<IDatasourcesFullResponse[]>([])
    const getOrganizationsDatasourcesFull = async (orgId: number) => {
        isDatasourcesLoading.value = true
        datasourcesError.value = null
        try {
            const datasources = await organizationsService.getDatasourcesFull(orgId)
            organizationDatasourcesFull.value = datasources
        } catch (err) {
            if (err instanceof Error) {
                datasourcesError.value = err
                organizationDatasourcesFull.value = []
            }
        } finally {
            isDatasourcesLoading.value = false
        }
    }

    return {
        userDatasources,
        datasourcesError,
        isDatasourcesLoading,
        datasource,
        datasources,
        updatedDatasource,
        newDatasource,
        deletedDatasource,
        userDatasourcesFull,
        organizationDatasourcesFull,
        getOrganizationsDatasourcesFull,
        getUserDatasourcesFull,
        getUserDatasources,
        getDatasources,
        getDatasourceById,
        getDatasourceByField,
        getDatasourcesByFields,
        createDatasource,
        downloadFileDatasource,
        createFileDatasource,
        updateDatasource,
        deleteDatasource,
    }
}
