import axios, { AxiosError } from "axios";
import Analyzes, { AssociationRules, IAnalyzesResponse, IAssociationRulesResponse } from "../models/AnalyzesModel";
import GenericService from "./GenericService";

export default class AnalyzesService extends GenericService<Analyzes, IAnalyzesResponse> {

    constructor() {
        super("/analyzes")
    }

    mapJSONToModel(analyzeJson: IAnalyzesResponse): Analyzes {
        return Analyzes.fromJSON(analyzeJson)
    }

    mapModelToJSON(analyze: Analyzes): IAnalyzesResponse {
        return Analyzes.toJSON(analyze)
    }

    mapDataToAssociationRules(data: IAssociationRulesResponse) {
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

    async downloadAnalyzeById(analyzeId: number) {
        try {
            console.log(`Downloading analyze with id='${analyzeId}'`);

            const analyze = await this.getById(analyzeId)

            const res = await axios.get(`${this.url}/download/${analyzeId}`, { responseType: 'blob' })
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

    //         const analyzes: Analyzes[] = res.data.map((val: IAnalyzesResponse) => {
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

            const associationRules: AssociationRules[] = res.data.map((val: IAssociationRulesResponse) => {
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
}

export const analyzesService = new AnalyzesService()
