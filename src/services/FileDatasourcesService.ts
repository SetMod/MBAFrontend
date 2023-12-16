import axios, { AxiosError } from "axios";
import Datasources, { IDatasourcesResponse } from "../models/DatasourcesModel"
import DatasourcesService from "./DatasourcesService";

export default class FileDatasourcesService extends DatasourcesService {

    async downloadFileById(fileId: number) {
        try {
            console.log(`Downloading file with id=${fileId}`);

            const res = await this.api.get(`${this.url}/download/${fileId}`, { responseType: 'blob' })
            console.log(res)

            const blob = new Blob([res.data], { type: res.data.type })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = `file_datasource_${fileId}`
            // link.download = fileDatasource.name ? fileDatasource.name : 'Untitled'
            link.click()

            // const file: Files = this.mapDataToFile(response.data)
            // console.log(file)
            // return file
        } catch (err) {
            let errorMessage = "Failed to download file"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async createFile(file: Datasources, formData: FormData) {
        try {
            console.log('Creating file datasource');

            formData.append('file_datasource', JSON.stringify(file.toJSON()))

            const res = await this.api.post(
                `${this.url}/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            console.log(res)

            const newFileDatasource: Datasources = this.mapJSONToModel(res.data)
            console.log(newFileDatasource)

            return newFileDatasource
        } catch (err) {
            let errorMessage = "Failed to create file datasource"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
}

export const filesService = new FileDatasourcesService()
