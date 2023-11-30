import config from "../config"
import OrganizationMembers, { OrganizationMembersResponse } from "../models/OrganizationMembersModel";
import GenericService from "./GenericService";

export default class OrganizationMembersService extends GenericService<OrganizationMembers, OrganizationMembersResponse> {
    orgId: number = 0

    constructor() {
        super()
        this.setEndpoint(`${config.baseUrl}/organizations/${this.orgId}/members`)
    }

    mapJSONToModel(data: OrganizationMembersResponse | OrganizationMembersResponse[]) {
        function map(organizationMemberJson: OrganizationMembersResponse) {
            const organizationMember = new OrganizationMembers()
            organizationMember.userId = organizationMemberJson.user_id
            organizationMember.organizationId = organizationMemberJson.organization_id
            organizationMember.organizationRoleId = organizationMemberJson.organization_role_id
            organizationMember.active = organizationMemberJson.active
            organizationMember.createdDate = organizationMemberJson.created_date
            organizationMember.updatedDate = organizationMemberJson.updated_date
            return organizationMember
        }
        if (data instanceof Array) {
            let organizationMembers = new Array<OrganizationMembers>()
            for (let organizationMemberJson of data) {
                organizationMembers.push(map(organizationMemberJson))
            }
            return organizationMembers
        } else {
            return map(data)
        }
    }

    mapModelToJSON(organizationMember: OrganizationMembers | OrganizationMembers[]) {
        function map(organizationMember: OrganizationMembers) {
            return <OrganizationMembersResponse>{
                user_id: organizationMember.userId,
                organization_id: organizationMember.organizationId,
                organization_role_id: organizationMember.organizationRoleId,
                active: organizationMember.active,
                created_date: organizationMember.createdDate,
                updated_date: organizationMember.updatedDate
            }
        }
        if (organizationMember instanceof Array) {
            let data = new Array<OrganizationMembersResponse>()
            for (var val of organizationMember) {
                data.push(map(val))
            }
            return data
        } else {
            return map(organizationMember)
        }
    }
}

const organizationMembersService = new OrganizationMembersService()
export { organizationMembersService }