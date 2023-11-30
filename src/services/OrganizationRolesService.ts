import config from "../config"
import OrganizationRoles, { OrganizationRolesResponse } from "../models/OrganizationRolesModel";
import GenericService from "./GenericService";

export default class OrganizationRolesService extends GenericService<OrganizationRoles, OrganizationRolesResponse> {
    orgId: number = 0

    constructor() {
        super()
        this.setEndpoint(`${config.baseUrl}/organizations/${this.orgId}/roles`)
    }

    mapJSONToModel(data: OrganizationRolesResponse | OrganizationRolesResponse[]): OrganizationRoles | OrganizationRoles[] {
        function map(organizationRoleJson: OrganizationRolesResponse) {
            const organizationRole = new OrganizationRoles()
            organizationRole.id = organizationRoleJson.id
            organizationRole.name = organizationRoleJson.name
            organizationRole.description = organizationRoleJson.description
            organizationRole.createdDate = organizationRoleJson.created_date
            organizationRole.updatedDate = organizationRoleJson.updated_date
            organizationRole.deletedDate = organizationRoleJson.deleted_date
            organizationRole.softDeleted = organizationRoleJson.soft_deleted

            return organizationRole
        }
        if (data instanceof Array) {
            let organizationRoles = new Array<OrganizationRoles>()
            for (let organizationRoleJson of data) {
                organizationRoles.push(map(organizationRoleJson))
            }
            return organizationRoles
        } else {
            return map(data)
        }
    }

    mapModelToJSON(organizationRole: OrganizationRoles | OrganizationRoles[]): OrganizationRolesResponse | OrganizationRolesResponse[] {
        function map(organizationRole: OrganizationRoles) {
            return <OrganizationRolesResponse>{
                id: organizationRole.id,
                name: organizationRole.name,
                description: organizationRole.description,
                created_date: organizationRole.createdDate,
                updated_date: organizationRole.updatedDate,
                deleted_date: organizationRole.deletedDate,
                soft_deleted: organizationRole.softDeleted,
            }
        }
        if (organizationRole instanceof Array) {
            let data = new Array<OrganizationRolesResponse>()
            for (var val of organizationRole) {
                data.push(map(val))
            }
            return data
        } else {
            return map(organizationRole)
        }
    }
}

export const organizationRolesService = new OrganizationRolesService()