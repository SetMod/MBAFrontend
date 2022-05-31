import axios from "axios"
import config from "../config"
import OrganizationRoles from "../models/OrganizationRolesModel"

export interface OrganizationRolesResponse {
    organization_role_id: number
    organization_role_name: string
    organization_role_description: string
}

export default class OrganizationRolesService {
    async getAllOrganizationRoles() {
        try {
            const data = await axios.get(`${config.baseUrl}/organization_roles/`)

            if (data.data.length == 0) return null
            if (typeof data.data == 'string') return data.data

            const organizationRoles: OrganizationRoles[] = data.data.map((val: OrganizationRolesResponse) => {
                return this.mapDataToOrganizationRole(val)
            })
            console.log(organizationRoles);
            return organizationRoles
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async getOrganizationRoleById(organizationRoleId: number) {
        try {
            const data = await axios.get(`${config.baseUrl}/organization_roles/${organizationRoleId}`)

            if (Object.keys(data.data).length === 0) return null
            if (typeof data.data == 'string') return data.data

            const organizationRoles: OrganizationRoles[] = data.data.map((val: OrganizationRolesResponse) => {
                return this.mapDataToOrganizationRole(val)
            })
            console.log(organizationRoles);
            return organizationRoles
        } catch (error) {
            console.log(error)
            return null
        }
    }
    mapDataToOrganizationRole(data: OrganizationRolesResponse) {
        const organizationRole = new OrganizationRoles()
        organizationRole.organizationRoleId = data.organization_role_id
        organizationRole.organizationRoleName = data.organization_role_name
        organizationRole.organizationRoleDescription = data.organization_role_description
        return organizationRole
    }
    mapOrganizationRoleToData(organizationRole: OrganizationRoles) {
        return <OrganizationRolesResponse>{
            organization_role_id: organizationRole.organizationRoleId,
            organization_role_description: organizationRole.organizationRoleName,
            organization_role_name: organizationRole.organizationRoleDescription,
        }
    }
}

const organizationRolesService = new OrganizationRolesService()
export { organizationRolesService }