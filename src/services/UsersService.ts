import { AxiosError } from "axios";
import Users, { IUsersResponse } from "../models/UsersModel";
import GenericService from "./GenericService";
import OrganizationMembers, { IOrganizationMembersFullResponse } from "../models/OrganizationMembersModel";
import Reports, { IReportsFullResponse } from "../models/ReportsModel";
import Datasources, { DatasourceTypes, IDatasourcesFullResponse } from "../models/DatasourcesModel";
import Analyzes, { IAnalyzesFullResponse } from "../models/AnalyzesModel";
import Organizations from "../models/OrganizationsModel";

export default class UsersService extends GenericService<Users, IUsersResponse> {

    constructor() {
        super("/users")
    }

    mapJSONToModel(userJson: IUsersResponse): Users {
        return Users.fromJSON(userJson)
    }

    mapModelToJSON(user: Users): IUsersResponse {
        return Users.toJSON(user)
    }

    async getOrganizations(userId: number): Promise<Organizations[]> {
        try {
            const res = await this.api.get(`${this.url}/${userId}/organizations`)
            console.log(res)

            if (res.data instanceof Array) {
                const organizations = res.data.map(orgJson => Organizations.fromJSON(orgJson))
                console.log(organizations)

                return organizations
            }

            return []
        } catch (err) {
            let errorMessage = "Failed to get user organizations"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getMemberships(userId: number): Promise<OrganizationMembers[]> {
        try {
            const res = await this.api.get(`${this.url}/${userId}/memberships`)
            console.log(res)

            if (res.data instanceof Array) {
                const members = res.data.map(memberJson => OrganizationMembers.fromJSON(memberJson))
                console.log(members)

                return members
            }

            return []
        } catch (err) {
            let errorMessage = "Failed to get user memberships"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getOrganizationMembersFull(userId: number): Promise<IOrganizationMembersFullResponse[]> {
        try {
            console.log('Getting all user memberships full');

            const res = await this.api.get(`${this.url}/${userId}/memberships/full`)
            console.log(res)

            return res.data
        } catch (err) {
            let errorMessage = "Failed to get user memberships full"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getDatasources(userId: number): Promise<Datasources[]> {
        try {
            const res = await this.api.get(`${this.url}/${userId}/datasources`)
            console.log(res)

            if (res.data instanceof Array) {
                const datasources = res.data.map(reportJson => Datasources.fromJSON(reportJson))
                console.log(datasources)

                return datasources
            }

            return []
        } catch (err) {
            let errorMessage = "Failed to get user datasources"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getDatasourcesFull(userId: number): Promise<IDatasourcesFullResponse[]> {
        try {
            console.log('Getting all user datasources full');

            const res = await this.api.get(`${this.url}/${userId}/datasources/full`)
            console.log(res)

            return res.data
        } catch (err) {
            let errorMessage = "Failed to get user datasources"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getAnalyzes(userId: number): Promise<Analyzes[]> {
        try {
            const res = await this.api.get(`${this.url}/${userId}/analyzes`)
            console.log(res)

            if (res.data instanceof Array) {
                const analyzes = res.data.map(reportJson => Analyzes.fromJSON(reportJson))
                console.log(analyzes)

                return analyzes
            }

            return []
        } catch (err) {
            let errorMessage = "Failed to get user analyzes"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getAnalyzesFull(userId: number): Promise<IAnalyzesFullResponse[]> {
        try {
            console.log('Getting all user analyzes full');

            const res = await this.api.get(`${this.url}/${userId}/analyzes/full`)
            console.log(res)

            return res.data
        } catch (err) {
            let errorMessage = "Failed to get user analyzes"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getReports(userId: number): Promise<Reports[]> {
        try {
            const res = await this.api.get(`${this.url}/${userId}/reports`)
            console.log(res)

            if (res.data instanceof Array) {
                const reports = res.data.map(reportJson => Reports.fromJSON(reportJson))
                console.log(reports)

                return reports
            }

            return []
        } catch (err) {
            let errorMessage = "Failed to get user reports"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getReportsFull(userId: number): Promise<IReportsFullResponse[]> {
        try {
            console.log('Getting user reports full');

            const res = await this.api.get(`${this.url}/${userId}/reports/full`)
            console.log(res)

            return res.data
        } catch (err) {
            let errorMessage = "Failed to get user reports"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async login(userUsername: string, userPassword: string) {
        try {
            const res = await this.api.post(`${this.url}/auth/login`, {
                username: userUsername,
                password: userPassword
            })
            console.log(res);

            const data: { message: string, access_token: string } = res.data

            return data
            // const user = this.mapJSONToModel(res.data)
            // console.log(user);

            // return user
        } catch (err) {
            let errorMessage = 'Login failed'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async whoAmI() {
        try {
            const res = await this.api.get(`${this.url}/auth/who_am_i`)
            console.log(res)

            const user = this.mapJSONToModel(res.data)
            console.log(user)

            return user
        } catch (err) {
            let errorMessage = 'Failed to check who am I'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async logout() {
        try {
            const res = await this.api.get(`${this.url}/auth/logout`)
            console.log(res);

            const data: { message: string } = res.data
            // const user = this.mapJSONToModel(res.data)
            // console.log(user);

            return data
        } catch (err) {
            let errorMessage = 'Logout failed'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async register(newUser: Users): Promise<Users> {
        try {
            const newUserJson = this.mapModelToJSON(newUser)
            console.log(newUserJson)

            const res = await this.api.post(`${this.url}/auth/register`, newUserJson)
            console.log(res)

            const newModel = this.mapJSONToModel(res.data)
            console.log(newModel)

            return newModel
        } catch (err) {
            let errorMessage = 'Failed to register'
            console.log(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
}

export const usersService = new UsersService()
