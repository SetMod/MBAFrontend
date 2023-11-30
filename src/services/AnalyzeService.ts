import axios, { AxiosError } from "axios";
import config from "../config";
import Analyzes, { AnalyzeResponse, AssociationRulesResponse } from "../models/AnalyzesModel";
import AssociationRules from "../models/AssociationRulesModel";
import GenericService from "./GenericService";

export default class AnalyzesService extends GenericService<Analyzes, AnalyzeResponse> {

    constructor(){
        super()
        this.setEndpoint(`${config.baseUrl}/analyzes`)
    }
    async downloadAnalyzeById(id: number) {
        const errorMessage = new String('Failed to download analyze file')
        try {
            const analyze = await this.getById(id)

            const response = await axios.get(`${config.baseUrl}/analyzes/download/${id}`, { responseType: 'blob' })
            const blob = new Blob([response.data], { type: response.data.type })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)

            link.download = analyze.name ? analyze.name : 'Untitled'
            // link.download = response.headers["content-disposition"].split("name=")[1]
            document.body.appendChild(link);
            link.click()

        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError)
                if (error.response?.data && typeof error.response?.data === 'string') return new String(error.response?.data)
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
            // const response = await axios.post(`${config.baseUrl}/analyzes/`, { ...dataAnalyze, id: fileId })
            const response = await axios.post(`${config.baseUrl}/analyzes/?id=${fileId}`, dataAnalyze)

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
            const response = await axios.put(`${config.baseUrl}/analyzes/${analyze.id}`, dataAnalyze)

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
    async deleteAnalyze(id: number) {
        const errorMessage = new String('Failed to delete analyze')
        try {
            const response = await axios.delete(`${config.baseUrl}/analyzes/${id}`)

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
        analyze.id = data.id
        analyze.name = data.name
        analyze.description = data.description
        analyze.support = data.support
        analyze.lift = data.lift
        analyze.confidence = data.confidence
        analyze.rulesLength = data.rules_length
        analyze.filePath = data.file_path
        analyze.analyzeCreateDate = new Date(data.create_date)
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
            id: analyze.id,
            name: analyze.name,
            description: analyze.description,
            support: analyze.support,
            lift: analyze.lift,
            confidence: analyze.confidence,
            rules_length: analyze.rulesLength,
            file_path: analyze.filePath,
            create_date: analyze.analyzeCreateDate.toJSON(),
            report_id: analyze.reportId,
        }
    }
}