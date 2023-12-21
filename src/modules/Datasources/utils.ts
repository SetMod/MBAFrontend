import { DatasourceTypes } from "../../models/DatasourcesModel"


export const getDatasourceTypeValue = (type: string) => {
    return DatasourceTypes[type]
}
export const getDatasourceTypeSeverity = (type: string) => {
    return 'success'
}
