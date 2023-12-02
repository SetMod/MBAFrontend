import GenericModel, { GenericResponse } from "./GenericModel"

export enum AnalyzeStatus {
    SCHEDULED = "scheduled",
    STARTED = "started",
    IN_PROGRESS = "in progress",
    FINISHED = "finished",
    FAILED = "failed"
}

export default class Analyzes extends GenericModel {
    name: string = ''
    description: string = ''
    support: number = 0
    lift: number = 0
    confidence: number = 0
    rulesLength: number = 0
    filePath: string = ''
    status: AnalyzeStatus = AnalyzeStatus.STARTED
    startedDate: Date = new Date()
    finishedDate: Date = new Date()
    datasourceId: number = 0
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

export interface AnalyzeResponse extends GenericResponse {
    name: string
    description: string
    support: number
    lift: number
    confidence: number
    rules_length: number
    file_path: string
    status: AnalyzeStatus
    started_date: Date
    finished_date: Date
    datasource_id: number
}

export interface AssociationRulesResponse {
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