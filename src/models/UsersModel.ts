import GenericModel, { GenericResponse } from "./GenericModel"

export default class Users extends GenericModel {
    firstName: string = ''
    secondName: string = ''
    email: string = ''
    phone: string = ''
    username: string = ''
    passwordHash: string = ''
    active: boolean = true
    lastLoginDate: Date = new Date()
    roleId: number = 0
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
    roleId: number
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
