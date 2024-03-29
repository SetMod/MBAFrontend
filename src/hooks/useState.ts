import { reactive } from "vue";

export interface GenericState<M> {
    models: M[],
    model: M | null
    newModel: M | null
    updatedModel: M | null
    deletedModel: M | null
}

export default function useState<M>() {
    const state = reactive<GenericState<M>>({
        model: null,
        models: [],
        newModel: null,
        updatedModel: null,
        deletedModel: null
    })

    return state
}