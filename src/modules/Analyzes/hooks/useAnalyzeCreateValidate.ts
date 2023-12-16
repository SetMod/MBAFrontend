import { ref } from "vue"
import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, decimal, between, not, sameAs } from "@vuelidate/validators"
import Analyzes from "../../../models/AnalyzesModel"
import OrganizationMembers from "../../../models/OrganizationMembersModel"

export default function useAnalyzeCreateValidate(creator: OrganizationMembers) {
    const analyzeCreateState = ref<Analyzes>(new Analyzes())
    analyzeCreateState.value.creatorId = creator.id
    
    const analyzeCreateRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(200) },
        description: { required, minLength: minLength(10), maxLength: maxLength(2000) },
        support: { required, decimal, between: between(0.01, 1) },
        lift: { required, decimal, between: between(0.01, 2) },
        confidence: { required, decimal, between: between(0.01, 1) },
        rulesLength: { required, decimal, between: between(1, 10) },
        algorithm: { required },
        status: { required },
        creatorId: { required, not: not(sameAs(0)) },
        datasourceId: { required, not: not(sameAs(0)) },
    }
    const analyzeValidate = useVuelidate(analyzeCreateRules, analyzeCreateState)
    return {
        analyzeCreateState,
        analyzeCreateRules,
        analyzeValidate,
    }
}
