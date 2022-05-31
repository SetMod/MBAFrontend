import axios, { AxiosError } from "axios";
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
        try {
            const data = await axios.get(`${config.baseUrl}/users`)
            if (data.data.length == 0) return null
            const users: Users[] = data.data.map((val: UsersResponse) => {
                return this.mapDataToUser(val)
            })
            console.log(users)
            return users
        } catch (error) {
            console.error(error);
            return null
        }
    }
    async getUserByID(userId: number) {
        try {
            const data = await axios.get(`${config.baseUrl}/users/${userId}`)
            if (Object.keys(data.data).length === 0) return null
            const user: Users = this.mapDataToUser(data.data)
            console.log(user)
            return user
        } catch (error) {
            console.error(error);
            return null
        }
    }

    async sigInUser(userUsername: string, userPassword: string) {
        try {
            const data = await axios.post(`${config.baseUrl}/users/login`, { user_username: userUsername, user_password: userPassword })
            const user = this.mapDataToUser(data.data)
            return user
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                alert(error.response?.data)
            }
            return null
        }

    }

    async createUser(user: Users) {
        try {
            const dataUser = this.mapUserToData(user)
            const data = await axios.post(`${config.baseUrl}/users/`, dataUser)
            const newUser: Users = this.mapDataToUser(data.data)
            console.log(newUser)
            return newUser
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                alert(error.response?.data)
            }
            return null
        }
    }
    async updateUser(userId: number, user: Users) {
        try {
            const dataUser = this.mapUserToData(user)
            const data = await axios.put(`${config.baseUrl}/users/${userId}`, dataUser)
            const updatedUser: Users = this.mapDataToUser(data.data)
            console.log(updatedUser)
            return updatedUser
        } catch (error) {
            console.error(error);
            return null
        }
    }
    async deleteUser(userId: number) {
        try {
            const data = await axios.delete(`${config.baseUrl}/users/${userId}`)
            if (Object.keys(data.data).length === 0) return null
            const user: Users = this.mapDataToUser(data.data)
            console.log(user)
            return user
        } catch (error) {
            console.log(error)
            return null
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