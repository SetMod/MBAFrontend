import GenericModel, { GenericResponse } from "./GenericModel";

enum DatasourceTypes {
    FILE = "file",
    DB = "db",

    CSV = "CSV",
    SQLITE = "SQLite",
    MYSQL = "MySQL",
    POSTGRESQL = "PostgreSQL"
}

export default class Datasources extends GenericModel {
    name: string = ''
    type: DatasourceTypes = DatasourceTypes.FILE
    creatorId: number = 0
}

export class FileDatasourcesModel extends Datasources {
    filePath: string = ''
}

export interface DatasourcesResponse extends GenericResponse {
    name: string
    type: DatasourceTypes
    creator_id: number
}

export interface FileDatasourcesResponse extends DatasourcesResponse {
    file_path: string
}
