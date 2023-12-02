import axios from "axios";
import FileDatasourcesModel, { FileDatasourcesResponse } from "../models/DatasourcesModel"
import GenericService from "./GenericService";


export default class FileDatasourcesService extends GenericService<FileDatasourcesModel, FileDatasourcesResponse> {

    constructor() {
        super("/datasources")
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
    async createFile(file: FileDatasourcesModel, form: FormData) {
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

            const newFileDatasource: FileDatasourcesModel = this.mapJSONToModel(res.data)
            console.log(newFileDatasource)

            return newFileDatasource
        } catch (error) {
            const errorMessage = 'Filed adding the file'
            console.error(errorMessage)
            console.error(error)

            throw new Error(errorMessage)
        }
    }


    mapJSONToModel(fileDatasourcesJson: FileDatasourcesResponse): FileDatasourcesModel {
        const fileDatasource = new FileDatasourcesModel()
        fileDatasource.id = fileDatasourcesJson.id
        fileDatasource.name = fileDatasourcesJson.name
        fileDatasource.type = fileDatasourcesJson.type
        fileDatasource.creatorId = fileDatasourcesJson.creator_id
        fileDatasource.createdDate = fileDatasourcesJson.created_date
        fileDatasource.updatedDate = fileDatasourcesJson.updated_date
        fileDatasource.deletedDate = fileDatasourcesJson.deleted_date
        fileDatasource.softDeleted = fileDatasourcesJson.soft_deleted

        return fileDatasource
    }

    mapModelToJSON(fileDatasource: FileDatasourcesModel): FileDatasourcesResponse {
        return <FileDatasourcesResponse>{
            id: fileDatasource.id,
            name: fileDatasource.name,
            type: fileDatasource.type,
            creator_id: fileDatasource.creatorId,
            created_date: fileDatasource.createdDate,
            updated_date: fileDatasource.updatedDate,
            deleted_date: fileDatasource.deletedDate,
            soft_deleted: fileDatasource.softDeleted,
        }
    }
}

export const filesService = new FileDatasourcesService()