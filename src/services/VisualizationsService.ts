import axios, { AxiosError } from "axios";
import config from "../config";
import Visualizations from "../models/VisualizationsModel";

export interface VisualizationResponse {
    id: number
    name: string
    image_file_path: string
    create_date: string
    report_id: number
}
export interface TopSupportDataResponse {
    itemsets: { [key: number]: string }
    support: { [key: number]: number }
}
export interface TopRulesDataResponse {
    'antecedent support': { [key: number]: number }
    antecedents: { [key: number]: string }
    confidence: { [key: number]: number }
    'consequent support': { [key: number]: number }
    consequents: { [key: number]: string }
    conviction: { [key: number]: number }
    leverage: { [key: number]: number }
    lift: { [key: number]: number }
    support: { [key: number]: number }
}
export interface TopTransactionsDataResponse {
    TransactionId: { [key: number]: number }
}
export interface TotalCostItemDataResponse {
    total_cost_item: { [key: number]: number }
}
export default class VisualizationsService {

    async getVisualizations() {
        const errorMessage = new String('Failed to get visualizations')
        try {
            const response = await axios.get(`${config.baseUrl}/visualizations/`)

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            const visualizations: Visualizations[] = response.data.map((val: VisualizationResponse) => {
                return this.mapDataToVisualization(val)
            })
            console.log(visualizations)
            return visualizations
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async getVisualizationById(visualizationId: number) {
        const errorMessage = new String('Failed to get visualization')
        try {
            const response = await axios.get(`${config.baseUrl}/visualizations/${visualizationId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const visualization: Visualizations = this.mapDataToVisualization(response.data)
            console.log(visualization)
            return visualization
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async getVisualizationData(analyzeId: number) {
        const errorMessage = new String('Failed to download the visualization file')
        try {
            const visualization = await this.getVisualizationById(analyzeId)
            if (visualization instanceof String) return visualization

            const response = await axios.get(`${config.baseUrl}/visualizations/data/${analyzeId}`)
            if (response.data instanceof String) return response.data
            console.log(response.data)

            if (this.isTopSupportData(response.data)) return response.data
            else if (this.isTopRulesData(response.data)) return response.data
            else if (this.isTopTransactionsData(response.data)) return response.data
            else if (this.isTotalCostItemData(response.data)) return response.data
            // else return response.data
        } catch (error) {
            console.error(error);
            return errorMessage
        }
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
    async downloadVisualizationById(visualizationId: number) {
        const errorMessage = new String('Failed to download the visualization file')
        try {
            const visualization = await this.getVisualizationById(visualizationId)
            if (visualization instanceof String) return visualization

            const response = await axios.get(`${config.baseUrl}/visualizations/download/${visualizationId}`, { responseType: 'blob' })

            const blob = new Blob([response.data], { type: response.data.type })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)

            link.download = visualization.visualizationName ? visualization.visualizationName : 'Untitled'
            // link.download = response.headers["content-disposition"].split("filename=")[1]
            document.body.appendChild(link);
            link.click()

        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async getReportVisualizations(reportId: number) {
        const errorMessage = new String('Failed to get report visualizations')
        try {
            const response = await axios.get(`${config.baseUrl}/reports/${reportId}/visualizations`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const visualizations: Visualizations[] = response.data.map((val: VisualizationResponse) => {
                return this.mapDataToVisualization(val)
            })
            console.log(visualizations)
            return visualizations
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async createVisualization(visualization: Visualizations, fileId: number) {
        const errorMessage = new String('Failed to create visualization')
        try {
            const dataAnalyze = this.mapVisualizationToData(visualization)
            // const response = await axios.post(`${config.baseUrl}/visualizations/`, { ...dataAnalyze, id: fileId })
            const response = await axios.post(`${config.baseUrl}/visualizations/?id=${fileId}`, dataAnalyze)
            // console.log(response);

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            // const associationRules: AssociationRules[] = response.data.map((val: AssociationRulesResponse) => {
            //     return this.mapDataToAssociationRules(val)
            // })
            // // console.log(associationRules)
            // return associationRules
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data);
            return errorMessage
        }
    }
    async updateVisualization(visualization: Visualizations) {
        const errorMessage = new String('Failed to update visualization')
        try {
            const dataVisualization = this.mapVisualizationToData(visualization)
            const response = await axios.put(`${config.baseUrl}/visualizations/${visualization.visualizationId}`, dataVisualization)

            if (response.data instanceof String) return response.data

            const updatedVisualization: Visualizations = this.mapDataToVisualization(response.data)
            console.log(updatedVisualization)
            return updatedVisualization
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data);
            return errorMessage
        }
    }
    async deleteVisualization(analyzeId: number) {
        const errorMessage = new String('Failed to delete visualization')
        try {
            const response = await axios.delete(`${config.baseUrl}/visualizations/${analyzeId}`)

            if (response.data instanceof String) return response.data

            const deletedVisualization: Visualizations = this.mapDataToVisualization(response.data)
            console.log(deletedVisualization)
            return deletedVisualization
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    mapDataToVisualization(data: VisualizationResponse) {
        const visualization = new Visualizations()
        visualization.visualizationId = data.id
        visualization.visualizationName = data.name
        visualization.visualizationImagePath = data.image_file_path
        visualization.visualizationCreateDate = new Date(data.create_date)
        visualization.reportId = data.report_id
        return visualization
    }
    mapVisualizationToData(visualization: Visualizations) {
        return <VisualizationResponse>{
            id: visualization.visualizationId,
            name: visualization.visualizationName,
            image_file_path: visualization.visualizationImagePath,
            create_date: visualization.visualizationCreateDate.toJSON(),
            report_id: visualization.reportId,
        }
    }
}