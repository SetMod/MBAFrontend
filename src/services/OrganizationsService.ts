import Organizations, { OrganizationsResponse } from "../models/OrganizationsModel"
import GenericService from "./GenericService"

export default class OrganizationsService extends GenericService<Organizations, OrganizationsResponse> {

    constructor() {
        super("/organizations")
    }

    mapJSONToModel(organizationJson: OrganizationsResponse): Organizations {
        const organization = new Organizations()
        organization.id = organizationJson.id
        organization.name = organizationJson.name
        organization.description = organizationJson.description
        organization.email = organizationJson.email
        organization.phone = organizationJson.phone
        organization.createdDate = organizationJson.created_date
        organization.updatedDate = organizationJson.updated_date
        organization.deletedDate = organizationJson.deleted_date
        organization.softDeleted = organizationJson.soft_deleted

        return organization
    }

    mapModelToJSON(organization: Organizations): OrganizationsResponse {
        return <OrganizationsResponse>{
            id: organization.id,
            name: organization.name,
            description: organization.description,
            email: organization.email,
            phone: organization.phone,
            created_date: organization.createdDate,
            updated_date: organization.updatedDate,
            deleted_date: organization.deletedDate,
            soft_deleted: organization.softDeleted,
        }
    }
}

export const organizationService = new OrganizationsService()