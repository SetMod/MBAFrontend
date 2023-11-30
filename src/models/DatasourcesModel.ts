import GenericModel from "./GenericModel";

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