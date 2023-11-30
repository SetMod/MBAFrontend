import GenericModel, { GenericResponse } from "./GenericModel"

export default class Organizations extends GenericModel {
    name: string = ''
    description: string = ''
    email: string = ''
    phone: string = ''
}

export interface OrganizationsResponse extends GenericResponse {
    name: string
    description: string
    email: string
    phone: string
}
