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
    creator_id: number | null
    analyze_id: number | null
}

export interface IReportsFullResponse extends IReportsResponse {
    creator: IOrganizationMembersFullResponse
}

export default class Reports extends GenericModel {
    id: number = 0
    name: string = ''
    type: ReportTypes = ReportTypes.GENERIC
    creatorId: number | null = 0
    analyzeId: number | null = 0
    createdDate: Date = new Date()
    updatedDate: Date | null = null
    deletedDate: Date | null = null
    softDeleted: boolean = false

    static fromJSON(reportJson: IReportsResponse): Reports {
        const report = new Reports()
        report.id = reportJson.id
        report.name = reportJson.name
        report.creatorId = reportJson.creator_id
        report.analyzeId = reportJson.analyze_id
        report.type = ReportTypes[reportJson.type]
        report.createdDate = reportJson.created_date
        report.updatedDate = reportJson.updated_date
        report.deletedDate = reportJson.deleted_date
        report.softDeleted = reportJson.soft_deleted

        return report
    }

    static toJSON(report: Reports): IReportsResponse {
        const reportRes = <IReportsResponse>{
            id: report.id,
            name: report.name,
            type: Object.keys(ReportTypes).find((v) => ReportTypes[v] == report.type),
            creator_id: report.creatorId,
            analyze_id: report.analyzeId,
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
