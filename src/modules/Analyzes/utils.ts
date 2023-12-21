import { Algorithm, AnalyzeStatus } from "../../models/AnalyzesModel"

export const getAnalyzeStatus = (status: string) => {
    return AnalyzeStatus[status]
}
export const getAnalyzeSeverity = (status: string) => {
    if (status == AnalyzeStatus.NOT_STARTED) { return 'warning' }
    else if (status == AnalyzeStatus.IN_PROGRESS) { return 'info' }
    else if (status == AnalyzeStatus.SCHEDULED) { return 'info' }
    else if (status == AnalyzeStatus.SCHEDULED) { return 'info' }
    else if (status == AnalyzeStatus.STARTED) { return 'success' }
    else if (status == AnalyzeStatus.FAILED) { return 'danger' }
    else { return 'success' }
}

export const getAlgorithmValue = (alg: string) => {
    return Algorithm[alg]
}
export const getAlgorithmSeverity = (alg: string) => {
    return ''
}
