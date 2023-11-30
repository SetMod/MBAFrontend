import GenericModel, { GenericResponse } from "./GenericModel"

enum AnalyzeStatus {
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
    started_date: Date = new Date()
    finished_date: Date = new Date()
    reportId: number = 0
}

export interface AnalyzeResponse extends GenericResponse {
    name: string
    description: string
    support: number
    lift: number
    confidence: number
    rules_length: number
    file_path: string
    status: string
    started_date: Date
    finished_date: Date
    report_id: number
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