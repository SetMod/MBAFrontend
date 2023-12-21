export interface IGenericResponse {
    id: number
    created_date: Date
    updated_date: Date | null
    deleted_date: Date | null
    soft_deleted: boolean
}

export default abstract class GenericModel {
    id: number
    createdDate: Date
    updatedDate: Date | null
    deletedDate: Date | null
    softDeleted: boolean

    constructor(
        id: number = 0,
        createdDate: Date = new Date(),
        updatedDate: Date | null = null,
        deletedDate: Date | null = null,
        softDeleted: boolean = false,
    ) {
        this.id = id
        this.createdDate = createdDate
        this.updatedDate = updatedDate
        this.deletedDate = deletedDate
        this.softDeleted = softDeleted
    }

    static fromJSON(modelJson: IGenericResponse): GenericModel {
        throw new Error('Method not implemented');
    }

    static toJSON(model: GenericModel): IGenericResponse {
        throw new Error('Method not implemented');
    }

    toJSON(): IGenericResponse {
        return (this.constructor as typeof GenericModel).toJSON(this);
    }
}