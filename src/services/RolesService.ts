import axios from "axios";
import config from "../config";
import Roles from "../models/RolesModel";

interface RolesResponse {
    role_id: number
    role_name: string
    role_description: string
}

export default class RolesService {

    async getRoles() {
        const errorMessage: String = 'Failed to get roles'
        try {
            const response = await axios.get(`${config.baseUrl}/roles/`)

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            const roles: Roles[] = response.data.map((val: RolesResponse) => {
                return this.mapDataToRole(val)
            })
            console.log(roles)
            return roles
        } catch (error) {
            console.log(error)
            return errorMessage
        }
    }

    async getRoleById(roleId: number) {
        const errorMessage: String = 'Failed to get role'
        try {
            const response = await axios.get(`${config.baseUrl}/roles/${roleId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const roles: Roles[] = response.data.map((val: RolesResponse) => {
                return this.mapDataToRole(val)
            })
            console.log(roles)
            return roles
        } catch (error) {
            console.log(error)
            return errorMessage
        }
    }

    async createRole(role: Roles) {
        const errorMessage: String = 'Failed to create an role'
        try {
            const dataRole = this.mapRoleToData(role)
            const response = await axios.post(`${config.baseUrl}/roles/`, dataRole)

            if (response.data instanceof String) return response.data

            const newRole = this.mapDataToRole(response.data)
            console.log(newRole);
            return newRole
        } catch (error) {
            console.log(error);
            return errorMessage
        }
    }
    async updateRole(role: Roles) {
        const errorMessage: String = 'Failed to update role'
        try {
            const dataRole = this.mapRoleToData(role)
            const response = await axios.put(`${config.baseUrl}/roles/${role.roleId}`, dataRole)

            if (response.data instanceof String) return response.data

            const updatedRole: Roles = this.mapDataToRole(response.data)
            console.log(updatedRole)
            return updatedRole
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async deleteRole(roleId: number) {
        const errorMessage: String = 'Failed to delete a role'
        try {
            const response = await axios.delete(`${config.baseUrl}/users/${roleId}`)

            if (response.data instanceof String) return response.data

            const deletedRole: Roles = this.mapDataToRole(response.data)
            console.log(deletedRole)
            return deletedRole
        } catch (error) {
            console.log(error)
            return errorMessage
        }
    }
    mapDataToRole(data: RolesResponse) {
        const role = new Roles()
        role.roleId = data.role_id
        role.roleName = data.role_name
        role.roleDescription = data.role_description
        return role
    }
    mapRoleToData(role: Roles) {
        return {
            role_name: role.roleName,
            role_description: role.roleDescription,
        }
    }
}

const roleService = new RolesService()
export { roleService }
