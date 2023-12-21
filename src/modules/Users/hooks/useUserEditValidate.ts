import Users from "../../../models/UsersModel";
import { email, maxLength, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default function useUserEditValidate(userEditState: Users) {
    // PROFILE VALIDATION
    const userEditRules = {
        firstName: { required },
        secondName: { required },
        email: { required, email },
        username: { required, minLength: minLength(3) },
        // password: { required, minLength: minLength(6) },
        phone: { required, minLength: minLength(13), maxLength: maxLength(18) },
        role: { required },
    }
    const userEditValidate = useVuelidate(userEditRules, userEditState)

    return {
        userEditState,
        userEditRules,
        userEditValidate,
    }
}
