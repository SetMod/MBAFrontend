import axios, { AxiosError } from "axios";
import config from "../config";
import Users from "../models/UsersModel";

interface UsersResponse {
    id: number
    first_name: string
    second_name: string
    email: string
    phone: string
    create_date: string
    username: string
    password: string
    role_id: number
    name: string
}


export default class UsersService {

    async getUsers() {
        const errorMessage: String = 'Failed to get users'
        try {
            const response = await axios.get(`${config.baseUrl}/users`)

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            const users: Users[] = response.data.map((user: UsersResponse) => {
                return this.mapDataToUser(user)
            })
            console.log(users)
            return users
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async getUserById(userId: number) {
        const errorMessage: String = 'Failed to get user'
        try {
            const response = await axios.get(`${config.baseUrl}/users/${userId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            console.log(response.data);

            const user: Users = this.mapDataToUser(response.data)
            console.log(user)
            return user
        } catch (error) {
            console.error(error)
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async sigInUser(userUsername: string, userPassword: string) {
        const errorMessage: String = 'Sign In failed'
        try {
            const response = await axios.post(`${config.baseUrl}/users/login`, {
                username: userUsername,
                password: userPassword
            })

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const user = this.mapDataToUser(response.data)
            console.log(user);
            return user
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            // if (error instanceof AxiosError) {
            //     alert(error.response?.data)
            // }
            return errorMessage
        }

    }
    async createUser(user: Users) {
        const errorMessage: String = 'Sign Up failed'
        try {
            const dataUser = this.mapUserToData(user)
            const response = await axios.post(`${config.baseUrl}/users/`, dataUser)

            if (response.data instanceof String) return response.data

            const newUser: Users = this.mapDataToUser(response.data)
            console.log(newUser)
            return newUser
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async updateUser(user: Users) {
        const errorMessage: String = 'User update failed'
        try {
            const dataUser = this.mapUserToData(user)
            const response = await axios.put(`${config.baseUrl}/users/${user.userId}`, dataUser)

            if (response.data instanceof String) return response.data

            const updatedUser: Users = this.mapDataToUser(response.data)
            console.log(updatedUser)
            return updatedUser
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async deleteUser(userId: number) {
        const errorMessage: String = 'Failed to delete a user'
        try {
            const response = await axios.delete(`${config.baseUrl}/users/${userId}`)

            if (response.data instanceof String) return response.data

            const user: Users = this.mapDataToUser(response.data)
            console.log(user)
            return user
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    mapDataToUser(data: UsersResponse) {
        const user = new Users()
        user.userId = data.id
        user.userFirstName = data.first_name
        user.userSecondName = data.second_name
        user.userEmail = data.email
        user.userPhone = data.phone
        user.userUsername = data.username
        user.userPassword = data.password
        user.userCreateDate = new Date(data.create_date)
        user.roleId = data.role_id
        user.roleName = data.name
        return user
    }
    mapUserToData(user: Users) {
        return <UsersResponse>{
            id: user.userId,
            first_name: user.userFirstName,
            second_name: user.userSecondName,
            email: user.userEmail,
            create_date: user.userCreateDate?.toJSON(),
            phone: user.userPhone,
            username: user.userUsername,
            password: user.userPassword,
            role_id: user.roleId,
        }
    }
}

const userService = new UsersService()
export { userService }