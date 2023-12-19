import Visualizations from "../../../models/VisualizationsModel"
import useVuelidate from "@vuelidate/core"
import { minLength, maxLength, required, not, sameAs } from "@vuelidate/validators"
import { ref } from "vue"

export default function useVisualizationEditValidate(visualization: Visualizations) {
    const visualizationEditState = ref(visualization)
    const visualizationEditRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(50) },
        type: { required },
        // reportId: { required, not: not(sameAs(0)) }
    }

    const visualizationEditValidate = useVuelidate(visualizationEditRules, visualizationEditState)
    return {
        visualizationEditValidate,
        visualizationEditState,
        visualizationEditRules
    }
}
