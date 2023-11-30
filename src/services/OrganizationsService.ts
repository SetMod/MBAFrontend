import config from "../config"
import Organizations, { OrganizationsResponse } from "../models/OrganizationsModel"
import GenericService from "./GenericService"

export default class OrganizationsService extends GenericService<Organizations, OrganizationsResponse> {

    constructor() {
        super()
        this.setEndpoint(`${config.baseUrl}/organizations`)
    }

    mapJSONToModel(data: OrganizationsResponse | OrganizationsResponse[]): Organizations | Organizations[] {
        function map(organizationJson: OrganizationsResponse) {
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
        if (data instanceof Array) {
            let organizations = new Array<Organizations>()
            for (let organizationJson of data) {
                organizations.push(map(organizationJson))
            }
            return organizations
        } else {
            return map(data)
        }
    }

    mapModelToJSON(organization: Organizations | Organizations[]): OrganizationsResponse | OrganizationsResponse[] {
        function map(organization: Organizations) {
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
        if (organization instanceof Array) {
            let data = new Array<OrganizationsResponse>()
            for (var val of organization) {
                data.push(map(val))
            }
            return data
        } else {
            return map(organization)
        }
    }
}

export const organizationService = new OrganizationsService()