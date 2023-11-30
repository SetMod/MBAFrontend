import GenericModel, { GenericResponse } from "./GenericModel"

enum ReportTypes {
    GENERIC = "generic"
}

export default class Reports extends GenericModel {
    name: string = ''
    type: ReportTypes = ReportTypes.GENERIC
    userId: number = 0
    organizationId: number = 0
}

export interface ReportsResponse extends GenericResponse {
    name: string
    type: ReportTypes
    user_id: number
    organization_id: number
}