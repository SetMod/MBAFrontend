import GenericModel from "./GenericModel"

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