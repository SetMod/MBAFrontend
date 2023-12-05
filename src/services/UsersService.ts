import axios, { AxiosError } from "axios";
import Users, { UsersResponse } from "../models/UsersModel";
import GenericService from "./GenericService";
import { organizationsService } from "./OrganizationsService";

export default class UsersService extends GenericService<Users, UsersResponse> {

    constructor() {
        super("/users")
    }

    mapJSONToModel(userJson: UsersResponse): Users {
        const user = new Users()
        user.id = userJson.id
        user.firstName = userJson.first_name
        user.secondName = userJson.second_name
        user.username = userJson.username
        user.email = userJson.email
        user.phone = userJson.phone
        user.passwordHash = userJson.password_hash
        user.active = userJson.active
        user.lastLoginDate = userJson.last_login_date
        user.role = userJson.role
        user.createdDate = userJson.created_date
        user.updatedDate = userJson.updated_date
        user.deletedDate = userJson.deleted_date
        user.softDeleted = userJson.soft_deleted

        return user
    }

    mapModelToJSON(user: Users): UsersResponse {
        return <UsersResponse>{
            id: user.id,
            first_name: user.firstName,
            second_name: user.secondName,
            username: user.username,
            email: user.email,
            phone: user.phone,
            password_hash: user.passwordHash,
            active: user.active,
            last_login_date: user.lastLoginDate,
            role: user.role.toUpperCase(),
            created_date: user.createdDate,
            updated_date: user.updatedDate,
            deleted_date: user.deletedDate,
            soft_deleted: user.softDeleted,
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

    async getOrganizations(id: number) {
        try {
            const res = await this.api.get(`${this.url}/${id}/organizations`)
            console.log(res)

            const models = organizationsService.mapJSONToModels(res.data)
            console.log(models)

            return models

        } catch (err) {
            let errorMessage = "Failed to get user organizations"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getDatasources(id: number) {
        throw new Error("Not implemented")
    }

    async getReports(id: number) {
        throw new Error("Not implemented")
    }
}

export const usersService = new UsersService()
