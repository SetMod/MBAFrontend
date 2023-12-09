import { AxiosError } from "axios";
import Reports, { IReportsResponse } from "../models/ReportsModel";
import GenericService from "./GenericService";

export default class ReportsService extends GenericService<Reports, IReportsResponse> {

    constructor() {
        super("/reports")
    }

    mapJSONToModel(reportJson: IReportsResponse): Reports {
        return Reports.fromJSON(reportJson)
    }

    mapModelToJSON(report: Reports): IReportsResponse {
        return Reports.toJSON(report)
    }

    async getUserReports(userId: number) {
        try {
            console.log(`Getting all user reports with id='${userId}'`);
            const res = await this.api.get(`/users/${userId}/reports`)
            console.log(res)

            const models = this.mapJSONToModels(res.data)
            console.log(models)

            return models

        } catch (err) {
            let errorMessage = "Failed to get all user reports"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    // async getVisualizations(id: number) {
    //     try {
    //         const res = await this.api.get(`${this.url}/${id}/visualizations`)

    //         const visualizations: Visualizations[] = res.data.map((val: IVisualizationResponse) => {
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
