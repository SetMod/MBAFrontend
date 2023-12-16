import { reactive } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default function useUserLoginValidate() {
    // LOGIN VALIDATION
    const userLoginState = reactive({
        username: '',
        password: ''
    })
    const userLoginRules = {
        username: { required },
        password: { required }
    }
    const userLoginValidate = useVuelidate(userLoginRules, userLoginState)
    return {
        userLoginState,
        userLoginRules,
        userLoginValidate
    }
}
