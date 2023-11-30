import axios, { AxiosError, AxiosResponse } from "axios"

export default class GenericService<M, R> {
    endpoint: string = ''

    setEndpoint(endpoint: string) {
        this.endpoint = endpoint
    }

    mapJSONToModel(data: R | R[]): M | M[] {
        throw new Error('mapJSONToModel method must be implemented in subclasses')
    }

    mapModelToJSON(model: M | M[]): R | R[] {
        throw new Error('mapModelToJSON method must be implemented in subclasses')
    }

    async getAll() {
        try {
            // const res = await axios.get<M[], AxiosResponse<R[]>>(`${this.endpoint}/`)
            const res = await axios.get(`${this.endpoint}/`)
            console.log(res)

            const models = this.mapJSONToModel(res.data)
            console.log(models)

            return models

        } catch (error) {
            const errorMessage = "Failed to get all"
            console.error(errorMessage)
            if (error instanceof AxiosError && typeof error.response?.data === 'string')
                throw new Error(error.response?.data)
            throw new Error(errorMessage)
        }
    }

    async getById(id: number) {
        try {
            const res = await axios.get<M, AxiosResponse<R>>(`${this.endpoint}/${id}`)
            console.log(res)

            const model = this.mapJSONToModel(res.data)
            console.log(model)

            return model
        } catch (error) {
            const errorMessage = 'Failed to get by id'
            console.error(errorMessage)
            if (error instanceof AxiosError && typeof error.response?.data === 'string')
                throw new Error(error.response?.data)
            throw new Error(errorMessage)
        }
    }

    async getByField(fieldName: string, fieldValue: string) {
        try {
            const res = await axios.get(`${this.endpoint}/?${fieldName}=${fieldValue}`)
            console.log(res)

            const model = this.mapJSONToModel(res.data)
            console.log(model)

            return model
        } catch (error) {
            const errorMessage = 'Failed to get by field'
            console.error(errorMessage)
            if (error instanceof AxiosError && typeof error.response?.data === 'string')
                throw new Error(error.response?.data)
            throw new Error(errorMessage)
        }
    }

    async getByFields(fields: Object) {
        try {
            const res = await axios.get(`${this.endpoint}/${fields}`) // Re-do
            console.log(res)

            const models = this.mapJSONToModel(res.data)
            console.log(models)

            return models
        } catch (error) {
            const errorMessage = 'Failed to get by fields'
            console.log(errorMessage)
            if (error instanceof AxiosError && typeof error.response?.data === 'string')
                throw new Error(error.response?.data)
            throw new Error(errorMessage)
        }
    }

    async create(model: M) {
        try {
            const modelJson = this.mapModelToJSON(model)
            console.log(modelJson)

            const res = await axios.post(`${this.endpoint}/`, modelJson)
            console.log(res)

            const newModel = this.mapJSONToModel(res.data)
            console.log(newModel)

            return newModel
        } catch (error) {
            const errorMessage = 'Failed to create'
            console.log(errorMessage)
            if (error instanceof AxiosError && typeof error.response?.data === 'string')
                throw new Error(error.response?.data)
            throw new Error(errorMessage)
        }
    }

    async update(id: number, model: M) {
        try {
            const modelJson = this.mapModelToJSON(model)
            console.log(modelJson)

            const res = await axios.put(`${this.endpoint}/${id}`, modelJson)
            console.log(res)

            const updatedModel = this.mapJSONToModel(res.data)
            console.log(updatedModel)

            return updatedModel
        } catch (error) {
            const errorMessage = 'Failed to update'
            console.error(errorMessage)
            if (error instanceof AxiosError && typeof error.response?.data === 'string')
                throw new Error(error.response?.data)
            throw new Error(errorMessage)
        }
    }

    async delete(id: number) {
        try {
            const res = await axios.delete(`${this.endpoint}/${id}`)
            console.log(res)

            const deletedModel = this.mapJSONToModel(res.data)
            console.log(deletedModel)

            return deletedModel
        } catch (error) {
            const errorMessage = 'Failed to delete'
            console.error(errorMessage)
            if (error instanceof AxiosError && typeof error.response?.data === 'string')
                throw new Error(error.response?.data)
            throw new Error(errorMessage)
        }
    }
    async softDelete(id: number) {
        try {
            const res = await axios.delete(`${this.endpoint}/soft/${id}`)
            console.log(res)

            const deletedModel = this.mapJSONToModel(res.data)
            console.log(deletedModel)

            return deletedModel
        } catch (error) {
            const errorMessage = 'Failed to soft delete'
            console.error(errorMessage)
            if (error instanceof AxiosError && typeof error.response?.data === 'string')
                throw new Error(error.response?.data)
            throw new Error(errorMessage)
        }
    }
}