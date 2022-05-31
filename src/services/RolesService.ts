import axios from "axios";
import config from "../config";
import Roles from "../models/RolesModel";

export default class RolesService {
    mapDataToRole(data: any) {
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
    async getAllRoles() {
        try {
            const data = await axios.get(`${config.baseUrl}/roles/`)
            if (data.data.length == 0) return null
            const roles: Roles[] = data.data.map((val: any) => {
                return this.mapDataToRole(val)
            })
            console.log(roles)
            return roles
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async createRole(role: Roles) {
        try {
            const dataRole = this.mapRoleToData(role)
            const data = await axios.post(`${config.baseUrl}/roles/`, dataRole)
            const newRole = this.mapDataToRole(data.data)
            return newRole
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

const roleService = new RolesService()
export { roleService }
