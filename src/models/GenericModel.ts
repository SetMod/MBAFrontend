export default class GenericModel {
    id: number = 0
    createdDate: Date = new Date()
    updatedDate: Date = new Date()
    deletedDate: Date = new Date()
    softDeleted: boolean = false
}

export interface GenericResponse {
    id: number
    created_date: Date
    updated_date: Date
    deleted_date: Date
    soft_deleted: boolean
}