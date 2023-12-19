import Datasources from "../../../models/DatasourcesModel"
import useVuelidate from "@vuelidate/core"
import { minLength, maxLength, required } from "@vuelidate/validators"
import { ref } from "vue"


export default function useDatasourceEditValidate(datasource: Datasources) {
    const datasourceEditState = ref(datasource)
    const datasourceEditRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(50) },
    }
    const datasourceEditValidate = useVuelidate(datasourceEditRules, datasourceEditState)
    return {
        datasourceEditValidate,
        datasourceEditState,
        datasourceEditRules
    }
}
