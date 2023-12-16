import { ref } from "vue"
import Datasources from "../../../models/DatasourcesModel"
import useVuelidate from "@vuelidate/core"
import { minLength, maxLength, required } from "@vuelidate/validators"


export default function useDatasourceCreateValidate(datasourceState: Datasources) {
    const datasourceRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(50) },
        type: { required }
    }
    const datasourceValidate = useVuelidate(datasourceRules, datasourceState)
    return {
        datasourceValidate,
        datasourceState,
        datasourceRules
    }
}
