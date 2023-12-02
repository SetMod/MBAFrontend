import { AxiosError } from "axios";
import Visualizations, { TopRulesDataResponse, TopSupportDataResponse, TopTransactionsDataResponse, TotalCostItemDataResponse, VisualizationResponse } from "../models/VisualizationsModel";
import GenericService from "./GenericService";

export default class VisualizationsService extends GenericService<Visualizations, VisualizationResponse> {

    constructor() {
        super("/visualizations");
    }

    isTopSupportData = (obj: any): obj is TopSupportDataResponse => {
        return 'itemsets' in obj && 'support' in obj;
    }
    isTopRulesData = (obj: any): obj is TopRulesDataResponse => {
        return 'antecedent support' in obj && 'antecedents' in obj && 'confidence' in obj && 'consequent support' in obj && 'consequents' in obj && 'conviction' in obj && 'leverage' in obj && 'lift' in obj && 'support' in obj;
    }
    isTopTransactionsData = (obj: any): obj is TopTransactionsDataResponse => {
        return 'TransactionId' in obj;
    }
    isTotalCostItemData = (obj: any): obj is TotalCostItemDataResponse => {
        return 'total_cost_item' in obj;
    }

    async getVisualizationData(id: number) {
        try {
            const visualization = await this.getById(id)

            const response = await this.api.get(`${this.url}/data/${id}`)
            console.log(response.data)

            if (this.isTopSupportData(response.data)) return response.data
            else if (this.isTopRulesData(response.data)) return response.data
            else if (this.isTopTransactionsData(response.data)) return response.data
            else if (this.isTotalCostItemData(response.data)) return response.data
            // else return response.data
        } catch (error) {
            let errorMessage = 'Failed to download the visualization file'

            console.error(error);
            throw new Error(errorMessage)
        }
    }

    async downloadVisualizationById(id: number) {
        try {
            const visualization = await this.getById(id)

            const res = await this.api.get(`${this.url}/download/${id}`, { responseType: 'blob' })
            console.log(res)

            const blob = new Blob([res.data], { type: res.data.type })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = visualization.name ? visualization.name : 'Untitled'
            // link.download = response.headers["content-disposition"].split("name=")[1]
            document.body.appendChild(link);
            link.click()

        } catch (error) {
            let errorMessage = 'Failed to download the visualization file'
            console.error(error);

            throw new Error(errorMessage)
        }
    }


    async createVisualization(visualization: Visualizations, fileId: number) {
        try {
            const dataAnalyze = this.mapModelToJSON(visualization)
            // const res = await this.api.post(`${config.baseUrl}/visualizations/`, { ...dataAnalyze, id: fileId })
            const res = await this.api.post(this.url, dataAnalyze, {
                params: {
                    "id": fileId
                }
            })
            console.log(res);

            // const associationRules: AssociationRules[] = res.data.map((val: AssociationRulesResponse) => {
            //     return this.mapDataToAssociationRules(val)
            // })
            // // console.log(associationRules)
            // return associationRules
        } catch (error) {
            let errorMessage = 'Failed to create visualization'

            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return error.response?.data
            throw new Error(errorMessage)
        }
    }

    async updateVisualization(visualization: Visualizations) {
        try {
            const dataVisualization = this.mapModelToJSON(visualization)
            const response = await this.api.put(`${this.url}/${visualization.id}`, dataVisualization)

            const updatedVisualization: Visualizations = this.mapJSONToModel(response.data)
            console.log(updatedVisualization)

            return updatedVisualization
        } catch (err) {
            let errorMessage = 'Failed to update visualization'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += err.message
            }

            throw new Error(errorMessage)
        }
    }

    async deleteVisualization(id: number) {
        try {
            const response = await this.api.delete(`${this.url}/${id}`)

            const deletedVisualization: Visualizations = this.mapJSONToModel(response.data)
            console.log(deletedVisualization)

            return deletedVisualization
        } catch (err) {
            let errorMessage = 'Failed to delete visualization'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += err.message
            }

            throw new Error(errorMessage)
        }
    }

    mapJSONToModel(visualizationJson: VisualizationResponse): Visualizations {
        const visualization = new Visualizations()
        visualization.id = visualizationJson.id
        visualization.name = visualizationJson.name
        visualization.type = visualizationJson.type
        visualization.reportId = visualizationJson.report_id
        visualization.createdDate = visualizationJson.created_date
        visualization.updatedDate = visualizationJson.updated_date
        visualization.deletedDate = visualizationJson.deleted_date
        visualization.softDeleted = visualizationJson.soft_deleted

        return visualization
    }

    mapModelToJSON(visualization: Visualizations): VisualizationResponse {
        return <VisualizationResponse>{
            id: visualization.id,
            name: visualization.name,
            type: visualization.type,
            report_id: visualization.reportId,
            created_date: visualization.createdDate,
            updated_date: visualization.updatedDate,
            deleted_date: visualization.deletedDate,
            soft_deleted: visualization.softDeleted,
        }
    }
}