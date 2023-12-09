import { AxiosError } from "axios";
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

    async getUserMemberships(userId: number) {
        try {
            const res = await this.api.get(`/users/${userId}/memberships`)
            console.log(res)

            const models = this.mapJSONToModels(res.data)
            console.log(models)

            return models

        } catch (err) {
            let errorMessage = "Failed to get user memberships"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

}

const organizationMembersService = new OrganizationMembersService()
export { organizationMembersService }