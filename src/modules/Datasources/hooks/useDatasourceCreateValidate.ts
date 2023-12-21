import Datasources from "../../../models/DatasourcesModel"
import useVuelidate from "@vuelidate/core"
import { minLength, maxLength, required } from "@vuelidate/validators"


export default function useDatasourceCreateValidate(datasourceCreateState: Datasources) {
    const datasourceCreateRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(50) },
        type: { required }
    }
    const datasourceCreateValidate = useVuelidate(datasourceCreateRules, datasourceCreateState)
    return {
        datasourceCreateValidate,
        datasourceCreateState,
        datasourceCreateRules
    }
}
