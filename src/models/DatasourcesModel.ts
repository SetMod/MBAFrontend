import GenericModel, { IGenericResponse } from "./GenericModel";

enum DatasourceTypes {
    FILE = "file",
    DB = "db",

    CSV = "CSV",
    SQLITE = "SQLite",
    MYSQL = "MySQL",
    POSTGRESQL = "PostgreSQL"
}

export interface IDatasourcesResponse extends IGenericResponse {
    name: string
    type: DatasourceTypes
    creator_id: number
    file_path: string
}

export default class Datasources extends GenericModel {
    name: string
    creatorId: number
    type: DatasourceTypes

    filePath: string

    constructor(
        id: number,
        name: string,
        creatorId: number,
        filePath: string,
        type: DatasourceTypes = DatasourceTypes.FILE,
        createdDate: Date = new Date(),
        updatedDate: Date | null = null,
        deletedDate: Date | null = null,
        softDeleted: boolean = false,
    ) {
        super(id, createdDate, updatedDate, deletedDate, softDeleted)
        this.name = name
        this.creatorId = creatorId
        this.type = type
        this.filePath = filePath
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
            datasourcesJson.file_path,
            datasourcesJson.type,
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
            type: fileDatasource.type,
            creator_id: fileDatasource.creatorId,
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
