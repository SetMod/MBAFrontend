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
    userId: number
    organizationId: number
    active: boolean
    role: OrganizationRoles

    constructor(
        id: number,
        userId: number,
        organizationId: number,
        active: boolean = true,
        role: OrganizationRoles = OrganizationRoles.VIEWER,
        createdDate: Date = new Date(),
        updatedDate: Date | null = null,
        deletedDate: Date | null = null,
        softDeleted: boolean = false,
    ) {
        super(id, createdDate, updatedDate, deletedDate, softDeleted)
        this.userId = userId
        this.organizationId = organizationId
        this.active = active
        this.role = role
        this.createdDate = createdDate
        this.updatedDate = updatedDate
        this.deletedDate = deletedDate
        this.softDeleted = softDeleted
    }

    static fromJSON(organizationMemberJson: IOrganizationMembersResponse) {
        const organizationMember = new OrganizationMembers(
            organizationMemberJson.id,
            organizationMemberJson.user_id,
            organizationMemberJson.organization_id,
            organizationMemberJson.active,
            organizationMemberJson.role,
            organizationMemberJson.created_date,
            organizationMemberJson.updated_date,
            organizationMemberJson.deleted_date,
            organizationMemberJson.soft_deleted,
        )

        return organizationMember
    }

    static toJSON(organizationMember: OrganizationMembers) {
        const memberRes = <IOrganizationMembersResponse>{
            id: organizationMember.id,
            user_id: organizationMember.userId,
            organization_id: organizationMember.organizationId,
            role: organizationMember.role.toUpperCase(),
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
