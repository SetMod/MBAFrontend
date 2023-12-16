import { Roles } from "../../models/UsersModel"

export const getRolesValue = (role: string) => {
    return Roles[role]
}

export const getRolesSeverity = (role: string) => {
    return Roles[role] == Roles.ADMIN ? 'danger' : 'info'
}
