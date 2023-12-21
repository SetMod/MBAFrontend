import { AxiosError } from "axios";
import Analyzes, { AssociationRules, IAnalyzeOptions, IAnalyzesResponse, IAssociationRulesResponse } from "../models/AnalyzesModel";
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

            const res = await this.api.get(`${this.url}/download/${analyzeId}`, { responseType: 'blob' })
            console.log(res)

            const blob = new Blob([res.data], { type: res.data.type })
            const link = document.createElement('a')

            link.href = URL.createObjectURL(blob)
            link.download = `analyze_${analyzeId}` // analyze.name ? analyze.name : 'Untitled'
            // link.download = response.headers["content-disposition"].split("name=")[1]
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

    async previewAnalyze(analyzeId: number) {
        try {
            console.log(`Previewing analyze with id='${analyzeId}'`);

            const res = await this.api.get(`${this.url}/preview/${analyzeId}`, { responseType: 'blob' })
            console.log(res)

            const blob = new Blob([res.data], { type: res.data.type })
            console.log(blob);

            return blob
        } catch (err) {
            let errorMessage = 'Failed to download analyze file'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

    async startAnalyze(analyzeId: number, analyzeOptions: IAnalyzeOptions) {
        try {
            console.log(`Starting analyzing analyze with id='${analyzeId}'`);

            const res = await this.api.post(`${this.url}/analyze/${analyzeId}`, analyzeOptions)
            console.log(res)

            // const associationRules: AssociationRules[] = res.data.map((val: IAssociationRulesResponse) => {
            //     return this.mapDataToAssociationRules(val)
            // })
            // console.log(associationRules)
            // return associationRules

            const analyze = this.mapJSONToModel(res.data)

            return analyze
        } catch (err) {
            let errorMessage = 'Failed to create an analyze'
            console.error(err);
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }
    async getAnalyzeStatus(analyzeId: number) {
        try {
            console.log(`Getting status of analyze with id='${analyzeId}'`);

            const res = await this.api.get(`${this.url}/analyze/${analyzeId}/status`)
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
}

export const analyzesService = new AnalyzesService()
