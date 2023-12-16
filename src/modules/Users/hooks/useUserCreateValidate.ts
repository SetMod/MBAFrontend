import { computed, reactive, ref } from "vue";
import Users from "../../../models/UsersModel";
import { email, maxLength, minLength, required, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default function useUserCreateValidate() {
    // REGISTER VALIDATION
    const password = computed(() => {
        return userCreateState.password
    })
    const userCreateState = reactive<Users>(new Users())
    const confirmPassword = ref()
    const isPasswordConfirmed = computed(() => {
        return userCreateState.password == confirmPassword.value
    })
    const userCreateRules = {
        firstName: { required },
        secondName: { required },
        email: { required, email },
        username: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(6) },
        // confirmPassword: { required, sameAsPassword: sameAs(password) },
        phone: { required, minLength: minLength(13), maxLength: maxLength(18) },
    }
    const userCreateValidate = useVuelidate(userCreateRules, userCreateState)

    return {
        password,
        confirmPassword,
        isPasswordConfirmed,
        userCreateState,
        userCreateRules,
        userCreateValidate
    }
}