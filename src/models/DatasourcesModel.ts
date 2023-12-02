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
    userId: number = 0
    organizationId: number = 0
}

export class FileDatasourcesModel extends GenericModel {
    name: string = ''
    filePath: string = ''
    datasourceId: number = 0
}

export interface FileDatasourcesResponse extends GenericResponse {
    name: string
    file_path: string
    datasource_id: number
}
