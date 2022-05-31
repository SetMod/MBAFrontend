import axios from "axios"
import config from "../config"
import Organizations from "../models/OrganizationsModel"

export default class OrganizationsService {
    mapDataToOrganization(data: any) {
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
        return {
            organization_name: organization.organizationName,
            organization_description: organization.organizationDescription,
            organization_email: organization.organizationEmail,
            organization_phone: organization.organizationPhone,
            organization_create_date: organization.organizationCreateDate
        }
    }
    async getAllOrganizations() {
        try {
            const data = await axios.get(`${config.baseUrl}/organizations/`)
            if (data.data.length == 0) return null
            const organizations: Organizations[] = data.data.map((val: any) => {
                return this.mapDataToOrganization(val)
            })
            console.log(organizations);
            return organizations
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async createOrganization(organization: Organizations) {
        try {
            const dataOrganization = this.mapOrganizationToData(organization)
            const data = await axios.post(`${config.baseUrl}/organizations/`, dataOrganization)
            const newOrganization: Organizations = this.mapDataToOrganization(data.data)
            console.log(newOrganization)
            return newOrganization
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async updateOrganization(organizationId: number, organization: Organizations) {
        try {
            const dataOrganization = this.mapOrganizationToData(organization)
            const data = await axios.put(`${config.baseUrl}/organizations/${organizationId}`, dataOrganization)
            const updatedOrganization: Organizations = this.mapDataToOrganization(data.data)
            console.log(updatedOrganization)
            return updatedOrganization
        } catch (error) {
            console.log(error);
            return null
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
}

const organizationService = new OrganizationsService()
export { organizationService }