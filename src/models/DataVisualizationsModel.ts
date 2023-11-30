import GenericModel from "./GenericModel"

export default class DataVisualizations extends GenericModel {
    name: string = ''
    filePath: string = ''
    dataPoints: ChardData | undefined = undefined
    visualizationId: number = 0
}

export interface ChardData {
    labels: Array<string>
    datasets: Array<{
        type: string | undefined,
        label: string | undefined,
        backgroundColor: string | undefined,
        data: number[]
    }>
}