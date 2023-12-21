import GenericModel, { IGenericResponse } from "./GenericModel"

export interface IOrganizationsResponse extends IGenericResponse {
    name: string
    description: string
    email: string
    phone: string
}

export default class Organizations extends GenericModel {
    name: string
    description: string
    email: string
    phone: string

    constructor(
        id: number,
        name: string,
        description: string,
        email: string,
        phone: string,
        createdDate: Date = new Date(),
        updatedDate: Date | null = null,
        deletedDate: Date | null = null,
        softDeleted: boolean = false,
    ) {
        super(id, createdDate, updatedDate, deletedDate, softDeleted)
        this.name = name
        this.description = description
        this.email = email
        this.phone = phone
        this.createdDate = createdDate
        this.updatedDate = updatedDate
        this.deletedDate = deletedDate
        this.softDeleted = softDeleted
    }

    static fromJSON(organizationJson: IOrganizationsResponse): Organizations {
        const organization = new Organizations(
            organizationJson.id,
            organizationJson.name,
            organizationJson.description,
            organizationJson.email,
            organizationJson.phone,
            organizationJson.created_date,
            organizationJson.updated_date,
            organizationJson.deleted_date,
            organizationJson.soft_deleted,
        )
        return organization
    }

    static toJSON(organization: Organizations): IOrganizationsResponse {
        const orgRes = <IOrganizationsResponse>{
            id: organization.id,
            name: organization.name,
            description: organization.description,
            email: organization.email,
            phone: organization.phone,
            created_date: organization.createdDate,
            updated_date: organization.updatedDate,
            deleted_date: organization.deletedDate,
            soft_deleted: organization.softDeleted,
        }

        return orgRes
    }

    toJSON(): IOrganizationsResponse {
        return Organizations.toJSON(this)
    }
}
