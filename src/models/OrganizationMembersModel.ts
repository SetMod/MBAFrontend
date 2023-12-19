import GenericModel, { IGenericResponse } from "./GenericModel"
import { IOrganizationsResponse } from "./OrganizationsModel"
import { IUsersResponse } from "./UsersModel"

export enum OrganizationRoles {
    OWNER = "Owner",
    ADMIN = "Admin",
    EDITOR = "EDITOR",
    VIEWER = "Viewer",
}

export interface IOrganizationMembersResponse extends IGenericResponse {
    user_id: number
    organization_id: number
    active: boolean
    role: OrganizationRoles
}

export interface IOrganizationMembersFullResponse extends IOrganizationMembersResponse {
    user: IUsersResponse
    organization: IOrganizationsResponse
}

export default class OrganizationMembers extends GenericModel {
    id: number = 0
    userId: number = 0
    organizationId: number = 0
    active: boolean = true
    role: OrganizationRoles = OrganizationRoles.VIEWER
    createdDate: Date = new Date()
    updatedDate: Date | null = null
    deletedDate: Date | null = null
    softDeleted: boolean = false

    static fromJSON(organizationMemberJson: IOrganizationMembersResponse) {
        const organizationMember = new OrganizationMembers
        organizationMember.id = organizationMemberJson.id
        organizationMember.userId = organizationMemberJson.user_id
        organizationMember.organizationId = organizationMemberJson.organization_id
        organizationMember.active = organizationMemberJson.active
        organizationMember.role = OrganizationRoles[organizationMemberJson.role]
        organizationMember.createdDate = organizationMemberJson.created_date
        organizationMember.updatedDate = organizationMemberJson.updated_date
        organizationMember.deletedDate = organizationMemberJson.deleted_date
        organizationMember.softDeleted = organizationMemberJson.soft_deleted

        return organizationMember
    }

    static toJSON(organizationMember: OrganizationMembers) {
        const memberRes = <IOrganizationMembersResponse>{
            id: organizationMember.id,
            user_id: organizationMember.userId,
            organization_id: organizationMember.organizationId,
            role: Object.keys(OrganizationRoles).find((role) => OrganizationRoles[role] == organizationMember.role),
            active: organizationMember.active,
            created_date: organizationMember.createdDate,
            updated_date: organizationMember.updatedDate,
            deleted_date: organizationMember.deletedDate,
            soft_deleted: organizationMember.softDeleted
        }

        return memberRes
    }

    toJSON() {
        return OrganizationMembers.toJSON(this)
    }
}
