import { AxiosError } from "axios";
import Reports, { ReportsResponse } from "../models/ReportsModel";
import { VisualizationResponse } from "../models/VisualizationsModel";
import GenericService from "./GenericService";

export default class ReportsService extends GenericService<Reports, ReportsResponse> {

    constructor() {
        super("/reports")
    }

    mapJSONToModel(reportJson: ReportsResponse): Reports {
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

    mapModelToJSON(report: Reports): ReportsResponse {
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

    // async getVisualizations(id: number) {
    //     try {
    //         const res = await this.api.get(`${this.url}/${id}/visualizations`)

    //         const visualizations: Visualizations[] = res.data.map((val: VisualizationResponse) => {
    //             return this.mapDataToVisualization(val)
    //         })
    //         console.log(visualizations)
    //         return visualizations
    //     } catch (err) {
    //         let errorMessage = 'Failed to get report visualizations'
    //         console.error(err);
    //         if (err instanceof AxiosError) {
    //             errorMessage += err.message
    //         }

    //         throw new Error(errorMessage)
    //     }
    // }

    // async getAnalyzes(reportId: number) {
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

}

export const reportsService = new ReportsService()
