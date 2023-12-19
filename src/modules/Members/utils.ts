import { OrganizationRoles } from "../../models/OrganizationMembersModel"

export const getOrganizationRoleValue = (role: string) => {
    return OrganizationRoles[role]
}
export const getOrganizationRoleSeverity = (role: string) => {
    if (role == OrganizationRoles.OWNER) { return 'danger' }
    else if (role == OrganizationRoles.ADMIN) { return 'warning' }
    else if (role == OrganizationRoles.EDITOR) { return 'warning' }
    else if (role == OrganizationRoles.VIEWER) { return 'info' }
    else { return 'success' }
}

export const getMemberActiveValue = (active: boolean) => {
    return active ? 'Active' : 'Deactivated'
}

export const getMemberActiveSeverity = (active: boolean) => {
    return active ? 'success' : 'danger'
}