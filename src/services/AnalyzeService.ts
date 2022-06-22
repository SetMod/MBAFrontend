import axios, { AxiosError } from "axios";
import config from "../config";
import Analyzes from "../models/AnalyzesModel";

interface AnalyzeResponse {
    analyze_id: number
    analyze_name: string
    analyze_description: string
    analyze_support: number
    analyze_lift: number
    analyze_confidence: number
    analyze_rules_length: number
    analyze_file_path: string
    analyze_create_date: Date
    report_id: number
}

export default class AnalyzesService {

    async getAnalyzes() {
        const errorMessage: String = 'Failed to get analyzes'
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
        const errorMessage: String = 'Failed to get analyze'
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
    async getReportAnalyzes(reportId: number) {
        const errorMessage: String = 'Failed to get report analyzes'
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
    async getUserAnalyzes(userId: number) {
        const errorMessage: String = 'Failed to get user analyzes'
        try {
            const response = await axios.get(`${config.baseUrl}/users/${userId}/analyzes`)

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
    async createAnalyze(analyze: Analyzes) {
        const errorMessage: String = 'Failed to create an analyze'
        try {
            const dataAnalyze = this.mapAnalyzeToData(analyze)
            const response = await axios.post(`${config.baseUrl}/analyzes/`, dataAnalyze)

            if (response.data instanceof String) return response.data

            const newAnalyze: Analyzes = this.mapDataToAnalyze(response.data)
            console.log(newAnalyze)
            return newAnalyze
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data);
            return errorMessage
        }
    }
    async updateAnalyze(analyze: Analyzes) {
        const errorMessage: String = 'Failed to update analyze'
        try {
            const dataAnalyze = this.mapAnalyzeToData(analyze)
            const response = await axios.put(`${config.baseUrl}/analyzes/${analyze.analyzeId}`, dataAnalyze)

            if (response.data instanceof String) return response.data

            const updatedAnalyze: Analyzes = this.mapDataToAnalyze(response.data)
            console.log(updatedAnalyze)
            return updatedAnalyze
        } catch (error) {
            console.error(error);
            return errorMessage
        }
    }
    async deleteAnalyze(analyzeId: number) {
        const errorMessage: String = 'Failed to delete analyze'
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
        analyze.analyzeCreateDate = data.analyze_create_date
        analyze.reportId = data.report_id
        return analyze
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
            analyze_create_date: analyze.analyzeCreateDate,
            report_id: analyze.reportId,
        }
    }
}