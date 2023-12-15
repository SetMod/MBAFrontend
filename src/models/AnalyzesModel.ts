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
    name: string
    description: string
    support: number
    lift: number
    confidence: number
    rulesLength: number
    filePath: string
    status: AnalyzeStatus
    algorithm: Algorithm
    startedDate: Date | null
    finishedDate: Date | null
    creatorId: number
    datasourceId: number

    constructor(
        id: number = 0,
        name: string = '',
        description: string = '',
        support: number = 0,
        lift: number = 0,
        confidence: number = 0,
        rulesLength: number = 0,
        filePath: string = '',
        status: AnalyzeStatus = AnalyzeStatus.NOT_STARTED,
        algorithm: Algorithm = Algorithm.FPGROWTH,
        creatorId: number = 0,
        datasourceId: number = 0,
        startedDate: Date | null = null,
        finishedDate: Date | null = null,
        createdDate: Date = new Date(),
        updatedDate: Date | null = null,
        deletedDate: Date | null = null,
        softDeleted: boolean = false,
    ) {
        super(id, createdDate, updatedDate, deletedDate, softDeleted)
        this.name = name
        this.description = description
        this.support = support
        this.lift = lift
        this.confidence = confidence
        this.rulesLength = rulesLength
        this.filePath = filePath
        this.status = status
        this.algorithm = algorithm
        this.startedDate = startedDate
        this.finishedDate = finishedDate
        this.creatorId = creatorId
        this.datasourceId = datasourceId
        this.createdDate = createdDate
        this.updatedDate = updatedDate
        this.deletedDate = deletedDate
        this.softDeleted = softDeleted
    }

    static fromJSON(analyzeJson: IAnalyzesResponse): Analyzes {
        const analyze = new Analyzes(
            analyzeJson.id,
            analyzeJson.name,
            analyzeJson.description,
            analyzeJson.support,
            analyzeJson.lift,
            analyzeJson.confidence,
            analyzeJson.rules_length,
            analyzeJson.file_path,
            analyzeJson.status,
            analyzeJson.algorithm,
            analyzeJson.creator_id,
            analyzeJson.started_date,
            analyzeJson.finished_date,
            analyzeJson.created_date,
            analyzeJson.updated_date,
            analyzeJson.deleted_date,
            analyzeJson.soft_deleted,
        )
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
            status: analyze.status,
            algorithm: analyze.algorithm,
            creator_id: analyze.creatorId,
            started_date: analyze.startedDate,
            finished_date: analyze.finishedDate,
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
