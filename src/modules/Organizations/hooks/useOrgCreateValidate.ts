import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, email } from "@vuelidate/validators"
import { reactive } from "vue"
import Organizations from "../../../models/OrganizationsModel"

export default function useOrgCreateValidate() {
    const orgCreateState = reactive<Organizations>(new Organizations(0, '', '', '', '',))
    const orgCreateRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(200) },
        description: { required, minLength: minLength(10), maxLength: maxLength(2000) },
        email: { required, email, maxLength: maxLength(255) },
        phone: { minLength: minLength(18), maxLength: maxLength(18) },
    }
    const orgCreateValidate = useVuelidate(orgCreateRules, orgCreateState)

    return {
        orgCreateState,
        orgCreateRules: orgCreateRules,
        orgCreateValidate,
    }
}