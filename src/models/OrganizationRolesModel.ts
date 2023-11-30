import GenericModel, { GenericResponse } from "./GenericModel"

export default class OrganizationRoles extends GenericModel {
    name: string | undefined
    description: string | undefined
}

export interface OrganizationRolesResponse extends GenericResponse {
    name: string
    description: string
}