import { DatasourceTypes } from "../models/DatasourcesModel"
import { OrganizationRoles } from "../models/OrganizationMembersModel"
import { Roles } from "../models/UsersModel"


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



export const getDatasourceTypeValue = (type: string) => {
  return DatasourceTypes[type]
}



export const getRolesValue = (role: string) => {
  return Roles[role]
}

export const getRolesSeverity = (role: string) => {
  return Roles[role] == Roles.ADMIN ? 'danger' : 'info'
}
