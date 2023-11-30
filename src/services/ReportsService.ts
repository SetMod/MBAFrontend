import axios, { AxiosError } from "axios";
import config from "../config";
import Reports, { ReportsResponse } from "../models/ReportsModel";
import GenericService from "./GenericService";

export default class ReportsService extends GenericService<Reports, ReportsResponse> {

    constructor() {
        super()
        this.setEndpoint(`${config.baseUrl}/reports`)
    }

    mapJSONToModel(data: ReportsResponse | ReportsResponse[]): Reports | Reports[] {
        function map(reportJson: ReportsResponse) {
            const report = new Reports()
            report.id = reportJson.id
            report.name = reportJson.name
            report.type = reportJson.type
            report.userId = reportJson.user_id
            report.organizationId = reportJson.organization_id
            report.createdDate = reportJson.created_date
            report.updatedDate = reportJson.updated_date
            report.deletedDate = reportJson.deleted_date
            report.softDeleted = reportJson.soft_deleted

            return report
        }
        if (data instanceof Array) {
            let reports = new Array<Reports>()
            for (let reportJson of data) {
                reports.push(map(reportJson))
            }
            return reports
        } else {
            return map(data)
        }
    }

    mapModelToJSON(report: Reports | Reports[]): ReportsResponse | ReportsResponse[] {
        function map(report: Reports) {
            return <ReportsResponse>{
                id: report.id,
                name: report.name,
                type: report.type,
                user_id: report.userId,
                organization_id: report.organizationId,
                created_date: report.createdDate,
                updated_date: report.updatedDate,
                deleted_date: report.deletedDate,
                soft_deleted: report.softDeleted,
            }
        }
        if (report instanceof Array) {
            let data = new Array<ReportsResponse>()
            for (var val of report) {
                data.push(map(val))
            }
            return data
        } else {
            return map(report)
        }
    }

    // async getReportAnalyzes(reportId: number) {
    //     const errorMessage: String = 'Failed to get report analyzes'
    //     try {
    //         const response = await axios.get(`${config.baseUrl}/reports/${reportId}.analyzes`)

    //         if (response.data instanceof String) return response.data
    //         if (Object.keys(response.data).length === 0) return errorMessage

    //         const report: Reports = this.mapDataToReport(response.data)
    //         console.log(report)
    //         return report
    //     } catch (error) {
    //         console.error(error);
    //         if (error instanceof AxiosError)
    //             if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
    //         return errorMessage
    //     }
    // }
    // async getUserReports(userId: number) {
    //     const errorMessage: String = 'Failed to get report'
    //     try {
    //         const response = await axios.get(`${config.baseUrl}/users/${userId}/reports`)

    //         if (response.data instanceof String) return response.data
    //         if (Object.keys(response.data).length === 0) return errorMessage

    //         const reports: Reports[] = response.data.map((val: ReportsResponse) => {
    //             return this.mapDataToReport(val)
    //         })
    //         console.log(reports)
    //         return reports
    //     } catch (error) {
    //         console.error(error);
    //         if (error instanceof AxiosError)
    //             if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
    //         return errorMessage
    //     }
    // }

}