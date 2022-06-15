import axios from "axios"
import config from "../config"
import Organizations from "../models/OrganizationsModel"

interface OrganizationsResponse {
    organization_id: number
    organization_name: string
    organization_description: string
    organization_email: string
    organization_phone: string
    organization_create_date: Date
}

export default class OrganizationsService {
    async getOrganizations() {
        const errorMessage: String = 'Failed to get organizations'
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
            console.log(error)
            return errorMessage
        }
    }
    async getOrganizationById(organizationId: number) {
        const errorMessage: String = 'Failed to get organization'
        try {
            const response = await axios.get(`${config.baseUrl}/organizations/${organizationId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const organization: Organizations = this.mapDataToOrganization(response.data)
            console.log(organization)
            return organization
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async getUserOrganizations(userId: number) {
        const errorMessage: String = 'Failed to get user organizations'
        try {
            const response = await axios.get(`${config.baseUrl}/users/${userId}/organizations`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const organizations: Organizations = this.mapDataToOrganization(response.data)
            console.log(organizations)
            return organizations
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async createOrganization(organization: Organizations) {
        const errorMessage: String = 'Failed to create organization'
        try {
            const dataOrganization = this.mapOrganizationToData(organization)
            const response = await axios.post(`${config.baseUrl}/organizations/`, dataOrganization)

            if (response.data instanceof String) return response.data

            const newOrganization: Organizations = this.mapDataToOrganization(response.data)
            console.log(newOrganization)
            return newOrganization
        } catch (error) {
            console.log(error);
            return errorMessage
        }
    }
    async updateOrganization(organization: Organizations) {
        const errorMessage: String = 'Failed to update organization'
        try {
            const dataOrganization = this.mapOrganizationToData(organization)
            const response = await axios.put(`${config.baseUrl}/organizations/${organization.organizationId}`, dataOrganization)

            if (response.data instanceof String) return response.data

            const updatedOrganization: Organizations = this.mapDataToOrganization(response.data)
            console.log(updatedOrganization)
            return updatedOrganization
        } catch (error) {
            console.log(error);
            return errorMessage
        }
    }
    async deleteOrganization(organizationId: number) {
        try {
            const data = await axios.delete(`${config.baseUrl}/organizations/${organizationId}`)
            if (Object.keys(data.data).length === 0) return null
            const organization: Organizations = this.mapDataToOrganization(data.data)
            console.log(organization)
            return organization
        } catch (error) {
            console.log(error)
            return null
        }
    }
    mapDataToOrganization(data: OrganizationsResponse) {
        const organization = new Organizations()
        organization.organizationId = data.organization_id
        organization.organizationName = data.organization_name
        organization.organizationDescription = data.organization_description
        organization.organizationEmail = data.organization_email
        organization.organizationPhone = data.organization_phone
        organization.organizationCreateDate = data.organization_create_date
        return organization
    }
    mapOrganizationToData(organization: Organizations) {
        return <OrganizationsResponse>{
            organization_name: organization.organizationName,
            organization_description: organization.organizationDescription,
            organization_email: organization.organizationEmail,
            organization_phone: organization.organizationPhone,
            organization_create_date: organization.organizationCreateDate
        }
    }
}

const organizationService = new OrganizationsService()
export { organizationService }