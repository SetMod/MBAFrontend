import { AxiosError } from "axios"
import Organizations, { IOrganizationsResponse } from "../models/OrganizationsModel"
import GenericService from "./GenericService"

export default class OrganizationsService extends GenericService<Organizations, IOrganizationsResponse> {

    constructor() {
        super("/organizations")
    }

    mapJSONToModel(organizationJson: IOrganizationsResponse): Organizations {
        return Organizations.fromJSON(organizationJson)
    }

    mapModelToJSON(organization: Organizations): IOrganizationsResponse {
        return Organizations.toJSON(organization)
    }

    async getUserOrganizations(userId: number) {
        try {
            console.log(`Getting user organizations with id='${userId}'`)
            const res = await this.api.get(`/users/${userId}/organizations`)
            console.log(res)

            const models = this.mapJSONToModels(res.data)
            console.log(models)

            return models

        } catch (err) {
            let errorMessage = "Failed to get user organizations"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
}

export const organizationsService = new OrganizationsService()
