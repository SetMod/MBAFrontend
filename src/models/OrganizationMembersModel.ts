export default class OrganizationMembers {
    userId: number = 0
    organizationId: number = 0
    organizationRoleId: number = 0
    active: boolean = true
    createdDate: Date = new Date()
    updatedDate: Date = new Date()
}

export interface OrganizationMembersResponse {
    user_id: number
    organization_id: number
    organization_role_id: number
    active: boolean
    created_date: Date
    updated_date: Date
}