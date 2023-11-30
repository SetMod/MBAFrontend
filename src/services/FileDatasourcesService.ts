import axios from "axios";
import config from "../config";
import FileDatasourcesModel, { FileDatasourcesResponse } from "../models/FileDatasourcesModel";
import GenericService from "./GenericService";


export default class FileDatasourcesService extends GenericService<FileDatasourcesModel, FileDatasourcesResponse> {

    constructor() {
        super()
        this.setEndpoint(`${config.baseUrl}/datasources`)
    }

    async downloadFileById(fileId: number) {
        try {
            const fileDatasource = await this.getById(fileId)

            if (fileDatasource instanceof Array) throw new Error('Failed to download file')

            const res = await axios.get(`${this.endpoint}/download/${fileId}`, { responseType: 'blob' })
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
    async createFile(file: FileDatasourcesModel, form: FormData) {
        try {
            // const dataFile = this.mapFileToData(file)
            const res = await axios.post(`${this.endpoint}/upload?name=${file.name ? file.name : 'Untitled'}&datasource_id=${file.datasourceId}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res)

            const newFileDatasource: FileDatasourcesModel = this.mapDataToFile(res.data)
            console.log(newFileDatasource)

            return newFileDatasource
        } catch (error) {
            const errorMessage = 'Filed adding the file'
            console.error(errorMessage)
            console.error(error)
            throw new Error(errorMessage)
        }
    }
}

export const filesService = new FileDatasourcesService()