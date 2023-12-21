import { AxiosError } from "axios";
import Visualizations, { TopRulesDataResponse, TopSupportDataResponse, TopTransactionsDataResponse, TotalCostItemDataResponse, IVisualizationResponse } from "../models/VisualizationsModel";
import GenericService from "./GenericService";

export default class VisualizationsService extends GenericService<Visualizations, IVisualizationResponse> {

    constructor() {
        super("/visualizations");
    }

    mapJSONToModel(visualizationJson: IVisualizationResponse): Visualizations {
        return Visualizations.fromJSON(visualizationJson)
    }

    mapModelToJSON(visualization: Visualizations): IVisualizationResponse {
        return Visualizations.toJSON(visualization)
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

    async createMany(visualizations: Visualizations[]) {
        try {
            console.log(`Creating visualizations`);
            const visualizationsJson = this.mapModelsToJSON(visualizations)
            console.log(visualizationsJson)

            const res = await this.api.post(`${this.url}/many`, visualizationsJson)
            console.log(res)
        } catch (err) {
            let errorMessage = 'Failed to create visualizations'
            console.log(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async getVisualizationData(id: number) {
        try {
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
            link.click()

        } catch (error) {
            let errorMessage = 'Failed to download the visualization file'
            console.error(error);

            throw new Error(errorMessage)
        }
    }
}

export const visualizationsService = new VisualizationsService()
