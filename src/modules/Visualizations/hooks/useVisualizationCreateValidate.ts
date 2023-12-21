import Visualizations from "../../../models/VisualizationsModel"
import useVuelidate from "@vuelidate/core"
import { minLength, maxLength, required, not, sameAs } from "@vuelidate/validators"
import { ref } from "vue"

export default function useVisualizationCreateValidate(visualization: Visualizations = new Visualizations()) {
    const visualizationCreateState = ref(visualization)

    const visualizationCreateRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(50) },
        type: { required },
        // reportId: { required, not: not(sameAs(0)) }
    }

    const visualizationCreateValidate = useVuelidate(visualizationCreateRules, visualizationCreateState)
    return {
        visualizationCreateValidate,
        visualizationCreateState,
        visualizationCreateRules
    }
}
