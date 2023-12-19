import useVuelidate from "@vuelidate/core"
import { required, minLength, maxLength, email } from "@vuelidate/validators"
import Organizations from "../../../models/OrganizationsModel"
import { ref } from "vue"

export default function useOrgEditValidate(organization: Organizations) {
    // const orgEditState = reactive<Organizations>(selectedOrganization.value)
    const orgEditState = ref(organization)
    const orgEditRules = {
        name: { required, minLength: minLength(2), maxLength: maxLength(200) },
        description: { required, minLength: minLength(10), maxLength: maxLength(2000) },
        email: { required, email, maxLength: maxLength(255) },
        phone: { minLength: minLength(18), maxLength: maxLength(18) },
    }

    const orgEditValidate = useVuelidate(orgEditRules, orgEditState)

    return {
        orgEditState,
        orgEditRules,
        orgEditValidate,
    }
}