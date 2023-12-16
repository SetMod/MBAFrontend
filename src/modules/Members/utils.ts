import { OrganizationRoles } from "../../models/OrganizationMembersModel"

export const getOrganizationRoleValue = (role: string) => {
    return OrganizationRoles[role]
}
export const getOrganizationRoleSeverity = (role: string) => {
    return OrganizationRoles[role] ? 'danger' : 'info'
}

export const getMemberActiveValue = (active: boolean) => {
    return active ? 'Active' : 'Deactivated'
}
export const getMemberActiveSeverity = (active: boolean) => {
    return active ? 'success' : 'danger'
}