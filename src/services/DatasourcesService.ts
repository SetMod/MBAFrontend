import axios, { AxiosError } from "axios";
import Datasources, { IDatasourcesResponse } from "../models/DatasourcesModel"
import GenericService from "./GenericService";


export default class DatasourcesService extends GenericService<Datasources, IDatasourcesResponse> {

    constructor() {
        super("/datasources")
    }

    mapJSONToModel(datasourceJson: IDatasourcesResponse): Datasources {
        return Datasources.fromJSON(datasourceJson)
    }

    mapModelToJSON(datasource: Datasources): IDatasourcesResponse {
        return Datasources.toJSON(datasource)
    }

    async downloadFileById(fileId: number) {
        try {
            const fileDatasource = await this.getById(fileId)

            if (fileDatasource instanceof Array) throw new Error('Failed to download file')

            const res = await axios.get(`/download/${fileId}`, { responseType: 'blob' })
            console.log(res)

            const blob = new Blob([res.data], { type: res.data.type })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = fileDatasource.name ? fileDatasource.name : 'Untitled'
            link.click()

            // const file: Files = this.mapDataToFile(response.data)
            // console.log(file)
            // return file
        } catch (error) {
            const errorMessage = 'Failed to download the file'
            console.error(errorMessage)
            console.error(error)

            throw new Error(errorMessage)
        }
    }

    async createFile(file: Datasources, form: FormData) {
        try {
            // const dataFile = this.mapFileToData(file)
            const res = await axios.post(`/upload`
                , form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    "name": file.name ? file.name : 'Untitled',
                    "id": file.id
                }
            })
            console.log(res)

            const newFileDatasource: Datasources = this.mapJSONToModel(res.data)
            console.log(newFileDatasource)

            return newFileDatasource
        } catch (error) {
            const errorMessage = 'Filed adding the file'
            console.error(errorMessage)
            console.error(error)

            throw new Error(errorMessage)
        }
    }

    async getUserDatasources(userId: number) {
        try {
            console.log(`Getting all user datasources with id='${userId}'`);
            const res = await this.api.get(`/users/${userId}/datasources`)
            console.log(res)

            const models = this.mapJSONToModels(res.data)
            console.log(models)

            return models

        } catch (err) {
            let errorMessage = "Failed to get all user datasources"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

}

export const datasourcesService = new DatasourcesService()
