import { ref } from "vue"
import Visualizations, { TopSupportDataResponse, TopTransactionsDataResponse, TotalCostItemDataResponse, TopRulesDataResponse } from "../models/VisualizationsModel"
import { visualizationsService } from "../services/VisualizationsService"
import { reportsService } from "../services/ReportsService"
import { ChartData } from "chart.js"
import useCRUD from "./useCRUD"
import useState from "./useState"

const visualizationsState = useState<Visualizations>()
const {
    error: visualizationsError,
    isLoading: isVisualizationsLoading,
    model: visualization,
    models: visualizations,
    updatedModel: updatedVisualization,
    newModel: newVisualization,
    deletedModel: deletedVisualization,
    getAllModels: getVisualizations,
    getModelById: getVisualizationById,
    getModelByField: getVisualizationByField,
    getModelsByFields: getVisualizationsByFields,
    createModel: createVisualization,
    updateModel: updateVisualization,
    deleteModel: deleteVisualization,
} = useCRUD(visualizationsService, visualizationsState)

export default function useVisualizations() {
    const getVisualizationData = async (visualizationId: number) => {
        isVisualizationsLoading.value = true
        const response = await visualizationsService.getVisualizationData(visualizationId)
        isVisualizationsLoading.value = false

        return response
    }

    const createVisualizations = async (visualizations: Visualizations[]) => {
        isVisualizationsLoading.value = true
        visualizationsError.value = null
        try {
            await visualizationsService.createMany(visualizations)
        } catch (err) {
            if (err instanceof Error) {
                visualizationsError.value = err
                reportVisualizations.value = []
            }
        } finally {
            isVisualizationsLoading.value = false
        }
    }

    const downloadVisualization = async (visualizationId: number) => {
        isVisualizationsLoading.value = true
        visualizationsError.value = null
        try {
            await visualizationsService.downloadVisualizationById(visualizationId)
        } catch (err) {
            if (err instanceof Error) {
                visualizationsError.value = err
                reportVisualizations.value = []
            }
        } finally {
            isVisualizationsLoading.value = false
        }
    }

    const reportVisualizations = ref<Visualizations[]>([])
    const getReportVisualizations = async (reportId: number) => {
        isVisualizationsLoading.value = true
        visualizationsError.value = null
        try {
            const visualizations = await reportsService.getVisualizations(reportId)
            reportVisualizations.value = visualizations

            // reportVisualizations.value.forEach(async (visualization) => {
            //     const res = await getVisualizationData(visualization.id)

            //     if (visualizationsService.isTopSupportData(res)) visualization.visualizationData = toTopSupportChartData(res)
            //     else if (visualizationsService.isTopRulesData(res)) visualization.visualizationData = toTopRulesDataChartData(res)
            //     else if (visualizationsService.isTopTransactionsData(res)) visualization.visualizationData = toTopTransactionsChartData(res)
            //     else if (visualizationsService.isTotalCostItemData(res)) visualization.visualizationData = toTotalCostItemChartData(res)
            // })
        } catch (err) {
            if (err instanceof Error) {
                visualizationsError.value = err
                reportVisualizations.value = []
            }
        } finally {
            isVisualizationsLoading.value = false
        }
    }


    return {
        visualizationsError,
        isVisualizationsLoading,
        visualization,
        visualizations,
        updatedVisualization,
        newVisualization,
        deletedVisualization,
        reportVisualizations,
        getReportVisualizations,
        getVisualizations,
        getVisualizationById,
        getVisualizationByField,
        getVisualizationsByFields,
        createVisualization,
        createVisualizations,
        updateVisualization,
        deleteVisualization,
        getVisualizationData,
        downloadVisualization,
    }
}

const isChartData = (data: any): data is ChartData => {
    return 'labels' in data && 'datasets' in data
}

const toTopSupportChartData = (data: TopSupportDataResponse) => {
    return <ChartData>{
        labels: Object.keys(data.itemsets).map((key) => data.itemsets[parseInt(key)]),
        datasets: [
            {
                type: 'bar',
                label: 'Top support dataset',
                backgroundColor: '#42A5F5',
                data: Object.keys(data.support).map((key) => data.support[parseInt(key)])
            }
        ]
    }
}

const toTopRulesDataChartData = (data: TopRulesDataResponse) => {
    return <ChartData>{
        labels: Object.keys(data.antecedents).map((key) => data.antecedents[parseInt(key)]),
        datasets: [
            {
                label: 'Antecedent support dataset',
                backgroundColor: '#db382c',
                data: Object.keys(data["antecedent support"]).map((key) => data["antecedent support"][parseInt(key)])
            },
            {
                label: 'Consequent support dataset',
                backgroundColor: '#5cb52b',
                data: Object.keys(data["consequent support"]).map((key) => data["consequent support"][parseInt(key)])
            },
            {
                label: 'Support dataset',
                backgroundColor: '#2cd1b6',
                data: Object.keys(data.support).map((key) => data.support[parseInt(key)])
            },
            {
                label: 'Lift dataset',
                backgroundColor: '#9330d1',
                data: Object.keys(data.lift).map((key) => data.lift[parseInt(key)])
            },
            {
                label: 'Confidence dataset',
                backgroundColor: '#c42389',
                data: Object.keys(data.confidence).map((key) => data.confidence[parseInt(key)])
            }
        ]
    }
}

const toTopTransactionsChartData = (data: TopTransactionsDataResponse) => {
    return <ChartData>{
        labels: Object.keys(data.TransactionId).map((key) => key),
        datasets: [
            {
                label: 'Top transactions dataset',
                backgroundColor: '#1645F5',
                data: Object.keys(data.TransactionId).map((key) => data.TransactionId[parseInt(key)])
            }
        ]
    }
}

const toTotalCostItemChartData = (data: TotalCostItemDataResponse) => {
    return <ChartData>{
        labels: Object.keys(data.total_cost_item).map((key) => key),
        datasets: [
            {
                label: 'Top total cost per item dataset',
                backgroundColor: '#aa45F5',
                data: Object.keys(data.total_cost_item).map((key) => data.total_cost_item[parseInt(key)])
            }
        ]
    }
}