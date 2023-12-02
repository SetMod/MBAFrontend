import axios, { AxiosError } from "axios";
import config from "../config";
import Analyzes, { AssociationRules, AnalyzeResponse, AssociationRulesResponse } from "../models/AnalyzesModel";
import GenericService from "./GenericService";

export default class AnalyzesService extends GenericService<Analyzes, AnalyzeResponse> {

    constructor() {
        super("/analyzes")
    }

    async downloadAnalyzeById(id: number) {
        try {
            const analyze = await this.getById(id)

            const res = await axios.get(`${this.url}/download/${id}`, { responseType: 'blob' })
            console.log(res)

            const blob = new Blob([res.data], { type: res.data.type })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)

            link.download = analyze.name ? analyze.name : 'Untitled'
            // link.download = response.headers["content-disposition"].split("name=")[1]
            document.body.appendChild(link);
            link.click()

        } catch (err) {
            let errorMessage = 'Failed to download analyze file'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
    // async getReportAnalyzes(reportId: number) {
    //     try {
    //         const res = await axios.get(`${this.url}/reports/${reportId}/analyzes`)
    //         console.log(res)

    //         const analyzes: Analyzes[] = res.data.map((val: AnalyzeResponse) => {
    //             return this.mapJSONToModel(val)
    //         })
    //         console.log(analyzes)

    //         return analyzes
    //     } catch (err) {
    //         let errorMessage = 'Failed to get report analyzes'
    //         console.error(err);
    //         if (err instanceof AxiosError) {
    //             errorMessage += `. ${err.message}`
    //         }

    //         throw new Error(errorMessage)
    //     }
    // }
    async createAnalyze(analyze: Analyzes, fileId: number) {
        try {
            const dataAnalyze = this.mapModelToJSON(analyze)
            // const response = await axios.post(`/`, { ...dataAnalyze, id: fileId })
            const res = await axios.post(this.url, dataAnalyze, {
                params: {
                    "id": fileId
                }
            })
            console.log(res)

            const associationRules: AssociationRules[] = res.data.map((val: AssociationRulesResponse) => {
                return this.mapDataToAssociationRules(val)
            })
            // console.log(associationRules)

            return associationRules
        } catch (err) {
            let errorMessage = 'Failed to create an analyze'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
    async updateAnalyze(analyze: Analyzes) {
        try {
            const dataAnalyze = this.mapModelToJSON(analyze)
            const res = await axios.put(`${this.url}/${analyze.id}`, dataAnalyze)
            console.log(res)

            const updatedAnalyze: Analyzes = this.mapJSONToModel(res.data)
            console.log(updatedAnalyze)

            return updatedAnalyze
        } catch (err) {
            let errorMessage = 'Failed to update analyze'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
    async deleteAnalyze(id: number) {
        try {
            const res = await axios.delete(`${this.url}/${id}`)
            console.log(res)

            const deletedAnalyze: Analyzes = this.mapJSONToModel(res.data)
            console.log(deletedAnalyze)

            return deletedAnalyze
        } catch (err) {
            let errorMessage = 'Failed to delete analyze'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    mapJSONToModel(analyzeJson: AnalyzeResponse): Analyzes {
        const analyze = new Analyzes()
        analyze.id = analyzeJson.id
        analyze.name = analyzeJson.name
        analyze.description = analyzeJson.description
        analyze.support = analyzeJson.support
        analyze.lift = analyzeJson.lift
        analyze.confidence = analyzeJson.confidence
        analyze.rulesLength = analyzeJson.rules_length
        analyze.filePath = analyzeJson.file_path
        analyze.status = analyzeJson.status
        analyze.datasourceId = analyzeJson.datasource_id
        analyze.startedDate = analyzeJson.started_date
        analyze.finishedDate = analyzeJson.finished_date
        analyze.createdDate = analyzeJson.created_date
        analyze.updatedDate = analyzeJson.updated_date
        analyze.deletedDate = analyzeJson.deleted_date
        analyze.softDeleted = analyzeJson.soft_deleted

        return analyze
    }


    mapModelToJSON(analyze: Analyzes): AnalyzeResponse {
        return <AnalyzeResponse>{
            id: analyze.id,
            name: analyze.name,
            description: analyze.description,
            support: analyze.support,
            lift: analyze.lift,
            confidence: analyze.confidence,
            rules_length: analyze.rulesLength,
            file_path: analyze.filePath,
            status: analyze.status,
            datasource_id: analyze.datasourceId,
            started_date: analyze.startedDate,
            finished_date: analyze.finishedDate,
            created_date: analyze.createdDate,
            updated_date: analyze.updatedDate,
            deleted_date: analyze.deletedDate,
            soft_deleted: analyze.softDeleted,
        }
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
}