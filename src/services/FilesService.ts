import axios from "axios";
import config from "../config";
import Files from "../models/FilesModel";

export interface FilesResponse {
    id: number
    name: string
    create_date: string
    file_path: string
    user_id: number
    organization_id: number
}

export default class FilesService {

    async getFiles() {
        const errorMessage: String = 'Failed to get files'
        try {
            const response = await axios.get(`${config.baseUrl}/files`)

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            const files: Files[] = response.data.map((val: FilesResponse) => {
                return this.mapDataToFile(val)
            })
            console.log(files);
            return files
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async getFileById(fileId: number) {
        const errorMessage: String = 'Failed to get file'
        try {
            const response = await axios.get(`${config.baseUrl}/files/${fileId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const file: Files = this.mapDataToFile(response.data)
            console.log(file)
            return file
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async getUserFiles(userId: number) {
        const errorMessage = 'Failed to get files'
        try {
            const response = await axios.get(`${config.baseUrl}/users/${userId}/files`)

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            const files: Files[] = response.data.map((file: FilesResponse) => {
                return this.mapDataToFile(file)
            })
            console.log(files);
            return files
        } catch (error) {
            console.error(error);
            return errorMessage
        }

    }
    async downloadFileById(fileId: number) {
        const errorMessage: String = 'Failed to download the file'
        try {
            const file = await this.getFileById(fileId)
            if (file instanceof String) return file

            const response = await axios.get(`${config.baseUrl}/files/download/${fileId}`, { responseType: 'blob' })

            const blob = new Blob([response.data], { type: response.data.type })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = file.fileName ? file.fileName : 'Untitled'
            link.click()

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            // const file: Files = this.mapDataToFile(response.data)
            // console.log(file)
            // return file
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async createFile(file: Files, form: FormData) {
        const errorMessage: String = 'Filed adding the file'
        try {
            // const dataFile = this.mapFileToData(file)
            const response = await axios.post(`${config.baseUrl}/files/upload?name=${file.fileName ? file.fileName : 'Untitled'}&user_id=${file.userId}&organization_id=${file.organizationId}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data instanceof String) return response.data

            const newFile: Files = this.mapDataToFile(response.data)
            console.log(newFile)
            return newFile
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async updateFile(file: Files) {
        const errorMessage = 'Failed to update the file'
        try {
            const dataFile = this.mapFileToData(file)
            const response = await axios.put(`${config.baseUrl}/files/${file.fileId}`, dataFile)

            if (response.data instanceof String) return response.data

            const updatedFile = this.mapDataToFile(response.data)
            console.log(updatedFile);
            return updatedFile
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async deleteFile(fileId: number) {
        const errorMessage = 'Failed to delete the file'
        try {
            const response = await axios.delete(`${config.baseUrl}/files/${fileId}`)

            if (response.data instanceof String) return response.data

            const deletedFile: Files = this.mapDataToFile(response.data)
            console.log(deletedFile);
            return deletedFile
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    mapDataToFile(data: FilesResponse) {
        const file = new Files()
        file.fileId = data.id
        file.fileName = data.name
        file.fileCreateDate = new Date(data.create_date)
        file.filePath = data.file_path
        file.userId = data.user_id
        file.organizationId = data.organization_id
        return file
    }
    mapFileToData(file: Files) {
        return <FilesResponse>{
            id: file.fileId,
            name: file.fileName,
            create_date: file.fileCreateDate.toJSON(),
            file_path: file.filePath,
            user_id: file.userId,
            organization_id: file.organizationId,
        }
    }
}

const filesService = new FilesService()
export { filesService }