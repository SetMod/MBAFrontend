import axios, { AxiosError } from "axios";
import Users, { Roles, UsersResponse } from "../models/UsersModel";
import GenericService from "./GenericService";
import { accessTokenKey } from "../config";

export default class UsersService extends GenericService<Users, UsersResponse> {

    constructor() {
        super("/users")
    }

    // mapStringToRoles(roleString: string): Roles {
    //     switch (roleString) {
    //         case 'ADMIN':
    //             return Roles.ADMIN;
    //         case 'USER':
    //             return Roles.USER;
    //         default:
    //             return Roles.USER;
    //     }
    // }

    mapJSONToModel(userJson: UsersResponse): Users {
        const user = new Users()
        user.id = userJson.id
        user.firstName = userJson.first_name
        user.secondName = userJson.second_name
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
            email: user.email,
            phone: user.phone,
            password_hash: user.passwordHash,
            active: user.active,
            last_login_date: user.lastLoginDate,
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
            // Store the token in localStorage
            localStorage.setItem(accessTokenKey, data.access_token);

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
            const res = await axios.get(`${this.url}/auth/logout`)
            console.log(res);

            // Remove the token from localStorage
            localStorage.removeItem(accessTokenKey);
            const data: { message: string } = res.data

            // const user = this.mapJSONToModel(res.data)
            // console.log(user);

            return data
        } catch (err) {
            let errorMessage = 'Login failed'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getOrganizations(id: number) {
        throw new Error("Not implemented")
    }

    async getDatasources(id: number) {
        throw new Error("Not implemented")
    }

    async getReports(id: number) {
        throw new Error("Not implemented")
    }
}

export const userService = new UsersService()