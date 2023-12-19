import axios, { AxiosError } from "axios";
import Datasources, { IDatasourcesResponse } from "../models/DatasourcesModel"
import GenericService from "./GenericService";


export default class DatasourcesService extends GenericService<Datasources, IDatasourcesResponse> {

    constructor() {
        super("/datasources")
    }

    mapJSONToModel(datasourceJson: IDatasourcesResponse): Datasources {
        return Datasources.fromJSON(datasourceJson)
    }

    mapModelToJSON(datasource: Datasources): IDatasourcesResponse {
        return Datasources.toJSON(datasource)
    }

    async getUserDatasources(userId: number) {
        try {
            console.log(`Getting all user datasources with id='${userId}'`);
            const res = await this.api.get(`/users/${userId}/datasources/full`)
            console.log(res)

            const models = this.mapJSONToModels(res.data)
            console.log(models)

            return models

        } catch (err) {
            let errorMessage = "Failed to get all user datasources"
            console.error(errorMessage)
            if (err instanceof AxiosError) {
                errorMessage += `. ${err.message}`
            }

            throw new Error(errorMessage)
        }
    }

}

export const datasourcesService = new DatasourcesService()
