import OrganizationMembers, { OrganizationMembersResponse } from "../models/OrganizationMembersModel";
import GenericService from "./GenericService";

export default class OrganizationMembersService extends GenericService<OrganizationMembers, OrganizationMembersResponse> {
    orgId: number = 0

    constructor() {
        super("/members")
    }

    // constructor() {
    //     super(`/organizations/${1}/members`)
    // }

    mapJSONToModel(organizationMemberJson: OrganizationMembersResponse) {
        const organizationMember = new OrganizationMembers()
        organizationMember.userId = organizationMemberJson.user_id
        organizationMember.organizationId = organizationMemberJson.organization_id
        organizationMember.role = organizationMemberJson.role
        organizationMember.active = organizationMemberJson.active
        organizationMember.createdDate = organizationMemberJson.created_date
        organizationMember.updatedDate = organizationMemberJson.updated_date

        return organizationMember
    }

    mapModelToJSON(organizationMember: OrganizationMembers) {
        return <OrganizationMembersResponse>{
            user_id: organizationMember.userId,
            organization_id: organizationMember.organizationId,
            role: organizationMember.role.toUpperCase(),
            active: organizationMember.active,
            created_date: organizationMember.createdDate,
            updated_date: organizationMember.updatedDate
        }
    }
}

const organizationMembersService = new OrganizationMembersService()
export { organizationMembersService }