import GenericModel, { GenericResponse } from "./GenericModel"

enum VisualizationTypes {
    FILE = "file",
    DATA_POINTS = "data points"
}

export default class Visualizations extends GenericModel {
    name: string = ''
    type: VisualizationTypes = VisualizationTypes.DATA_POINTS
    reportId: number = 0
}

export class FileVisualizations extends Visualizations {
    filePath: string = ''
    visualizationId: number = 0
}

export class DataVisualizations extends GenericModel {
    name: string = ''
    filePath: string = ''
    dataPoints: ChardData | undefined = undefined
    visualizationId: number = 0
}

export interface ChartDataset {
    type: string | undefined,
    label: string | undefined,
    backgroundColor: string | undefined,
    data: number[]
}

export interface ChardData {
    labels: Array<string>
    datasets: Array<ChartDataset>
}

export interface VisualizationResponse extends GenericResponse {
    name: string
    type: VisualizationTypes
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
