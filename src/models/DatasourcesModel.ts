import GenericModel, { IGenericResponse } from "./GenericModel";
import { IOrganizationMembersFullResponse } from "./OrganizationMembersModel";

export enum DatasourceTypes {
    FILE = "File",
    DB = "DB",

    // CSV = "CSV",
    // SQLITE = "SQLite",
    // MYSQL = "MySQL",
    // POSTGRESQL = "PostgreSQL"
}

export const datasourceTypeOptions = Object.keys(DatasourceTypes).map((v: string) => {
    return {
        'value': DatasourceTypes[v],
        'label': DatasourceTypes[v],
        'name': v
    }
})

export interface IFileDatasourcesResponse {
    file_path: string
    file_name: string
    file_size: number
}
export interface IDatasourcesResponse extends IGenericResponse, IFileDatasourcesResponse {
    name: string
    type: DatasourceTypes
    creator_id: number
}

export interface IDatasourcesFullResponse extends IDatasourcesResponse {
    creator: IOrganizationMembersFullResponse
}

export default class Datasources extends GenericModel {
    name: string
    creatorId: number
    type: DatasourceTypes
    filePath: string | null
    fileName: string | null
    fileSize: number | null

    constructor(
        id: number = 0,
        name: string = '',
        creatorId: number = 0,
        type: DatasourceTypes = DatasourceTypes.FILE,
        filePath: string | null = null,
        fileName: string | null = null,
        fileSize: number | null = null,
        createdDate: Date = new Date(),
        updatedDate: Date | null = null,
        deletedDate: Date | null = null,
        softDeleted: boolean = false,
    ) {
        super(id, createdDate, updatedDate, deletedDate, softDeleted)
        this.name = name
        this.creatorId = creatorId
        this.type = type
        this.fileName = fileName
        this.filePath = filePath
        this.fileSize = fileSize
        this.createdDate = createdDate
        this.updatedDate = updatedDate
        this.deletedDate = deletedDate
        this.softDeleted = softDeleted
    }

    static fromJSON(datasourcesJson: IDatasourcesResponse): Datasources {
        const datasource = new Datasources(
            datasourcesJson.id,
            datasourcesJson.name,
            datasourcesJson.creator_id,
            datasourcesJson.type,
            datasourcesJson.file_path,
            datasourcesJson.file_name,
            datasourcesJson.file_size,
            datasourcesJson.created_date,
            datasourcesJson.updated_date,
            datasourcesJson.deleted_date,
            datasourcesJson.soft_deleted,
        )

        return datasource
    }

    static toJSON(fileDatasource: Datasources): IDatasourcesResponse {
        return <IDatasourcesResponse>{
            id: fileDatasource.id,
            name: fileDatasource.name,
            creator_id: fileDatasource.creatorId,
            type: Object.keys(DatasourceTypes).find((v) => DatasourceTypes[v] == fileDatasource.type),
            file_path: fileDatasource.filePath,
            file_name: fileDatasource.fileName,
            file_size: fileDatasource.fileSize,
            created_date: fileDatasource.createdDate,
            updated_date: fileDatasource.updatedDate,
            deleted_date: fileDatasource.deletedDate,
            soft_deleted: fileDatasource.softDeleted,
        }
    }

    toJSON(): IDatasourcesResponse {
        return Datasources.toJSON(this)
    }
}
