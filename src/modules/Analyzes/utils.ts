import { Algorithm, AnalyzeStatus } from "../../models/AnalyzesModel"

export const getAnalyzeStatus = (status: string) => {
    return AnalyzeStatus[status]
}
export const getAnalyzeSeverity = (status: string) => {
    return 'success'
}

export const getAlgorithmValue = (alg: string) => {
    return Algorithm[alg]
}
export const getAlgorithmSeverity = (alg: string) => {
    return 'warning'
}
