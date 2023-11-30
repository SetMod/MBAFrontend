import config from "../config";
import Roles, { RolesResponse } from "../models/RolesModel";
import GenericService from "./GenericService";

export default class RolesService extends GenericService<Roles, RolesResponse> {

    constructor() {
        super()
        this.setEndpoint(`${config.baseUrl}/roles`)
    }

    mapJSONToModel(data: RolesResponse | RolesResponse[]): Roles | Roles[] {
        function map(roleJson: RolesResponse) {
            const role = new Roles()
            role.id = roleJson.id
            role.name = roleJson.name
            role.description = roleJson.description
            role.createdDate = roleJson.created_date
            role.updatedDate = roleJson.updated_date
            role.deletedDate = roleJson.deleted_date
            role.softDeleted = roleJson.soft_deleted

            return role
        }
        if (data instanceof Array) {
            let roles = new Array<Roles>()
            for (let roleJson of data) {
                roles.push(map(roleJson))
            }
            return roles
        } else {
            return map(data)
        }
    }

    mapModelToJSON(role: Roles | Roles[]): RolesResponse | RolesResponse[] {
        function map(role: Roles) {
            return <RolesResponse>{
                id: role.id,
                name: role.name,
                description: role.description,
                created_date: role.createdDate,
                updated_date: role.updatedDate,
                deleted_date: role.deletedDate,
                soft_deleted: role.softDeleted,
            }
        }
        if (role instanceof Array) {
            let data = new Array<RolesResponse>()
            for (var val of role) {
                data.push(map(val))
            }
            return data
        } else {
            return map(role)
        }
    }
}

export const rolesService = new RolesService()
