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
        'name': v,
        'value': DatasourceTypes[v]
    }
})

export interface IDatasourcesResponse extends IGenericResponse {
    name: string
    type: DatasourceTypes
    creator_id: number
}

export interface IDatasourcesFullResponse extends IDatasourcesResponse {
    creator: IOrganizationMembersFullResponse
}

export interface IFileDatasourcesResponse extends IDatasourcesResponse {
    file_path: string
}

export interface IDatasourcesFullResponse extends IFileDatasourcesResponse {
    creator: IOrganizationMembersFullResponse
}

export default class Datasources extends GenericModel {
    name: string
    creatorId: number
    type: DatasourceTypes

    constructor(
        id: number = 0,
        name: string = '',
        creatorId: number = 0,
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
