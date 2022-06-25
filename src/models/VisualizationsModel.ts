export default class Visualizations {
    visualizationId: number = 0
    visualizationName: string = ''
    visualizationImagePath: string = ''
    visualizationData: ChardData | undefined = undefined
    visualizationCreateDate: Date = new Date()
    reportId: number = 0
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