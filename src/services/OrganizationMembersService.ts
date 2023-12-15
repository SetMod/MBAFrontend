import OrganizationMembers, { IOrganizationMembersResponse } from "../models/OrganizationMembersModel";
import GenericService from "./GenericService";

export default class OrganizationMembersService extends GenericService<OrganizationMembers, IOrganizationMembersResponse> {
    orgId: number = 0

    constructor() {
        super("/members")
    }

    // constructor() {
    //     super(`/organizations/${1}/members`)
    // }

    mapJSONToModel(organizationMemberJson: IOrganizationMembersResponse) {
        return OrganizationMembers.fromJSON(organizationMemberJson)
    }

    mapModelToJSON(organizationMember: OrganizationMembers) {
        return OrganizationMembers.toJSON(organizationMember)
    }
}

const organizationMembersService = new OrganizationMembersService()
export { organizationMembersService }