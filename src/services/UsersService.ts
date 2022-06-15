import axios from "axios";
import config from "../config";
import Users from "../models/UsersModel";

interface UsersResponse {
    user_id: number
    user_first_name: string
    user_second_name: string
    user_email: string
    user_phone: string
    user_create_date: string
    user_username: string
    user_password: string
    role_id: number
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
            return errorMessage
        }
    }
    async getUserById(userId: number) {
        const errorMessage: String = 'Failed to get user'
        try {
            const response = await axios.get(`${config.baseUrl}/users/${userId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const user: Users = this.mapDataToUser(response.data)
            console.log(user)
            return user
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async sigInUser(userUsername: string, userPassword: string) {
        const errorMessage: String = 'Sign In failed'
        try {
            const response = await axios.post(`${config.baseUrl}/users/login`, {
                user_username: userUsername,
                user_password: userPassword
            })

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const user = this.mapDataToUser(response.data)
            return user
        } catch (error) {
            console.error(error);
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
            console.log(error)
            return errorMessage
        }
    }
    mapDataToUser(data: UsersResponse) {
        const user = new Users()
        user.userId = data.user_id
        user.userFirstName = data.user_first_name
        user.userSecondName = data.user_second_name
        user.userEmail = data.user_email
        user.userPhone = data.user_phone
        user.userUsername = data.user_username
        user.userPassword = data.user_password
        user.userCreateDate = new Date(data.user_create_date)
        user.roleId = data.role_id
        return user
    }
    mapUserToData(user: Users) {
        return <UsersResponse>{
            user_id: user.userId,
            user_first_name: user.userFirstName?.toString(),
            user_second_name: user.userSecondName?.toString(),
            user_email: user.userEmail?.toString(),
            user_create_date: user.userCreateDate?.toDateString(),
            user_phone: user.userPhone?.toString(),
            user_username: user.userUsername?.toString(),
            user_password: user.userPassword?.toString(),
            role_id: user.roleId
        }
    }
}

const userService = new UsersService()
export { userService }