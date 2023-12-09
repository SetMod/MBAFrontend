import { ref, toRefs } from "vue";
import GenericService from "../services/GenericService";
import { GenericState } from "./useState";


export default function useCRUD<M, R>(service: GenericService<M, R>, state: GenericState<M>, STORAGE_KEY: string) {
    const error = ref<Error | null>(null)
    const isLoading = ref(false)

    const addToLocalStorage = (model: M, KEY: string | undefined) => {
        const modelJson = service.mapModelToJSON(model)
        localStorage.setItem(KEY || STORAGE_KEY, JSON.stringify(modelJson))
    }

    const getFromLocalStorage = (KEY: string | undefined): M | null => {
        const modelJson = localStorage.getItem(KEY || STORAGE_KEY)
        if (!modelJson) return null
        return service.mapJSONToModel(JSON.parse(modelJson))
    }

    const removeFromLocalStorage = (KEY: string | undefined) => {
        localStorage.removeItem(KEY || STORAGE_KEY)
    }


    const getAllModels = async () => {
        isLoading.value = true
        error.value = null
        try {
            const res = await service.getAll()
            state.models = res

            return res
        } catch (err) {
            if (err instanceof Error) {
                error.value = err
            }
        } finally {
            isLoading.value = false
        }
    }

    const getModelById = async (id: number) => {
        isLoading.value = true
        error.value = null
        try {
            const res = await service.getById(id)
            state.model = res

            return res
        } catch (err) {
            if (err instanceof Error) {
                error.value = err
            }
        } finally {
            isLoading.value = false
        }
    }

    const getModelByField = async (fieldName: string, fieldValue: any) => {
        isLoading.value = true
        error.value = null
        try {
            const res = await service.getByField(fieldName, fieldValue)
            state.model = res

            return res
        } catch (err) {
            if (err instanceof Error) {
                error.value = err
            }
        } finally {
            isLoading.value = false
        }
    }

    const getModelsByFields = async (fields: Object, many?: boolean) => {
        isLoading.value = true
        error.value = null
        try {
            const res = await service.getByFields(fields, many)
            if (res instanceof Array) {
                state.models = res
            } else {
                state.model = res
            }

            return res
        } catch (err) {
            if (err instanceof Error) {
                error.value = err
            }
        } finally {
            isLoading.value = false
        }
    }

    const createModel = async (newModel: M) => {
        isLoading.value = true
        error.value = null
        try {
            const res = await service.create(newModel)
            state.newModel = res

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                error.value = err
            }
        } finally {
            isLoading.value = false
        }
    }

    const updateModel = async (id: number, updatedModel: M) => {
        isLoading.value = true
        error.value = null
        try {
            const res = await service.update(id, updatedModel)
            state.updatedModel = res

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                error.value = err
            }
        } finally {
            isLoading.value = false
        }
    }

    const softDeleteModel = async (id: number) => {
        isLoading.value = true
        error.value = null
        try {
            const res = await service.softDelete(id)
            state.deletedModel = res

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                error.value = err
            }
        } finally {
            isLoading.value = false
        }
    }

    const deleteModel = async (id: number) => {
        isLoading.value = true
        error.value = null
        try {
            const res = await service.delete(id)
            state.deletedModel = res

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                error.value = err
            }
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        error,
        ...toRefs(state),
        addToLocalStorage,
        getFromLocalStorage,
        removeFromLocalStorage,
        getAllModels,
        getModelById,
        getModelByField,
        getModelsByFields,
        createModel,
        updateModel,
        softDeleteModel,
        deleteModel,
    }
}