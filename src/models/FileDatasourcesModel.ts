import GenericModel, { GenericResponse } from "./GenericModel"

export default class FileDatasourcesModel extends GenericModel {
    name: string = ''
    filePath: string = ''
    datasourceId: number = 0
}

export interface FileDatasourcesResponse extends GenericResponse {
    name: string
    file_path: string
    datasource_id: number
}
