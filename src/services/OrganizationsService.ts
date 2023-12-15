import { AxiosError } from "axios"
import Organizations, { IOrganizationsResponse } from "../models/OrganizationsModel"
import GenericService from "./GenericService"
import Datasources, { IDatasourcesFullResponse } from "../models/DatasourcesModel"
import OrganizationMembers, { IOrganizationMembersFullResponse } from "../models/OrganizationMembersModel"
import Analyzes, { IAnalyzesFullResponse } from "../models/AnalyzesModel"
import Reports, { IReportsFullResponse } from "../models/ReportsModel"

export default class OrganizationsService extends GenericService<Organizations, IOrganizationsResponse> {

    constructor() {
        super("/organizations")
    }

    mapJSONToModel(organizationJson: IOrganizationsResponse): Organizations {
        return Organizations.fromJSON(organizationJson)
    }

    mapModelToJSON(organization: Organizations): IOrganizationsResponse {
        return Organizations.toJSON(organization)
    }

    async getMembers(orgId: number): Promise<OrganizationMembers[]> {
        try {
            console.log("Getting organization members");

            const res = await this.api.get(`${this.url}/${orgId}/members`)
            console.log(res)

            if (res.data instanceof Array) {
                const members = res.data.map(memberJson => OrganizationMembers.fromJSON(memberJson))
                console.log(members)

                return members
            }

            return []
        } catch (err) {
            let errorMessage = "Failed to get organization members"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getOrganizationMembersFull(orgId: number): Promise<IOrganizationMembersFullResponse[]> {
        try {
            console.log("Getting organization members full");
            const res = await this.api.get(`${this.url}/${orgId}/members/full`)
            console.log(res)

            return res.data
        } catch (err) {
            let errorMessage = "Failed to get organization members"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getDatasources(orgId: number): Promise<Datasources[]> {
        try {
            const res = await this.api.get(`${this.url}/${orgId}/datasources`)
            console.log(res)

            if (res.data instanceof Array) {
                const datasources = res.data.map(reportJson => Datasources.fromJSON(reportJson))
                console.log(datasources)

                return datasources
            }

            return []
        } catch (err) {
            let errorMessage = "Failed to get organization datasources"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getDatasourcesFull(orgId: number): Promise<IDatasourcesFullResponse[]> {
        try {
            console.log('Getting all organization datasources full');
            
            const res = await this.api.get(`${this.url}/${orgId}/datasources/full`)
            console.log(res)

            return res.data
        } catch (err) {
            let errorMessage = "Failed to get organization datasources"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getAnalyzes(orgId: number): Promise<Analyzes[]> {
        try {
            const res = await this.api.get(`${this.url}/${orgId}/analyzes`)
            console.log(res)

            if (res.data instanceof Array) {
                const analyzes = res.data.map(reportJson => Analyzes.fromJSON(reportJson))
                console.log(analyzes)

                return analyzes
            }

            return []
        } catch (err) {
            let errorMessage = "Failed to get organization analyzes"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getAnalyzesFull(orgId: number): Promise<IAnalyzesFullResponse[]> {
        try {
            console.log('Getting all organization analyzes full');
            
            const res = await this.api.get(`${this.url}/${orgId}/analyzes/full`)
            console.log(res)

            return res.data
        } catch (err) {
            let errorMessage = "Failed to get organization analyzes"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getReports(orgId: number): Promise<Reports[]> {
        try {
            const res = await this.api.get(`${this.url}/${orgId}/reports`)
            console.log(res)

            if (res.data instanceof Array) {
                const reports = res.data.map(reportJson => Reports.fromJSON(reportJson))
                console.log(reports)

                return reports
            }

            return []
        } catch (err) {
            let errorMessage = "Failed to get organization reports"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getReportsFull(orgId: number): Promise<IReportsFullResponse[]> {
        try {
            console.log('Getting organization reports full');
            
            const res = await this.api.get(`${this.url}/${orgId}/reports/full`)
            console.log(res)

            return res.data
        } catch (err) {
            let errorMessage = "Failed to get organization reports"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
}

export const organizationsService = new OrganizationsService()
