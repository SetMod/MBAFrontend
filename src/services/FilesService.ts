import axios from "axios";
import config from "../config";
import Files from "../models/FilesMode";

export interface FilesResponse {
    file_id: number
    file_name: string
    file_create_date: string
    file_path: string
    user_id: number
    organization_id: number
}

export default class FilesService {
    async getAllFiles() {
        try {
            const data = await axios.get(`${config.baseUrl}/files`)
            if (data.data.length == 0) return null
            const files: Files[] = data.data.map((val: FilesResponse) => {
                return this.mapDataToFile(val)
            })
            return files
        } catch (error) {
            console.error(error);
            return null
        }
    }
    async getUserFiles(userId: number) {
        try {
            const data = await axios.get(`${config.baseUrl}/users/${userId}/files`)
            if (data.data instanceof String) {
                alert(data.data)
                return null
            } else if (Array.isArray(data.data)) {
                const files: Files[] = data.data.map((val: FilesResponse) => {
                    return this.mapDataToFile(val)
                })
                return files
            } else {
                return null
            }
        } catch (error) {
            console.error(error);
            return null
        }

    }
    mapDataToFile(data: FilesResponse) {
        const file = new Files()
        file.fileId = data.file_id
        file.fileName = data.file_name
        file.fileCreateDate = new Date(data.file_create_date)
        file.filePath = data.file_path
        file.userId = data.user_id
        file.organizationId = data.organization_id
        return file
    }
    mapFileToData(file: Files) {
        return <FilesResponse>{
            file_id: file.fileId,
            file_name: file.fileName?.toString(),
            file_create_date: file.fileCreateDate?.toString(),
            file_path: file.filePath?.toString(),
            user_id: file.userId,
            organization_id: file.organizationId,
        }
    }
}

const filesService = new FilesService()
export { filesService }