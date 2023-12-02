import GenericModel, { GenericResponse } from "./GenericModel"

export enum OrganizationRoles {
    OWNER = "Owner",
    ADMIN = "Admin",
    EDITOR = "EDITOR",
    VIEWER = "Viewer",
}

export default class OrganizationMembers extends GenericModel {
    userId: number = 0
    organizationId: number = 0
    active: boolean = true
    role: OrganizationRoles = OrganizationRoles.VIEWER
}

export interface OrganizationMembersResponse extends GenericResponse {
    user_id: number
    organization_id: number
    active: boolean
    role: OrganizationRoles
}