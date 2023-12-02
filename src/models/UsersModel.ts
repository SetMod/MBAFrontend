import GenericModel, { GenericResponse } from "./GenericModel"

export enum Roles {
    ADMIN = "Admin",
    USER = "User"
}

export default class Users extends GenericModel {
    firstName: string = ''
    secondName: string = ''
    email: string = ''
    phone: string = ''
    username: string = ''
    passwordHash: string = ''
    active: boolean = true
    lastLoginDate: Date = new Date()
    role: Roles = Roles.USER
}

export interface UsersResponse extends GenericResponse {
    first_name: string
    second_name: string
    email: string
    phone: string
    username: string
    password_hash: string
    active: boolean
    last_login_date: Date
    role: Roles
}

// export interface UserOrganizationsResponse extends GenericResponse {
//     organizations: OrganizationsResponse[]
// }
// export interface UserReportsResponse extends GenericResponse {
//     reports: ReportsResponse[]
// }
// export interface UserDatasourcesResponse extends GenericResponse {
//     datasources: DatasourcesResponse[]
// }
