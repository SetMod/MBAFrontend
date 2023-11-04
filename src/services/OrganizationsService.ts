import axios, { AxiosError } from "axios"
import config from "../config"
import Organizations from "../models/OrganizationsModel"
import UserOrganizations from "../models/UserOrganizationsModel"
import UsersOrganizations from "../models/UsersOrganizationsModel"

interface OrganizationsResponse {
    id: number
    name: string
    description: string
    email: string
    phone: string
    create_date: Date
}
interface UserOrganizationsResponse {
    organization_id: number
    name: string
    description: string
    email: string
    phone: string
    create_date: Date
    role_description: string
    role_id: number
    role_name: string
}
interface UsersOrganizationsResponse {
    user_id: number
    organization_id: number
    organization_role_id: number
}
export default class OrganizationsService {
    async getOrganizations() {
        const errorMessage = new String('Failed to get organizations')
        try {
            const response = await axios.get(`${config.baseUrl}/organizations/`)

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            const organizations: Organizations[] = response.data.map((val: OrganizationsResponse) => {
                return this.mapDataToOrganization(val)
            })
            console.log(organizations);
            return organizations
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async getOrganizationById(organizationId: number) {
        const errorMessage = new String('Failed to get organization')
        try {
            const response = await axios.get(`${config.baseUrl}/organizations/${organizationId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const organization: Organizations = this.mapDataToOrganization(response.data)
            console.log(organization)
            return organization
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return error
        }
    }
    async getUserOrganizations(userId: number) {
        const errorMessage = new String('Failed to get user organizations')
        try {
            const response = await axios.get(`${config.baseUrl}/organizations/user/${userId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage
            console.log(response.data);

            const userOrganizations: UserOrganizations[] = response.data.map((val: UserOrganizationsResponse) => {
                return this.mapDataToUserOrganization(val)
            })
            console.log(userOrganizations)
            return userOrganizations
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async addUserToOrganization(userOrganization: UsersOrganizations) {
        const errorMessage = new String('Failed to add user to organization')
        try {
            const dataUserOrganization = this.mapUserOrganizationToData(userOrganization)
            const response = await axios.post(`${config.baseUrl}/organizations/users`, dataUserOrganization)

            if (response.data instanceof String) return response.data

            const newUserOrganization: Organizations[] = response.data.map((val: OrganizationsResponse) => {
                return this.mapDataToOrganization(val)
            })
            console.log(newUserOrganization)
            return newUserOrganization
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async createOrganization(organization: Organizations, userId: number) {
        const errorMessage = new String('Failed to create organization')
        try {
            const dataOrganization = this.mapOrganizationToData(organization)
            const response = await axios.post(`${config.baseUrl}/organizations/?user_id=${userId}`, dataOrganization)

            if (response.data instanceof String) return response.data

            const newOrganization: Organizations = this.mapDataToOrganization(response.data)
            console.log(newOrganization)
            return newOrganization
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async updateOrganization(organization: Organizations) {
        const errorMessage = new String('Failed to update organization')
        try {
            const dataOrganization = this.mapOrganizationToData(organization)
            const response = await axios.put(`${config.baseUrl}/organizations/${organization.organizationId}`, dataOrganization)

            if (response.data instanceof String) return response.data

            const updatedOrganization: Organizations = this.mapDataToOrganization(response.data)
            console.log(updatedOrganization)
            return updatedOrganization
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async deleteOrganization(organizationId: number) {
        const errorMessage = new String('Failed to delete organization')
        try {
            const response = await axios.delete(`${config.baseUrl}/organizations/${organizationId}`)
            if (Object.keys(response.data).length === 0) return errorMessage
            const organization: Organizations = this.mapDataToOrganization(response.data)
            console.log(organization)
            return organization
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async deleteUserFromOrganization(userOrganization: UsersOrganizations) {
        const errorMessage = new String('Failed to delete user from organization')
        try {
            const response = await axios.delete(`${config.baseUrl}/organizations/${userOrganization.organizationId}/user/${userOrganization.userId}`)
            if (Object.keys(response.data).length === 0) return errorMessage
            const organization: Organizations = this.mapDataToOrganization(response.data)
            console.log(organization)
            return organization
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    mapDataToOrganization(data: OrganizationsResponse) {
        const organization = new Organizations()
        organization.organizationId = data.id
        organization.organizationName = data.name
        organization.organizationDescription = data.description
        organization.organizationEmail = data.email
        organization.organizationPhone = data.phone
        organization.organizationCreateDate = data.create_date
        return organization
    }
    mapDataToUserOrganization(data: UserOrganizationsResponse) {
        const userOrganization = new UserOrganizations()
        userOrganization.organizationId = data.organization_id
        userOrganization.organizationName = data.name
        userOrganization.organizationDescription = data.description
        userOrganization.organizationEmail = data.email
        userOrganization.organizationPhone = data.phone
        userOrganization.organizationCreateDate = data.create_date
        userOrganization.organizationRoleId = data.role_id
        userOrganization.organizationRoleName = data.role_name
        return userOrganization
    }
    mapOrganizationToData(organization: Organizations) {
        return <OrganizationsResponse>{
            name: organization.organizationName,
            description: organization.organizationDescription,
            email: organization.organizationEmail,
            phone: organization.organizationPhone,
            create_date: organization.organizationCreateDate
        }
    }
    mapUserOrganizationToData(userOrganization: UsersOrganizations) {
        return <UsersOrganizationsResponse>{
            user_id: userOrganization.userId,
            organization_id: userOrganization.organizationId,
            organization_role_id: userOrganization.organizationRoleId
        }
    }
}

const organizationService = new OrganizationsService()
export { organizationService }