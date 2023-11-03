import axios, { AxiosError } from "axios";
import config from "../config";
import Roles from "../models/RolesModel";

interface RolesResponse {
    id: number
    name: string
    description: string
}

export default class RolesService {

    async getRoles() {
        const errorMessage = new String('Failed to get roles')
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
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }

    async getRoleById(roleId: number) {
        const errorMessage = new String('Failed to get role')
        try {
            const response = await axios.get(`${config.baseUrl}/roles/${roleId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const roles: Roles = this.mapDataToRole(response.data)
            console.log(roles)
            return roles
        } catch (error) {
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async getRoleByName(roleName: string) {
        const errorMessage = new String('Failed to get role')
        try {
            const response = await axios.get(`${config.baseUrl}/roles/${roleName}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const roles: Roles = this.mapDataToRole(response.data)
            console.log(roles)
            return roles
        } catch (error) {
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }

    async createRole(role: Roles) {
        const errorMessage = new String('Failed to create an role')
        try {
            const dataRole = this.mapRoleToData(role)
            const response = await axios.post(`${config.baseUrl}/roles/`, dataRole)

            if (response.data instanceof String) return response.data

            const newRole = this.mapDataToRole(response.data)
            console.log(newRole);
            return newRole
        } catch (error) {
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async updateRole(role: Roles) {
        const errorMessage = new String('Failed to update role')
        try {
            const dataRole = this.mapRoleToData(role)
            const response = await axios.put(`${config.baseUrl}/roles/${role.roleId}`, dataRole)

            if (response.data instanceof String) return response.data

            const updatedRole: Roles = this.mapDataToRole(response.data)
            console.log(updatedRole)
            return updatedRole
        } catch (error) {
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async deleteRole(roleId: number) {
        const errorMessage = new String('Failed to delete a role')
        try {
            const response = await axios.delete(`${config.baseUrl}/users/${roleId}`)

            if (response.data instanceof String) return response.data

            const deletedRole: Roles = this.mapDataToRole(response.data)
            console.log(deletedRole)
            return deletedRole
        } catch (error) {
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    mapDataToRole(data: RolesResponse) {
        const role = new Roles()
        role.roleId = data.id
        role.roleName = data.name
        role.roleDescription = data.description
        return role
    }
    mapRoleToData(role: Roles) {
        return {
            name: role.roleName,
            description: role.roleDescription,
        }
    }
}

const roleService = new RolesService()
export { roleService }
