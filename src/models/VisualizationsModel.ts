import GenericModel, { IGenericResponse } from "./GenericModel"

enum VisualizationTypes {
    FILE = "file",
    DATA_POINTS = "data_points"
}

export interface IVisualizationResponse extends IGenericResponse {
    name: string
    type: VisualizationTypes
    report_id: number
    file_path: string
    data_points: ChardData | null
}

export default class Visualizations extends GenericModel {
    name: string
    type: VisualizationTypes
    reportId: number

    filePath: string

    dataPoints: ChardData | null = null

    constructor(
        id: number,
        name: string,
        reportId: number,
        filePath: string,
        dataPoints: ChardData | null = null,
        type: VisualizationTypes = VisualizationTypes.DATA_POINTS,
        createdDate: Date = new Date(),
        updatedDate: Date | null = null,
        deletedDate: Date | null = null,
        softDeleted: boolean = false,
    ) {
        super(id, createdDate, updatedDate, deletedDate, softDeleted)
        this.name = name
        this.type = type
        this.reportId = reportId
        this.filePath = filePath
        this.dataPoints = dataPoints
        this.createdDate = createdDate
        this.updatedDate = updatedDate
        this.deletedDate = deletedDate
        this.softDeleted = softDeleted
    }

    static fromJSON(visualizationJson: IVisualizationResponse): Visualizations {
        const visualization = new Visualizations(
            visualizationJson.id,
            visualizationJson.name,
            visualizationJson.report_id,
            visualizationJson.file_path,
            visualizationJson.data_points,
            visualizationJson.type,
            visualizationJson.created_date,
            visualizationJson.updated_date,
            visualizationJson.deleted_date,
            visualizationJson.soft_deleted,
        )

        return visualization
    }

    static toJSON(visualization: Visualizations): IVisualizationResponse {
        const visualizationRes = <IVisualizationResponse>{
            id: visualization.id,
            name: visualization.name,
            type: visualization.type,
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
