import { AxiosError } from "axios";
import Reports, { IReportsResponse } from "../models/ReportsModel";
import GenericService from "./GenericService";
import Visualizations from "../models/VisualizationsModel";

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

    async getVisualizations(id: number) {
        try {
            const res = await this.api.get(`${this.url}/${id}/visualizations`)
            console.log(res)

            if (res.data instanceof Array) {
                const visualizations = res.data.map(visualizationJson => Visualizations.fromJSON(visualizationJson))
                console.log(visualizations)

                return visualizations
            }

            return []
        } catch (err) {
            let errorMessage = 'Failed to get report visualizations'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += err.message
            }

            throw new Error(errorMessage)
        }
    }
}

export const reportsService = new ReportsService()
