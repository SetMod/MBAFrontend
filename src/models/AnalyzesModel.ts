import { IDatasourcesFullResponse } from "./DatasourcesModel"
import GenericModel, { IGenericResponse } from "./GenericModel"
import { IOrganizationMembersFullResponse } from "./OrganizationMembersModel"

export enum AnalyzeStatus {
    NOT_STARTED = "Not started",
    STARTED = "Started",
    SCHEDULED = "Scheduled",
    IN_PROGRESS = "In progress",
    FINISHED = "Finished",
    FAILED = "Failed"
}

export enum Algorithm {
    APRIORI = "Apriori",
    FPGROWTH = "FP-Growth",
    ECLAT = "ECLAT",
    FPMAX = "FP-Max",
    HMINE = "H-mine"
}

export const algorithmOptions = Object.keys(Algorithm).map((v: string) => {
    return {
        'name': v,
        'value': Algorithm[v]
    }
})

export interface IAnalyzeOptions {
    lines: string[],
    lines_limit: number,
    recreate: boolean
    scheduled_date: Date | null
}

export interface IAnalyzesResponse extends IGenericResponse {
    name: string
    description: string
    support: number
    lift: number
    confidence: number
    rules_length: number
    file_path: string
    status: AnalyzeStatus
    algorithm: Algorithm
    started_date: Date | null
    finished_date: Date | null
    datasource_id: number
    creator_id: number
}

export interface IAnalyzesFullResponse extends IAnalyzesResponse {
    datasource: IDatasourcesFullResponse
    creator: IOrganizationMembersFullResponse
}

export interface IAssociationRulesResponse {
    "antecedent support": number
    antecedents: Array<String>
    confidence: number
    "consequent support": number
    consequents: Array<String>
    conviction: number
    leverage: number
    lift: number
    support: number
}

export default class Analyzes extends GenericModel {
    id: number = 0
    name: string = ''
    description: string = ''
    support: number = 0.1
    lift: number = 1.1
    confidence: number = 0.5
    rulesLength: number = 2
    filePath: string = ''
    status: AnalyzeStatus = AnalyzeStatus.NOT_STARTED
    algorithm: Algorithm = Algorithm.FPGROWTH
    creatorId: number = 0
    datasourceId: number = 0
    startedDate: Date | null = null
    finishedDate: Date | null = null
    createdDate: Date = new Date()
    updatedDate: Date | null = null
    deletedDate: Date | null = null
    softDeleted: boolean = false

    static fromJSON(analyzeJson: IAnalyzesResponse): Analyzes {
        const analyze = new Analyzes()
        analyze.id = analyzeJson.id
        analyze.name = analyzeJson.name
        analyze.description = analyzeJson.description
        analyze.support = analyzeJson.support
        analyze.lift = analyzeJson.lift
        analyze.confidence = analyzeJson.confidence
        analyze.rulesLength = analyzeJson.rules_length
        analyze.filePath = analyzeJson.file_path
        analyze.status = AnalyzeStatus[analyzeJson.status]
        analyze.algorithm = Algorithm[analyzeJson.algorithm]
        analyze.startedDate = analyzeJson.started_date
        analyze.finishedDate = analyzeJson.finished_date
        analyze.creatorId = analyzeJson.creator_id
        analyze.datasourceId = analyzeJson.datasource_id
        analyze.createdDate = analyzeJson.created_date
        analyze.updatedDate = analyzeJson.updated_date
        analyze.deletedDate = analyzeJson.deleted_date
        analyze.softDeleted = analyzeJson.soft_deleted

        return analyze
    }

    static toJSON(analyze: Analyzes): IAnalyzesResponse {
        const analyzeRes = <IAnalyzesResponse>{
            id: analyze.id,
            name: analyze.name,
            description: analyze.description,
            support: analyze.support,
            lift: analyze.lift,
            confidence: analyze.confidence,
            rules_length: analyze.rulesLength,
            file_path: analyze.filePath,
            status: Object.keys(AnalyzeStatus).find((v) => AnalyzeStatus[v] == analyze.status),
            algorithm: Object.keys(Algorithm).find((v) => Algorithm[v] == analyze.algorithm),
            started_date: analyze.startedDate,
            finished_date: analyze.finishedDate,
            creator_id: analyze.creatorId,
            datasource_id: analyze.datasourceId,
            created_date: analyze.createdDate,
            updated_date: analyze.updatedDate,
            deleted_date: analyze.deletedDate,
            soft_deleted: analyze.softDeleted,
        }

        return analyzeRes
    }

    toJSON(): IAnalyzesResponse {
        return Analyzes.toJSON(this)
    }
}

export class AssociationRules {
    antecedentSupport: number = 0
    antecedents: Array<String> = []
    confidence: number = 0
    consequentSupport: number = 0
    consequents: Array<String> = []
    conviction: number = 0
    leverage: number = 0
    lift: number = 0
    support: number = 0
}
