import axios, { AxiosError } from "axios";
import config from "../config";
import Analyzes from "../models/AnalyzesModel";
import AssociationRules from "../models/AssociationRulesModel";

export interface AnalyzeResponse {
    analyze_id: number
    analyze_name: string
    analyze_description: string
    analyze_support: number
    analyze_lift: number
    analyze_confidence: number
    analyze_rules_length: number
    analyze_file_path: string
    analyze_create_date: string
    report_id: number
}
export interface AssociationRulesResponse {
    "antecedent support": number
    antecedents: Array<String>
    confidence: number
    "consequent support": number
    consequents: Array<String>
    conviction: number
    leverage: number
    lift: number
    support: number
}

export default class AnalyzesService {

    async getAnalyzes() {
        const errorMessage = new String('Failed to get analyzes')
        try {
            const response = await axios.get(`${config.baseUrl}/analyzes/`)

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            const analyzes: Analyzes[] = response.data.map((val: AnalyzeResponse) => {
                return this.mapDataToAnalyze(val)
            })
            console.log(analyzes)
            return analyzes
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async getAnalyzeById(analyzeId: number) {
        const errorMessage = new String('Failed to get analyze')
        try {
            const response = await axios.get(`${config.baseUrl}/analyzes/${analyzeId}`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const analyze: Analyzes = this.mapDataToAnalyze(response.data)
            console.log(analyze)
            return analyze
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async downloadAnalyzeById(analyzeId: number) {
        const errorMessage = new String('Failed to download the analyze file')
        try {
            const analyze = await this.getAnalyzeById(analyzeId)
            if (analyze instanceof String) return analyze

            const response = await axios.get(`${config.baseUrl}/analyzes/download/${analyzeId}`, { responseType: 'blob' })

            const blob = new Blob([response.data], { type: response.data.type })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)

            link.download = analyze.analyzeName ? analyze.analyzeName : 'Untitled'
            // link.download = response.headers["content-disposition"].split("filename=")[1]
            document.body.appendChild(link);
            link.click()

        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async getReportAnalyzes(reportId: number) {
        const errorMessage = new String('Failed to get report analyzes')
        try {
            const response = await axios.get(`${config.baseUrl}/reports/${reportId}/analyzes`)

            if (response.data instanceof String) return response.data
            if (Object.keys(response.data).length === 0) return errorMessage

            const analyzes: Analyzes[] = response.data.map((val: AnalyzeResponse) => {
                return this.mapDataToAnalyze(val)
            })
            console.log(analyzes)
            return analyzes
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    async createAnalyze(analyze: Analyzes, fileId: number) {
        const errorMessage = new String('Failed to create an analyze')
        try {
            const dataAnalyze = this.mapAnalyzeToData(analyze)
            // const response = await axios.post(`${config.baseUrl}/analyzes/`, { ...dataAnalyze, file_id: fileId })
            const response = await axios.post(`${config.baseUrl}/analyzes/?file_id=${fileId}`, dataAnalyze)
            // console.log(response);

            if (response.data instanceof String) return response.data
            if (Array.isArray(response.data) == false) return errorMessage

            const associationRules: AssociationRules[] = response.data.map((val: AssociationRulesResponse) => {
                return this.mapDataToAssociationRules(val)
            })
            // console.log(associationRules)
            return associationRules
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data);
            return errorMessage
        }
    }
    async updateAnalyze(analyze: Analyzes) {
        const errorMessage = new String('Failed to update analyze')
        try {
            const dataAnalyze = this.mapAnalyzeToData(analyze)
            const response = await axios.put(`${config.baseUrl}/analyzes/${analyze.analyzeId}`, dataAnalyze)

            if (response.data instanceof String) return response.data

            const updatedAnalyze: Analyzes = this.mapDataToAnalyze(response.data)
            console.log(updatedAnalyze)
            return updatedAnalyze
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data);
            return errorMessage
        }
    }
    async deleteAnalyze(analyzeId: number) {
        const errorMessage = new String('Failed to delete analyze')
        try {
            const response = await axios.delete(`${config.baseUrl}/analyzes/${analyzeId}`)

            if (response.data instanceof String) return response.data

            const deletedAnalyze: Analyzes = this.mapDataToAnalyze(response.data)
            console.log(deletedAnalyze)
            return deletedAnalyze
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
            return errorMessage
        }
    }
    mapDataToAnalyze(data: AnalyzeResponse) {
        const analyze = new Analyzes()
        analyze.analyzeId = data.analyze_id
        analyze.analyzeName = data.analyze_name
        analyze.analyzeDescription = data.analyze_description
        analyze.analyzeSupport = data.analyze_support
        analyze.analyzeLift = data.analyze_lift
        analyze.analyzeConfidence = data.analyze_confidence
        analyze.analyzeRulesLength = data.analyze_rules_length
        analyze.analyzeFilePath = data.analyze_file_path
        analyze.analyzeCreateDate = new Date(data.analyze_create_date)
        analyze.reportId = data.report_id
        return analyze
    }
    mapDataToAssociationRules(data: AssociationRulesResponse) {
        const associationRules = new AssociationRules()
        associationRules.antecedentSupport = data["antecedent support"]
        associationRules.antecedents = data.antecedents
        associationRules.confidence = data.confidence
        associationRules.consequentSupport = data["consequent support"]
        associationRules.consequents = data.consequents
        associationRules.conviction = data.conviction
        associationRules.leverage = data.leverage
        associationRules.lift = data.lift
        associationRules.support = data.support
        return associationRules
    }
    mapAnalyzeToData(analyze: Analyzes) {
        return <AnalyzeResponse>{
            analyze_id: analyze.analyzeId,
            analyze_name: analyze.analyzeName,
            analyze_description: analyze.analyzeDescription,
            analyze_support: analyze.analyzeSupport,
            analyze_lift: analyze.analyzeLift,
            analyze_confidence: analyze.analyzeConfidence,
            analyze_rules_length: analyze.analyzeRulesLength,
            analyze_file_path: analyze.analyzeFilePath,
            analyze_create_date: analyze.analyzeCreateDate.toJSON(),
            report_id: analyze.reportId,
        }
    }
}