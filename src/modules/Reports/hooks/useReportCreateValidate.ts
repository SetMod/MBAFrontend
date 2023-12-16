import { reactive, } from "vue"
import useVuelidate from "@vuelidate/core"
import { minLength, maxLength, required } from "@vuelidate/validators"
import Reports from "../../../models/ReportsModel"


export default function useReportCreateValidate() {
    const reportState = reactive<Reports>(new Reports())
    const reportRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(200) },
        type: { required },
        creatorId: { required },
    }
    const reportValidate = useVuelidate(reportRules, reportState)
    return {
        reportState,
        reportRules,
        reportValidate
    }
}
