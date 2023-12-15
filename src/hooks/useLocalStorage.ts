import GenericService from "../services/GenericService"


export function useLocalStorage<M, R>(service: GenericService<M, R>, STORAGE_KEY: string) {
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

    return {
        addToLocalStorage,
        getFromLocalStorage,
        removeFromLocalStorage
    }
}