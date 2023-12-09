import { AxiosError } from "axios";
import Users, { IUsersResponse } from "../models/UsersModel";
import GenericService from "./GenericService";

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
