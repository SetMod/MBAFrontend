import { reactive, ref, toRefs } from "vue"
import Visualizations, { ChardData } from "../models/VisualizationsModel"
import VisualizationsService, { TopSupportDataResponse, TopTransactionsDataResponse, TotalCostItemDataResponse, TopRulesDataResponse } from "../services/VisualizationsService"

export interface VisualizationsState {
    visualization: Visualizations | undefined
    visualizations: Visualizations[] | undefined
    userVisualizations: Visualizations[] | undefined
    reportVisualizations: Visualizations[] | undefined
}

const state = reactive<VisualizationsState>({
    visualization: undefined,
    visualizations: undefined,
    reportVisualizations: undefined,
    userVisualizations: undefined,
})

export default function useAnalyzes() {
    const visualizationsService = reactive(new VisualizationsService())
    const isLoading = ref(false)

    const resetVisualizations = () => {
        state.visualization = undefined
        state.visualizations = undefined
        state.userVisualizations = undefined
        state.reportVisualizations = undefined
    }

    const getVisualizations = async () => {
        isLoading.value = true
        const response = await visualizationsService.getVisualizations()
        if (Array.isArray(response)) state.visualizations = response
        isLoading.value = false

        return response
    }

    const getVisualizationById = async (visualizationId: number) => {
        isLoading.value = true
        const response = await visualizationsService.getVisualizationById(visualizationId)
        if (response instanceof Visualizations) state.visualization = response
        isLoading.value = false

        return response
    }
    const getVisualizationData = async (visualizationId: number) => {
        isLoading.value = true
        const response = await visualizationsService.getVisualizationData(visualizationId)
        isLoading.value = false

        return response
    }
    const downloadVisualization = async (visualizationId: number) => {
        isLoading.value = true
        const response = await visualizationsService.downloadVisualizationById(visualizationId)
        isLoading.value = false

        return response
    }

    const getReportVisualizations = async (reportId: number) => {
        isLoading.value = true
        const response = await visualizationsService.getReportVisualizations(reportId)
        if (Array.isArray(response)) {
            state.reportVisualizations = response
            state.reportVisualizations.forEach(async (visualization) => {
                const response = await getVisualizationData(visualization.visualizationId)

                if (visualizationsService.isTopSupportData(response)) visualization.visualizationData = toTopSupportChartData(response)
                else if (visualizationsService.isTopRulesData(response)) visualization.visualizationData = toTopRulesDataChartData(response)
                else if (visualizationsService.isTopTransactionsData(response)) visualization.visualizationData = toTopTransactionsChartData(response)
                else if (visualizationsService.isTotalCostItemData(response)) visualization.visualizationData = toTotalCostItemChartData(response)
            })
        }

        isLoading.value = false
        return response
    }

    const createVisualization = async (newVisualization: Visualizations, fileId: number) => {
        isLoading.value = true
        const response = await visualizationsService.createVisualization(newVisualization, fileId)
        // if (Array.isArray(response)) state.associationRules = response
        isLoading.value = false

        return response
    }

    const updateVisualization = async (updatedVisualization: Visualizations) => {
        isLoading.value = true
        const response = await visualizationsService.updateVisualization(updatedVisualization)
        isLoading.value = false

        return response
    }

    const deleteVisualization = async (visualizationId: number) => {
        isLoading.value = true
        const response = await visualizationsService.deleteVisualization(visualizationId)
        isLoading.value = false

        return response
    }


    const toTopSupportChartData = (data: TopSupportDataResponse) => {
        return <ChardData>{
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
        return <ChardData>{
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
        return <ChardData>{
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
        return <ChardData>{
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
    const isChartData = (data: any): data is ChardData => {
        return 'labels' in data && 'datasets' in data
    }

    return {
        resetVisualizations,
        getVisualizations,
        getVisualizationById,
        getVisualizationData,
        downloadVisualization,
        getReportVisualizations,
        createVisualization,
        updateVisualization,
        deleteVisualization,
        isChartData,
        isVisualizationsLoading: isLoading,
        ...toRefs(state)
    }
}