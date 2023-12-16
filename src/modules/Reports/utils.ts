import { ReportTypes } from "../../models/ReportsModel"

export const getReportTypeValue = (type: string) => {
    return ReportTypes[type]
}
export const getReportTypeSeverity = (type: string) => {
    if (ReportTypes[type] == ReportTypes.GENERIC) {
        return 'success'
    } else {

    }
    return 'info'
}
