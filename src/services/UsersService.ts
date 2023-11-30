import axios, { AxiosError } from "axios";
import config from "../config";
import Users, { UsersResponse } from "../models/UsersModel";
import GenericService from "./GenericService";

export default class UsersService extends GenericService<Users, UsersResponse> {

    constructor() {
        super()
        this.setEndpoint(`${config.baseUrl}/users`)
    }

    mapJSONToModel(data: UsersResponse | UsersResponse[]): Users | Users[] {
        function map(userJson: UsersResponse) {
            const user = new Users()
            user.id = userJson.id
            user.firstName = userJson.first_name
            user.secondName = userJson.second_name
            user.email = userJson.email
            user.phone = userJson.phone
            user.passwordHash = userJson.password_hash
            user.active = userJson.active
            user.lastLoginDate = userJson.last_login_date
            user.createdDate = userJson.created_date
            user.updatedDate = userJson.updated_date
            user.deletedDate = userJson.deleted_date
            user.softDeleted = userJson.soft_deleted

            return user
        }
        if (data instanceof Array) {
            let users = new Array<Users>()
            for (let userJson of data) {
                users.push(map(userJson))
            }
            return users
        } else {
            return map(data)
        }
    }

    mapModelToJSON(user: Users | Users[]): UsersResponse | UsersResponse[] {
        function map(user: Users) {
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
        if (user instanceof Array) {
            let data = new Array<UsersResponse>()
            for (var val of user) {
                data.push(map(val))
            }
            return data
        } else {
            return map(user)
        }
    }

    async login(userUsername: string, userPassword: string) {
        try {
            const res = await axios.post(`${this.endpoint}/login`, {
                username: userUsername,
                password: userPassword
            })
            console.log(res);

            const user = this.mapJSONToModel(res.data)
            console.log(user);

            return user
        } catch (error) {
            const errorMessage = 'Login failed'
            console.error(error);
            if (error instanceof AxiosError && typeof error.response?.data === 'string')
                throw new Error(error.response?.data)
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