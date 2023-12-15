import GenericModel, { IGenericResponse } from "./GenericModel"
import { IOrganizationMembersFullResponse } from "./OrganizationMembersModel"

export enum ReportTypes {
    GENERIC = "Generic",
    // STANDARD = "Standard"
}

export const reportTypeOptions = Object.keys(ReportTypes).map((v: string) => {
    return {
        'name': v,
        'value': ReportTypes[v]
    }
})

export interface IReportsResponse extends IGenericResponse {
    name: string
    type: ReportTypes
    creator_id: number
}

export interface IReportsFullResponse extends IReportsResponse {
    creator: IOrganizationMembersFullResponse
}

export default class Reports extends GenericModel {
    name: string = ''
    creatorId: number
    type: ReportTypes = ReportTypes.GENERIC

    constructor(
        id: number = 0,
        name: string = '',
        creatorId: number = 0,
        type: ReportTypes = ReportTypes.GENERIC,
        createdDate: Date = new Date(),
        updatedDate: Date | null = null,
        deletedDate: Date | null = null,
        softDeleted: boolean = false,
    ) {
        super(id, createdDate, updatedDate, deletedDate, softDeleted)
        this.name = name
        this.type = type
        this.creatorId = creatorId
        this.createdDate = createdDate
        this.updatedDate = updatedDate
        this.deletedDate = deletedDate
        this.softDeleted = softDeleted
    }

    static fromJSON(reportJson: IReportsResponse): Reports {
        const report = new Reports(
            reportJson.id,
            reportJson.name,
            reportJson.creator_id,
            reportJson.type,
            reportJson.created_date,
            reportJson.updated_date,
            reportJson.deleted_date,
            reportJson.soft_deleted,
        )

        return report
    }

    static toJSON(report: Reports): IReportsResponse {
        const reportRes = <IReportsResponse>{
            id: report.id,
            name: report.name,
            type: report.type,
            creator_id: report.creatorId,
            created_date: report.createdDate,
            updated_date: report.updatedDate,
            deleted_date: report.deletedDate,
            soft_deleted: report.softDeleted,
        }

        return reportRes
    }

    toJSON(): IReportsResponse {
        return Reports.toJSON(this)
    }
}
