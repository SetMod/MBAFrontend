import GenericModel, { IGenericResponse } from "./GenericModel"
import { ChartData } from "chart.js"

export enum VisualizationTypes {
    FILE = "file",
    DATA_POINTS = "data_points"
}
export enum VisualizationChartTypes {
    PIE = "pie",
    LINE = "line",
    BAR = "bar",
    RADAR = "radar",
    POLARAREA = "polarArea",
}

export type ChartType = 'pie' | 'line' | 'bar' | 'radar' | 'polarArea'
export const ChartTypeOptions = [
    {
        value: 'pie',
        name: 'Pie',
    },
    {
        value: 'line',
        name: 'Line',
    },
    {
        value: 'bar',
        name: 'Bar',
    },
    {
        value: 'radar',
        name: 'Radar',
    },
    {
        value: 'polarArea',
        name: 'Polar area',
    }
]

export interface IVisualizationResponse extends IGenericResponse {
    name: string
    type: VisualizationTypes
    chart_type: VisualizationChartTypes
    report_id: number
    file_path: string
    data_points: ChartData | null
}

export default class Visualizations extends GenericModel {
    id: number = 0
    name: string = ''
    reportId: number = 0
    filePath: string | null = ''
    dataPoints: ChartData | null = null
    type: VisualizationTypes = VisualizationTypes.DATA_POINTS
    createdDate: Date = new Date()
    updatedDate: Date | null = null
    deletedDate: Date | null = null
    softDeleted: boolean = false

    chartType: VisualizationChartTypes = VisualizationChartTypes.BAR
    chartData: ChartData | null = null

    static fromJSON(visualizationJson: IVisualizationResponse): Visualizations {
        const visualization = new Visualizations()
        visualization.id = visualizationJson.id
        visualization.name = visualizationJson.name
        visualization.type = VisualizationTypes[visualizationJson.type]
        visualization.chartType = VisualizationChartTypes[visualizationJson.chart_type]
        visualization.reportId = visualizationJson.report_id
        visualization.filePath = visualizationJson.file_path
        visualization.dataPoints = visualizationJson.data_points
        visualization.createdDate = visualizationJson.created_date
        visualization.updatedDate = visualizationJson.updated_date
        visualization.deletedDate = visualizationJson.deleted_date
        visualization.softDeleted = visualizationJson.soft_deleted

        return visualization
    }

    static toJSON(visualization: Visualizations): IVisualizationResponse {
        const visualizationRes = <IVisualizationResponse>{
            id: visualization.id,
            name: visualization.name,
            type: Object.keys(VisualizationTypes).find(v => VisualizationTypes[v] == visualization.type),
            chart_type: Object.keys(VisualizationChartTypes).find(v => VisualizationChartTypes[v] == visualization.chartType),
            report_id: visualization.reportId,
            file_path: visualization.filePath,
            data_points: visualization.dataPoints,
            created_date: visualization.createdDate,
            updated_date: visualization.updatedDate,
            deleted_date: visualization.deletedDate,
            soft_deleted: visualization.softDeleted,
        }

        return visualizationRes
    }

    toJSON(): IVisualizationResponse {
        return Visualizations.toJSON(this)
    }
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
