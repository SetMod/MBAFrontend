import GenericModel, { GenericResponse } from "./GenericModel"
import { UsersResponse } from "./UsersModel"

export default class Roles extends GenericModel {
    name: string = ''
    description: string = ''
}

export interface RolesResponse extends GenericResponse {
    name: string
    description: string
}

export interface RoleUsersResponse extends RolesResponse {
    users: UsersResponse[]
}
