import { reactive, } from "vue"
import useVuelidate from "@vuelidate/core"
import { minLength, maxLength, required, not, sameAs } from "@vuelidate/validators"
import Reports from "../../../models/ReportsModel"


export default function useReportCreateValidate(report: Reports = new Reports()) {
    const reportCreateState = reactive<Reports>(report)
    const reportCreateRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(200) },
        type: { required },
        creatorId: { required, not: not(sameAs(0)) },
        analyzeId: { required, not: not(sameAs(0)) },
    }
    const reportCreateValidate = useVuelidate(reportCreateRules, reportCreateState)
    return {
        reportCreateState,
        reportCreateRules,
        reportCreateValidate
    }
}
