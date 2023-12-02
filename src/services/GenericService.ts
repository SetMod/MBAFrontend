import { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import { api } from "../config";

export default class GenericService<M, R> {
    api: AxiosInstance;
    url: string = ''

    constructor(url: string) {
        this.url = url
        this.api = api
    }

    mapJSONToModel(data: R): M {
        throw new Error('mapJSONToModel method must be implemented in subclasses')
    }

    mapJSONToModels(data: R[]): M[] {
        let models = new Array<M>()
        for (let modelJson of data) {
            models.push(this.mapJSONToModel(modelJson))
        }
        return models
    }

    mapModelToJSON(model: M): R {
        throw new Error('mapModelToJSON method must be implemented in subclasses')
    }

    mapModelsToJSON(models: M[]): R[] {
        let data = new Array<R>()
        for (var model of models) {
            data.push(this.mapModelToJSON(model))
        }
        return data
    }

    async getAll() {
        try {
            const res = await this.api.get(`${this.url}/`)
            console.log(res)

            const models = this.mapJSONToModels(res.data)
            console.log(models)

            return models

        } catch (err) {
            let errorMessage = "Failed to get all"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getById(id: number) {
        try {
            const res = await this.api.get<M, AxiosResponse<R>>(`${this.url}/${id}`)
            console.log(res)

            const model = this.mapJSONToModel(res.data)
            console.log(model)

            return model
        } catch (err) {
            let errorMessage = 'Failed to get by id'
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getByField(fieldName: string, fieldValue: string) {
        try {
            const res = await this.api.get(`${this.url}/`, {
                params: {
                    [fieldName]: fieldValue
                }
            })
            console.log(res)

            const model = this.mapJSONToModel(res.data)
            console.log(model)

            return model
        } catch (err) {
            let errorMessage = 'Failed to get by field'
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getByFields(fields: Object) {
        try {
            const res = await this.api.get(`${this.url}/`, {
                params: fields
            })
            console.log(res)

            const models = this.mapJSONToModels(res.data)
            console.log(models)

            return models
        } catch (err) {
            let errorMessage = 'Failed to get by fields'
            console.log(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async create(model: M) {
        try {
            const modelJson = this.mapModelToJSON(model)
            console.log(modelJson)

            const res = await this.api.post(`${this.url}/`, modelJson)
            console.log(res)

            const newModel = this.mapJSONToModel(res.data)
            console.log(newModel)

            return newModel
        } catch (err) {
            let errorMessage = 'Failed to create'
            console.log(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async update(id: number, model: M) {
        try {
            const modelJson = this.mapModelToJSON(model)
            console.log(modelJson)

            const res = await this.api.put(`${this.url}/${id}`, modelJson)
            console.log(res)

            const updatedModel = this.mapJSONToModel(res.data)
            console.log(updatedModel)

            return updatedModel
        } catch (err) {
            let errorMessage = 'Failed to update'
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async delete(id: number) {
        try {
            const res = await this.api.delete(`${this.url}/${id}`)
            console.log(res)

            const deletedModel = this.mapJSONToModel(res.data)
            console.log(deletedModel)

            return deletedModel
        } catch (err) {
            let errorMessage = 'Failed to delete'
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
    async softDelete(id: number) {
        try {
            const res = await this.api.delete(`${this.url}/soft/${id}`)
            console.log(res)

            const deletedModel = this.mapJSONToModel(res.data)
            console.log(deletedModel)

            return deletedModel
        } catch (err) {
            let errorMessage = 'Failed to soft delete'
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
}