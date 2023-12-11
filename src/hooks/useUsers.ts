import { computed, reactive, ref } from "vue";
import Users, { Roles } from "../models/UsersModel";
import { usersService } from "../services/UsersService";
import { setJWTToken, removeJWTToken } from "../utils/jwt"
import useCRUD from "./useCRUD";
import { getJWTToken } from "../utils/jwt"
import useState from "./useState";
import { email, maxLength, minLength, required, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const USER_STORAGE_KEY = "user"
const usersState = useState<Users>()
const {
    error: usersError,
    isLoading: isUsersLoading,
    model: user,
    models: users,
    updatedModel: updatedUser,
    newModel: newUser,
    deletedModel: deletedUser,
    getFromLocalStorage,
    addToLocalStorage,
    removeFromLocalStorage,
    getAllModels: getUsers,
    getModelById: getUserById,
    getModelByField: getUserByField,
    getModelsByFields: getUsersByFields,
    createModel: createUser,
    updateModel: updateUser,
    deleteModel: deleteUser,
} = useCRUD(usersService, usersState, USER_STORAGE_KEY)

export const CURRENT_USER_STORAGE_KEY = "current_user"
const currentUser = ref<Users | null>(getFromLocalStorage(CURRENT_USER_STORAGE_KEY))
const SELECTED_USER_STORAGE_KEY = "selected_organization"
const selectedUser = ref<Users | null>(getFromLocalStorage(SELECTED_USER_STORAGE_KEY))

export function useUserLoginValidate() {
    // LOGIN VALIDATION
    const loginState = reactive({
        username: '',
        password: ''
    })
    const loginRules = {
        username: { required },
        password: { required }
    }
    const loginValidate = useVuelidate(loginRules, loginState)
    return {
        loginState,
        loginRules,
        loginValidate
    }
}
export function useUserCreateValidate() {
    // REGISTER VALIDATION
    const password = computed(() => {
        return userCreateState.password
    })
    const userCreateState = reactive({
        firstName: '',
        secondName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: Roles.USER,
    })
    const userCreateRules = {
        firstName: { required },
        secondName: { required },
        email: { required, email },
        username: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(6) },
        confirmPassword: { required, sameAsPassword: sameAs(password) },
        phone: { required, minLength: minLength(18), maxLength: maxLength(18) },
    }
    const userCreateValidate = useVuelidate(userCreateRules, userCreateState)

    return {
        password,
        userCreateState,
        userCreateRules,
        userCreateValidate
    }
}
export function useUserEditValidate() {
    // PROFILE VALIDATION
    const userEditState = reactive({
        id: currentUser.value?.id,
        firstName: currentUser.value?.firstName,
        secondName: currentUser.value?.secondName,
        email: currentUser.value?.email,
        username: currentUser.value?.username,
        // password: user.value?.password,
        phone: currentUser.value?.phone,
        role: currentUser.value?.role,
    })
    const userEditRules = {
        firstName: { required },
        secondName: { required },
        email: { required, email },
        username: { required, minLength: minLength(3) },
        // password: { required, minLength: minLength(6) },
        phone: { required, minLength: minLength(18), maxLength: maxLength(18) },
    }
    const userEditValidate = useVuelidate(userEditRules, userEditState)

    return {
        userEditState,
        userEditRules,
        userEditValidate,
    }
}
export default function useUsers() {

    const isAdmin = computed(() => {
        return currentUser.value?.role.toLocaleLowerCase() == Roles.ADMIN.toLocaleLowerCase() ? true : false
    })
    const isLoggedIn = computed(() => {
        return currentUser.value && getJWTToken() ? true : false
    })

    const login = async (username: string, password: string) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await usersService.login(username, password)
            setJWTToken(res.access_token);

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                usersError.value = err
            }
        } finally {
            isUsersLoading.value = false
        }
    }

    const whoAmI = async () => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const user = await usersService.whoAmI()
            currentUser.value = user
            addToLocalStorage(user, CURRENT_USER_STORAGE_KEY)

            return user
        } catch (err) {
            if (err instanceof Error) {
                console.error(err)
                usersError.value = err
                currentUser.value = null
                removeFromLocalStorage(CURRENT_USER_STORAGE_KEY)
            }
        } finally {
            isUsersLoading.value = false
        }
    }

    const logout = () => {
        currentUser.value = null
        removeJWTToken()
        removeFromLocalStorage(CURRENT_USER_STORAGE_KEY)
    }

    const register = async (newUser: Users) => {
        isUsersLoading.value = true
        usersError.value = null
        try {
            const res = await usersService.register(newUser)

            return res
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                usersError.value = err
            }
        } finally {
            isUsersLoading.value = false
        }
    }

    return {
        isLoggedIn,
        isAdmin,
        register,
        login,
        whoAmI,
        logout,
        usersError,
        isUsersLoading,
        users,
        user,
        currentUser,
        updatedUser,
        newUser,
        deletedUser,
        selectedUser,
        getFromLocalStorage,
        addToLocalStorage,
        removeFromLocalStorage,
        getUsers,
        getUserById,
        getUserByField,
        getUsersByFields,
        createUser,
        updateUser,
        deleteUser,
    }
}