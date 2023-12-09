import GenericModel, { IGenericResponse } from "./GenericModel"

export enum Roles {
    ADMIN = "Admin",
    USER = "User"
}

export interface IUsersResponse extends IGenericResponse {
    first_name: string
    second_name: string
    email: string
    phone: string
    username: string
    password_hash: string
    active: boolean
    role: Roles
    last_login_date: Date | null
}

export default class Users extends GenericModel {
    firstName: string
    secondName: string
    username: string
    passwordHash: string = ''
    password: string
    email: string
    phone: string
    active: boolean
    role: Roles
    lastLoginDate: Date | null

    constructor(
        id: number,
        firstName: string,
        secondName: string,
        username: string,
        password: string,
        email: string,
        phone: string,
        active: boolean = true,
        role: Roles = Roles.USER,
        lastLoginDate: Date | null = null,
        createdDate: Date = new Date(),
        updatedDate: Date | null = null,
        deletedDate: Date | null = null,
        softDeleted: boolean = false,
    ) {
        super(id, createdDate, updatedDate, deletedDate, softDeleted)
        this.firstName = firstName
        this.secondName = secondName
        this.username = username
        this.email = email
        this.phone = phone
        this.password = password
        this.active = active
        this.role = role
        this.lastLoginDate = lastLoginDate
        this.createdDate = createdDate
        this.updatedDate = updatedDate
        this.deletedDate = deletedDate
        this.softDeleted = softDeleted
    }

    static fromJSON(userJson: IUsersResponse): Users {
        const user = new Users(
            userJson.id,
            userJson.first_name,
            userJson.second_name,
            userJson.username,
            userJson.password_hash,
            userJson.email,
            userJson.phone,
            userJson.active,
            userJson.role,
            userJson.last_login_date,
            userJson.created_date,
            userJson.updated_date,
            userJson.deleted_date,
            userJson.soft_deleted,
        )

        return user
    }

    static toJSON(user: Users): IUsersResponse {
        const userRes = <IUsersResponse>{
            id: user.id,
            first_name: user.firstName,
            second_name: user.secondName,
            username: user.username,
            password_hash: user.passwordHash,
            email: user.email,
            phone: user.phone,
            active: user.active,
            role: user.role.toUpperCase(),
            last_login_date: user.lastLoginDate,
            created_date: user.createdDate,
            updated_date: user.updatedDate,
            deleted_date: user.deletedDate,
            soft_deleted: user.softDeleted,
        }

        return userRes
    }

    toJSON(): IUsersResponse {
        return Users.toJSON(this);
    }
}
