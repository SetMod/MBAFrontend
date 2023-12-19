import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, decimal, between, not, sameAs } from "@vuelidate/validators"
import Analyzes from "../../../models/AnalyzesModel"

export default function useAnalyzeEditValidate(analyzeEditState: Analyzes) {
    const analyzeEditRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(200) },
        description: { required, minLength: minLength(10), maxLength: maxLength(2000) },
        support: { required, decimal, between: between(0.00001, 1) },
        lift: { required, decimal, between: between(0.00001, 2) },
        confidence: { required, decimal, between: between(0.00001, 1) },
        rulesLength: { required, decimal, between: between(1, 10) },
        algorithm: { required },
        status: { required },
        creatorId: { required, not: not(sameAs(0)) },
        datasourceId: { required, not: not(sameAs(0)) },
    }
    const analyzeEditValidate = useVuelidate(analyzeEditRules, analyzeEditState)
    return {
        analyzeEditState,
        analyzeEditRules,
        analyzeEditValidate,
    }
}
